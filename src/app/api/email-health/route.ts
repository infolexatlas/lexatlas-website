import { NextResponse } from "next/server";
import { LEADMAGNET_TEMPLATE_VERSION, renderLeadMagnetEmailHTML, getGuideUrl, getBrand } from "@/emails/leadmagnet";

export const runtime = "nodejs";

export async function GET() {
  const html = renderLeadMagnetEmailHTML();
  const snippet = html.replace(/\s+/g, " ").slice(0, 200);
  const { blue, logo } = getBrand();

  return NextResponse.json({
    version: LEADMAGNET_TEMPLATE_VERSION,
    guideUrl: getGuideUrl(),
    brandBlue: blue,
    logo,
    subject: `🎉 Your free Lex Atlas resource is here`,
    htmlSnippet: snippet,
  });
}
