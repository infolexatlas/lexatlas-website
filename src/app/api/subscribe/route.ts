import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// naive in-memory rate limit (per lambda instance); enough for basic abuse protection
const lastHits = new Map<string, number>();
const RATE_LIMIT_MS = 15_000; // 15s per IP

function htmlTemplate(to: string) {
  // Customize your lead magnet content here
  const guideUrl = "https://lex-atlas.com/files/guide.pdf";
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f7f7f8;padding:24px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
        <tr>
          <td style="background:#0b5cff;color:#fff;padding:18px 24px;font-size:18px;font-weight:600">
            LexAtlas — Votre guide gratuit
          </td>
        </tr>
        <tr>
          <td style="padding:24px;color:#111;font-size:16px;line-height:1.55">
            <p>Bonjour,</p>
            <p>Merci pour votre inscription à LexAtlas 🙌</p>
            <p>Voici votre guide gratuit pour comprendre les démarches d'un mariage international :</p>
            <p style="margin:20px 0">
              <a href="${guideUrl}" target="_blank"
                 style="background:#0b5cff;color:#fff;text-decoration:none;padding:12px 16px;border-radius:8px;display:inline-block;font-weight:600">
                📥 Télécharger le guide
              </a>
            </p>
            <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
            <p><a href="${guideUrl}" target="_blank" style="color:#0b5cff">${guideUrl}</a></p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
            <p style="font-size:13px;color:#555">Expéditeur : info@lex-atlas.com</p>
          </td>
        </tr>
      </table>
      <p style="color:#777;font-size:12px;margin-top:12px">© ${new Date().getFullYear()} LexAtlas</p>
    </td></tr>
  </table>
  `;
}

export const runtime = "nodejs"; // stable body parsing for POST

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      (req as any).ip ||
      "0.0.0.0";

    // basic rate limit
    const now = Date.now();
    const last = lastHits.get(ip) ?? 0;
    if (now - last < RATE_LIMIT_MS) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    lastHits.set(ip, now);

    const body = await req.json().catch(() => ({}));
    const email = (body?.email || "").toString().trim().toLowerCase();
    const honeypot = (body?.website || "").toString().trim(); // hidden field; bots fill it

    if (honeypot) {
      // silently accept to avoid giving signals to bots
      return NextResponse.json({ success: true });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    // Send email via Resend
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
        html: htmlTemplate(email),
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: txt || "Email send failed" }, { status: 502 });
    }

    // (Optional) notify internal mailbox
    // await fetch("https://api.resend.com/emails", { ...send to info@lex-atlas.com with lead info... })

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
