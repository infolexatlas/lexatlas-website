import { Resend } from "resend";
import { getEmailEnv } from "./emailEnv";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadSampleEmail(to: string, sampleUrl?: string) {
  return await sendUltraPremiumEmail(to, sampleUrl);
}

export async function sendLeadMagnetEmail(to: string) {
  return await sendUltraPremiumEmail(to);
}

export async function sendNewsletterEmail(to: string) {
  return await sendUltraPremiumEmail(to);
}

async function sendUltraPremiumEmail(to: string, sampleUrl?: string) {
  const env = getEmailEnv();
  
  if (!env.hasKey) {
    throw new Error("RESEND_API_KEY missing");
  }

  const subject = "🎉 Your free Lex Atlas resource is here [v2.0]";
  const fromAddress = env.resolvedFrom;
  
  console.log('[ULTRA PREMIUM EMAIL] Sending ultra premium email', {
    to,
    hasKey: env.hasKey,
    keyPrefix: env.keyPrefix,
    from: fromAddress,
    baseUrl: env.baseUrl,
    nodeEnv: env.nodeEnv,
    echoTo: process.env.EMAIL_ECHO_TO ?? null,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>🎉 Your free Lex Atlas resource is here [v2.0]</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #374151; 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              width: 100% !important;
              min-width: 320px;
              overflow-x: hidden;
            }
            
            .email-wrapper { 
              width: 100%; 
              max-width: 100%; 
              margin: 0; 
              padding: 10px; 
              background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%);
              box-sizing: border-box;
            }
            
            .container { 
              width: 100%; 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #FFFFFF; 
              border-radius: 24px;
              box-shadow: 0 8px 32px -4px rgba(26, 46, 79, 0.12);
              overflow: hidden;
              border: 1px solid rgba(212, 175, 55, 0.1);
              box-sizing: border-box;
            }
            
            .header { 
              background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 50%, #1A2E4F 100%); 
              padding: 50px 20px; 
              text-align: center; 
              width: 100%; 
              position: relative;
              box-sizing: border-box;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
              pointer-events: none;
            }
            
            .logo-container {
              position: relative;
              z-index: 2;
            }
            
            .logo-img { 
              width: 140px; 
              height: 140px; 
              margin: 0 auto 25px; 
              display: block; 
              border-radius: 50%;
              box-shadow: 0 8px 32px -4px rgba(26, 46, 79, 0.3);
              border: 3px solid rgba(26, 46, 79, 0.3);
              background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 100%);
              padding: 15px;
            }
            
            .tagline { 
              color: #D4AF37; 
              font-size: 20px; 
              margin: 0; 
              font-weight: 600; 
              letter-spacing: 0.5px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .content { 
              padding: 50px 20px; 
              background-color: #FFFFFF; 
              width: 100%; 
              box-sizing: border-box;
            }
            
            .premium-badge {
              display: inline-flex;
              align-items: center;
              background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
              color: #1A2E4F;
              padding: 15px 25px;
              border-radius: 30px;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 35px;
              box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
              animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            
            .hero-text { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 38px; 
              font-weight: 700; 
              color: #1A2E4F; 
              margin-bottom: 35px; 
              text-align: center; 
              line-height: 1.3;
              letter-spacing: -0.5px;
              word-wrap: break-word;
              hyphens: auto;
              -webkit-hyphens: auto;
              -ms-hyphens: auto;
            }
            
            .description { 
              font-size: 20px; 
              color: #6B7280; 
              margin-bottom: 45px; 
              line-height: 1.7; 
              text-align: center;
              word-wrap: break-word;
              hyphens: auto;
              -webkit-hyphens: auto;
              -ms-hyphens: auto;
            }
            
            .cta-container {
              text-align: center;
              margin: 45px 0;
            }
            
            .cta-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 100%); 
              color: #D4AF37 !important; 
              padding: 28px 55px; 
              text-decoration: none; 
              border-radius: 20px; 
              font-weight: 700; 
              font-size: 22px; 
              text-align: center; 
              box-shadow: 0 12px 45px -4px rgba(26, 46, 79, 0.3);
              border: 3px solid #D4AF37;
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              letter-spacing: 0.5px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .cta-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
              transition: left 0.5s ease;
            }
            
            .cta-button:hover::before {
              left: 100%;
            }
            
            .cta-button:hover { 
              transform: translateY(-3px);
              box-shadow: 0 18px 55px -4px rgba(26, 46, 79, 0.4);
              border-color: #FFD700;
              color: #FFD700 !important;
              background: linear-gradient(135deg, #2D4A6B 0%, #1A2E4F 100%);
            }
            
            .premium-card { 
              background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FB 100%);
              padding: 45px 25px; 
              border-radius: 25px; 
              margin: 55px 0; 
              border: 1px solid rgba(212, 175, 55, 0.2);
              box-shadow: 0 8px 30px -2px rgba(26, 46, 79, 0.1);
              position: relative;
              overflow: hidden;
              box-sizing: border-box;
            }
            
            .premium-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 6px;
              height: 100%;
              background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
            }
            
            .card-title { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 28px; 
              color: #1A2E4F; 
              margin: 0 0 25px 0; 
              font-weight: 700;
            }
            
            .feature-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            
            .feature-item {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              font-size: 19px;
              color: #6B7280;
            }
            
            .feature-icon {
              width: 26px;
              height: 26px;
              background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
              border-radius: 50%;
              margin-right: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            
            .feature-icon::before {
              content: '✓';
              color: #1A2E4F;
              font-weight: bold;
              font-size: 15px;
            }
            
            .footer { 
              background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%); 
              padding: 50px 20px; 
              text-align: center; 
              border-top: 1px solid rgba(212, 175, 55, 0.1);
              box-sizing: border-box;
            }
            
            .footer-text { 
              font-size: 18px; 
              color: #6B7280; 
              margin: 12px 0; 
              line-height: 1.6; 
            }
            
            .disclaimer { 
              font-size: 16px; 
              color: #9CA3AF; 
              margin-top: 35px; 
              font-style: italic; 
            }
            
            .pricing-link { 
              color: #D4AF37; 
              text-decoration: none; 
              font-weight: 600;
              border-bottom: 1px solid transparent;
              transition: border-color 0.3s ease;
            }
            
            .pricing-link:hover { 
              border-bottom-color: #D4AF37;
            }
            
            .contact-link {
              color: #D4AF37;
              font-weight: 600;
              text-decoration: none;
              border-bottom: 1px solid transparent;
              transition: border-color 0.3s ease;
            }
            
            .contact-link:hover {
              border-bottom-color: #D4AF37;
            }
            
            /* Mobile-first responsive design */
            @media only screen and (max-width: 600px) {
              .email-wrapper { 
                padding: 10px 0 !important; 
              }
              .container { 
                border-radius: 16px !important;
                margin: 0 10px !important;
              }
              .header { 
                padding: 40px 20px !important; 
              }
              .logo-img { 
                width: 100px !important; 
                height: 100px !important; 
              }
              .tagline { 
                font-size: 18px !important; 
              }
              .content { 
                padding: 40px 20px !important; 
              }
              .hero-text { 
                font-size: 28px !important; 
                line-height: 1.4 !important;
                margin-bottom: 30px !important;
              }
              .description { 
                font-size: 18px !important; 
                line-height: 1.6 !important;
                margin-bottom: 35px !important;
              }
              .cta-button { 
                padding: 25px 45px !important; 
                font-size: 19px !important; 
                width: calc(100% - 40px) !important; 
                max-width: 320px !important; 
                margin: 0 auto !important;
              }
              .premium-card { 
                padding: 35px 25px !important; 
                margin: 40px 0 !important; 
              }
              .card-title { 
                font-size: 22px !important; 
                line-height: 1.3 !important;
              }
              .feature-item {
                font-size: 17px !important;
                margin-bottom: 18px !important;
              }
              .footer { 
                padding: 40px 20px !important; 
              }
              .footer-text { 
                font-size: 16px !important; 
                line-height: 1.5 !important;
              }
              .disclaimer { 
                font-size: 14px !important; 
              }
            }
            
            @media only screen and (max-width: 480px) {
              .container { 
                margin: 0 5px !important;
                border-radius: 12px !important;
              }
              .header { 
                padding: 30px 15px !important; 
              }
              .logo-img { 
                width: 90px !important; 
                height: 90px !important; 
              }
              .content { 
                padding: 30px 15px !important; 
              }
              .hero-text { 
                font-size: 24px !important; 
                line-height: 1.4 !important;
                margin-bottom: 25px !important;
              }
              .description {
                font-size: 16px !important;
                line-height: 1.5 !important;
                margin-bottom: 30px !important;
              }
              .cta-button { 
                padding: 20px 35px !important; 
                font-size: 16px !important; 
                width: calc(100% - 30px) !important; 
                max-width: 280px !important;
              }
              .premium-card { 
                padding: 30px 20px !important; 
                margin: 35px 0 !important;
              }
              .card-title {
                font-size: 20px !important;
                line-height: 1.3 !important;
              }
              .feature-item {
                font-size: 15px !important;
                margin-bottom: 15px !important;
              }
              .footer {
                padding: 35px 15px !important;
              }
            }
          </style>
        </head>
        <body>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 0; background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%);">
            <tr>
              <td align="center" style="padding: 10px;">
                <div class="email-wrapper">
                  <div class="container">
              <div class="header">
                <div class="logo-container">
                  <div style="background: transparent; border-radius: 50%; padding: 15px; display: inline-block;">
                    <img src="https://lex-atlas.com/logo-180x180.png" alt="Lex Atlas" class="logo-img" style="background: transparent; border: none; padding: 0; width: 110px; height: 110px; object-fit: contain; filter: brightness(0) invert(1);" />
                  </div>
                  <div class="tagline">Your Global Legal Compass</div>
                </div>
              </div>
              
              <div class="content">
                <div class="hero-text">Welcome to Lex Atlas</div>
                
                <!-- UNIQUE IDENTIFIER FOR RESEND CACHE BYPASS v2.0: ${Date.now()} -->
                <div style="display: none; color: transparent; font-size: 0;">CACHE_BYPASS_V2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}</div>
                
                <p class="description">
                  You've just unlocked your first step towards mastering <strong>international legal procedures</strong>.
                  As promised, here is your exclusive resource:
                </p>
                
                <div class="cta-container">
                  <a href="${sampleUrl || `${env.baseUrl}/downloads/samples/LEXATLAS-global-sample.pdf`}" class="cta-button">
                    📥 Download your free guide
                  </a>
                </div>
                
                <div class="premium-card">
                  <h3 class="card-title">What's included in your premium sample:</h3>
                  <ul class="feature-list">
                    <li class="feature-item">
                      <div class="feature-icon"></div>
                      Essential document checklist with legal requirements
                    </li>
                    <li class="feature-item">
                      <div class="feature-icon"></div>
                      Step-by-step procedure overview and timeline
                    </li>
                    <li class="feature-item">
                      <div class="feature-icon"></div>
                      Important deadlines and critical dates
                    </li>
                    <li class="feature-item">
                      <div class="feature-icon"></div>
                      Contact information for relevant authorities
                    </li>
                  </ul>
                </div>
                
                <p class="description">
                  With Lex Atlas, you get <em>expert-built, country-specific PDF kits</em> that make complex international procedures clear and affordable.
                </p>
                
                <p class="description">
                  Stay tuned — we'll keep sending you premium insights and updates to help you navigate cross-border challenges with confidence.
                </p>
                
                <p class="description">
                  Best regards,<br>
                  <strong style="color: #1A2E4F;">The Lex Atlas Team</strong>
                </p>
              </div>
              
              <div class="footer">
                <div class="footer-text">© ${new Date().getFullYear()} Lex Atlas · All rights reserved</div>
                <div class="footer-text">
                  <a href="${env.baseUrl}/unsubscribe" style="color: #D4AF37; text-decoration: underline;">Unsubscribe</a>
                </div>
              </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `🎉 Your free Lex Atlas resource is here

Welcome to Lex Atlas!

You've just unlocked your first step towards mastering international legal procedures.
As promised, here is your exclusive resource:

Download your free guide: ${sampleUrl || `${env.baseUrl}/downloads/samples/LEXATLAS-global-sample.pdf`}

What's included:
• Essential document checklist with legal requirements
• Step-by-step procedure overview and timeline  
• Important deadlines and critical dates
• Contact information for relevant authorities

With Lex Atlas, you get expert-built, country-specific PDF kits that make complex international procedures clear and affordable.

Stay tuned — we'll keep sending you premium insights and updates to help you navigate cross-border challenges with confidence.

Best regards,
The Lex Atlas Team

© ${new Date().getFullYear()} Lex Atlas · All rights reserved
Unsubscribe: ${env.baseUrl}/unsubscribe
Jurist guidance only – not a law firm or attorney.`,
    });

    if (error) {
      console.log('[ULTRA PREMIUM EMAIL] Resend API error:', error);
      return {
        sent: false,
        reason: 'provider_error',
        from: fromAddress,
        echoTo: process.env.EMAIL_ECHO_TO ?? null,
      };
    }

    console.log('[ULTRA PREMIUM EMAIL] Success:', data);
    return {
      sent: true,
      reason: null,
      from: fromAddress,
      echoTo: process.env.EMAIL_ECHO_TO ?? null,
    };

  } catch (err: any) {
    console.error('[ULTRA PREMIUM EMAIL] Send error:', err);
    return {
      sent: false,
      reason: 'provider_error',
      from: fromAddress,
      echoTo: process.env.EMAIL_ECHO_TO ?? null,
    };
  }
}
