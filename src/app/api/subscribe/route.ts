import { NextResponse } from "next/server";
import { BRAND_HEX, LOGO_SRC } from "@/lib/brand";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// basic in-memory rate limit per lambda instance
const lastHits = new Map<string, number>();
const RATE_LIMIT_MS = 15_000;

function getGuideUrl() {
  return process.env.LEADMAGNET_URL?.trim() || "https://lex-atlas.com/files/lexatlas-starter-guide.pdf";
}

function htmlTemplate() {
  const guideUrl = getGuideUrl();
  const brand = BRAND_HEX;
  const logo = LOGO_SRC;
  const preheader = "Your free Lex Atlas guide is inside.";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-preheader" content="${preheader}" />
    <title>Your Lex Atlas Guide</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f7f8;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none !important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">
      ${preheader}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f8;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:${brand};color:#fff;padding:16px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      <img src="${logo}" alt="Lex Atlas" height="24" style="display:inline-block;vertical-align:middle;border:0;outline:none;" />
                      <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-size:18px;font-weight:700;letter-spacing:0.2px;">
                        Lex Atlas — Your free guide
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 24px;color:#111;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 12px 0;">Hi there,</p>
                <p style="margin:0 0 16px 0;">Thanks for subscribing to Lex Atlas 🙌</p>
                <p style="margin:0 0 18px 0;">Your free guide to cross-border marriage requirements is ready:</p>
                <p style="margin:22px 0;">
                  <a href="${guideUrl}" target="_blank" rel="noopener noreferrer"
                     style="background:${brand};color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;display:inline-block;font-weight:700;">
                    📥 Download the guide
                  </a>
                </p>
                <!-- Removed the fallback raw link paragraph to match requirements -->
                <hr style="border:none;border-top:1px solid #ececec;margin:24px 0;" />
                <p style="font-size:13px;color:#555;margin:0;">From: info@lex-atlas.com</p>
              </td>
            </tr>
          </table>
          <p style="color:#777;font-size:12px;margin-top:12px;">© ${new Date().getFullYear()} Lex Atlas</p>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
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
        from: "Lex Atlas <info@lex-atlas.com>",
        to: email,
        subject: "Your Lex Atlas Guide is Ready 📘",
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
