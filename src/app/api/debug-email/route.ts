import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4),
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ 
      error: "RESEND_API_KEY not configured",
      hasApiKey: false 
    }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Lex Atlas <onboarding@resend.dev>",
        to: "test@example.com",
        subject: "Test Email",
        html: "<p>Test email from Lex Atlas</p>",
      }),
    });

    const responseText = await res.text();
    
    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      statusText: res.statusText,
      response: responseText,
      headers: Object.fromEntries(res.headers.entries()),
      hasApiKey: true,
      apiKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4)
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      hasApiKey: true,
      apiKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4)
    }, { status: 500 });
  }
}
