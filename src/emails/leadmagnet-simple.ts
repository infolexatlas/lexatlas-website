// DISCOVERY NOTE: Simplified email template for debugging.
import fs from "node:fs";
import path from "node:path";

export const LEADMAGNET_TEMPLATE_VERSION = "v3.0.0";

export const FREE_GUIDE_SUBJECT = "Your Lex Atlas Free Guide is Ready 🎉"

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
  const guideUrl = getGuideUrl();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎉 Your free Lex Atlas resource is here</title>
  <!-- LEXATLAS:FREEGUIDE:v3 -->
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
  <!-- LEXATLAS:FREEGUIDE:v3 -->
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 100%); padding: 40px 20px; text-align: center; color: white;">
      <img src="https://lex-atlas.com/logo-180x180.png" alt="Lex Atlas" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;" />
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Welcome to Lex Atlas</h1>
      <p style="margin: 10px 0 0 0; font-size: 18px; color: #D4AF37;">Your Global Legal Compass</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; margin-bottom: 30px; text-align: center;">
        You've just unlocked your first step towards mastering <strong>international legal procedures</strong>.
        As promised, here is your exclusive resource:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${guideUrl}" style="display: inline-block; background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 100%); color: #D4AF37; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 18px; border: 2px solid #D4AF37;">
          Download your free guide
        </a>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #D4AF37;">
        <h3 style="color: #1A2E4F; margin: 0 0 20px 0; font-size: 22px;">What's included in your premium sample:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Essential document checklist with legal requirements</li>
          <li style="margin-bottom: 10px;">Step-by-step procedure overview and timeline</li>
          <li style="margin-bottom: 10px;">Important deadlines and critical dates</li>
          <li style="margin-bottom: 10px;">Contact information for relevant authorities</li>
        </ul>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        With Lex Atlas, you get <em>expert-built, country-specific PDF kits</em> that make complex international procedures clear and affordable.
      </p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Stay tuned — we'll keep sending you premium insights and updates to help you navigate cross-border challenges with confidence.
      </p>
      
      <p style="font-size: 16px; margin-bottom: 0;">
        Best regards,<br>
        <strong style="color: #1A2E4F;">The Lex Atlas Team</strong>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0 0 10px 0; color: #6c757d;">© ${new Date().getFullYear()} Lex Atlas · All rights reserved</p>
      <p style="margin: 0;"><a href="${baseUrl}/unsubscribe" style="color: #D4AF37; text-decoration: underline;">Unsubscribe</a></p>
    </div>
    
  </div>
</body>
</html>`;
}
