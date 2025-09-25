// DISCOVERY NOTE: Centralized new email template.
// Increment LEADMAGNET_TEMPLATE_VERSION when changing the HTML.
import fs from "node:fs";
import path from "node:path";

export const LEADMAGNET_TEMPLATE_VERSION = "v1.0.0";

function publicFileExists(p: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", p.replace(/^\//, "")));
  } catch {
    return false;
  }
}

export function getGuideUrl() {
  return process.env.LEADMAGNET_URL?.trim() || "https://lex-atlas.com/files/lexatlas-starter-guide.pdf";
}

export function getBrand() {
  const blue = process.env.NEXT_PUBLIC_BRAND_BLUE?.trim() || "#0A4ED8";
  const logo =
    publicFileExists("/logo.svg")
      ? "/logo.svg"
      : publicFileExists("/images/logo.svg")
      ? "/images/logo.svg"
      : "https://lex-atlas.com/logo.svg";
  return { blue, logo };
}

export function renderLeadMagnetEmailHTML() {
  const { blue, logo } = getBrand();
  const guideUrl = getGuideUrl();
  const preheader = "Your free Lex Atlas guide is inside.";

  return `<!DOCTYPE html><html lang="en"><head>
<meta charSet="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="x-preheader" content="${preheader}"/><title>Your Lex Atlas Guide</title>
</head><body style="margin:0;padding:0;background:#f7f7f8;font-family:Arial,Helvetica,sans-serif;">
<span style="display:none !important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">${preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f8;padding:24px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.06);">
<tr><td style="background:${blue};color:#fff;padding:16px 20px;">
  <table role="presentation" width="100%"><tr><td align="left" style="vertical-align:middle;">
    <img src="${logo}" alt="Lex Atlas" height="24" style="display:inline-block;vertical-align:middle;border:0;outline:none;"/>
    <span style="display:inline-block;vertical-align:middle;margin-left:10px;font-size:18px;font-weight:700;letter-spacing:0.2px;">
      Lex Atlas — Your free guide
    </span>
  </td></tr></table>
</td></tr>
<tr><td style="padding:28px 24px;color:#111;font-size:16px;line-height:1.6;">
  <p style="margin:0 0 12px 0;">Hi there,</p>
  <p style="margin:0 0 16px 0;">Thanks for subscribing to <strong>Lex Atlas</strong> 🙌</p>
  <p style="margin:0 0 18px 0;">Your free guide to cross-border marriage requirements is ready:</p>
  <p style="margin:22px 0;text-align:center;">
    <a href="${guideUrl}" target="_blank" rel="noopener noreferrer"
       style="background:${blue};color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;display:inline-block;font-weight:700;">
      📥 Download the guide
    </a>
  </p>
  <!-- No raw fallback link by design -->
  <hr style="border:none;border-top:1px solid #ececec;margin:24px 0;"/>
  <p style="font-size:13px;color:#555;margin:0;">From: info@lex-atlas.com</p>
</td></tr>
</table>
<p style="color:#777;font-size:12px;margin-top:12px;">© ${new Date().getFullYear()} Lex Atlas</p>
</td></tr></table>
</body></html>`;
}
