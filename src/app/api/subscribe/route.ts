// DISCOVERY NOTE: This route is the ONLY place that sends the lead magnet email.
import { NextResponse } from "next/server";
import {
  LEADMAGNET_TEMPLATE_VERSION,
  FREE_GUIDE_SUBJECT,
  renderLeadMagnetEmailHTML,
} from "@/emails/leadmagnet-simple";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const lastHits = new Map<string, number>();
const RATE_LIMIT_MS = 15_000;

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    (req as any).ip ||
    "0.0.0.0";

  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || "").toString().trim().toLowerCase();
    const honeypot = (body?.website || "").toString().trim();

    // 1) Honeypot: accept silently (do not rate-limit bots)
    if (honeypot) {
      console.log("lead_honeypot_triggered", { ip });
      return NextResponse.json({ success: true });
    }

    // 2) Validate before rate-limit
    if (!EMAIL_RE.test(email)) {
      console.warn("lead_invalid_email", { ip, email });
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 3) Only now apply rate-limit for valid emails
    const now = Date.now();
    const last = lastHits.get(ip) ?? 0;
    if (now - last < RATE_LIMIT_MS) {
      console.warn("lead_rate_limited", { ip, sinceMs: now - last });
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    lastHits.set(ip, now);

    if (!process.env.RESEND_API_KEY) {
      console.error("lead_missing_resend_key");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const subject = FREE_GUIDE_SUBJECT;
    const html = renderLeadMagnetEmailHTML();

    console.log("resend_payload_preview", { 
      to: email, 
      subject, 
      version: LEADMAGNET_TEMPLATE_VERSION,
      htmlLength: html.length,
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4)
    });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Lex Atlas <noreply@lex-atlas.com>",
        to: email,
        subject,
        html,
        reply_to: "info@lex-atlas.com",
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("lead_email_failed", { 
        ip, 
        email, 
        status: res.status, 
        statusText: res.statusText,
        resp: txt?.slice(0, 500),
        headers: Object.fromEntries(res.headers.entries())
      });
      return NextResponse.json({ 
        error: "Email send failed", 
        details: txt?.slice(0, 200),
        status: res.status,
        debug: {
          hasApiKey: !!process.env.RESEND_API_KEY,
          apiKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4),
          htmlLength: html.length,
          subject: subject,
          from: "Lex Atlas <onboarding@resend.dev>"
        }
      }, { status: 502 });
    }

    console.log("lead_email_sent", { ip, email, version: LEADMAGNET_TEMPLATE_VERSION });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("lead_server_error", { ip, message: err?.message });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
