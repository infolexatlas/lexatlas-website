import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "LexAtlas <info@lex-atlas.com>",
      to: "youremail+test@gmail.com",
      subject: "Test LexAtlas ✅",
      html: "<p>Si vous recevez ceci, l'envoi fonctionne 🎉</p>",
    }),
  });
  const ok = res.ok;
  const text = await res.text();
  return NextResponse.json({ ok, text: ok ? "sent" : text }, { status: ok ? 200 : 502 });
}
