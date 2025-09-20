import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// naive in-memory rate limit (per lambda instance)
const lastHits = new Map<string, number>();
const RATE_LIMIT_MS = 15_000;

function htmlTemplate() {
  const guideUrl = "https://lex-atlas.com/files/guide.pdf";
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f7f7f8;padding:24px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#0b5cff;color:#fff;padding:18px 24px;font-size:18px;font-weight:600">LexAtlas — Votre guide gratuit</td></tr>
        <tr><td style="padding:24px;color:#111;font-size:16px;line-height:1.55">
          <p>Merci pour votre inscription 🙌</p>
          <p>Voici votre guide gratuit pour comprendre les démarches d'un mariage international :</p>
          <p style="margin:20px 0">
            <a href="${guideUrl}" target="_blank" style="background:#0b5cff;color:#fff;text-decoration:none;padding:12px 16px;border-radius:8px;display:inline-block;font-weight:600">📥 Télécharger le guide</a>
          </p>
          <p>Si le bouton ne fonctionne pas, copiez ce lien : <a href="${guideUrl}" target="_blank" style="color:#0b5cff">${guideUrl}</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
          <p style="font-size:13px;color:#555">Expéditeur : info@lex-atlas.com</p>
        </td></tr>
      </table>
      <p style="color:#777;font-size:12px;margin-top:12px">© ${new Date().getFullYear()} LexAtlas</p>
    </td></tr>
  </table>`;
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    (req as any).ip ||
    "0.0.0.0";

  try {
    // rate limit
    const now = Date.now();
    const last = lastHits.get(ip) ?? 0;
    if (now - last < RATE_LIMIT_MS) {
      console.warn("lead_rate_limited", { ip, sinceMs: now - last });
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    lastHits.set(ip, now);

    const body = await req.json().catch(() => ({}));
    const email = (body?.email || "").toString().trim().toLowerCase();
    const honeypot = (body?.website || "").toString().trim();

    // honeypot -> accept silently
    if (honeypot) {
      console.log("lead_honeypot_triggered", { ip });
      return NextResponse.json({ success: true });
    }

    if (!EMAIL_RE.test(email)) {
      console.warn("lead_invalid_email", { ip, email });
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("lead_missing_resend_key");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LexAtlas <info@lex-atlas.com>",
        to: email,
        subject: "Votre guide LexAtlas 📘",
        html: htmlTemplate(),
        reply_to: "info@lex-atlas.com"
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("lead_email_failed", { ip, email, status: res.status, resp: txt?.slice(0, 300) });
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }

    console.log("lead_email_sent", { ip, email });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("lead_server_error", { ip, message: err?.message });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
