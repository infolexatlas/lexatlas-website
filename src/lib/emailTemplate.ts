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

  const subject = "🎯 NOUVEAU TEMPLATE 2025 - Test Final - LexAtlas Premium Sample";
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
          <title>🎯 NOUVEAU TEMPLATE 2025 - LexAtlas Premium Sample</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Georgia', serif; 
              line-height: 1.6; 
              color: #374151; 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            .email-wrapper { 
              width: 100%; 
              max-width: 100%; 
              margin: 0; 
              padding: 20px 0; 
              background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%);
            }
            
            .container { 
              width: 100%; 
              max-width: 100%; 
              margin: 0 auto; 
              background-color: #FFFFFF; 
              border-radius: 24px;
              box-shadow: 0 8px 32px -4px rgba(26, 46, 79, 0.12);
              overflow: hidden;
              border: 1px solid rgba(212, 175, 55, 0.1);
            }
            
            .header { 
              background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 50%, #1A2E4F 100%); 
              padding: 50px 30px; 
              text-align: center; 
              width: 100%; 
              position: relative;
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
              padding: 50px 30px; 
              background-color: #FFFFFF; 
              width: 100%; 
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
              font-family: 'Georgia', serif;
              font-size: 38px; 
              font-weight: 700; 
              color: #1A2E4F; 
              margin-bottom: 35px; 
              text-align: center; 
              line-height: 1.2;
              letter-spacing: -0.5px;
            }
            
            .description { 
              font-size: 20px; 
              color: #6B7280; 
              margin-bottom: 45px; 
              line-height: 1.7; 
              text-align: center;
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
              font-family: 'Georgia', serif;
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
              padding: 45px 40px; 
              border-radius: 25px; 
              margin: 55px 0; 
              border: 1px solid rgba(212, 175, 55, 0.2);
              box-shadow: 0 8px 30px -2px rgba(26, 46, 79, 0.1);
              position: relative;
              overflow: hidden;
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
              font-family: 'Georgia', serif;
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
              padding: 50px 30px; 
              text-align: center; 
              border-top: 1px solid rgba(212, 175, 55, 0.1);
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
                width: 120px !important; 
                height: 120px !important; 
              }
              .tagline { 
                font-size: 18px !important; 
              }
              .content { 
                padding: 40px 20px !important; 
              }
              .hero-text { 
                font-size: 32px !important; 
              }
              .description { 
                font-size: 18px !important; 
              }
              .cta-button { 
                padding: 25px 45px !important; 
                font-size: 19px !important; 
                width: calc(100% - 40px) !important; 
                max-width: 320px !important; 
              }
              .premium-card { 
                padding: 40px 30px !important; 
                margin: 45px 0 !important; 
              }
              .card-title { 
                font-size: 24px !important; 
              }
              .footer { 
                padding: 45px 20px !important; 
              }
              .footer-text { 
                font-size: 16px !important; 
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
                width: 100px !important; 
                height: 100px !important; 
              }
              .content { 
                padding: 30px 15px !important; 
              }
              .hero-text { 
                font-size: 28px !important; 
              }
              .cta-button { 
                padding: 22px 40px !important; 
                font-size: 17px !important; 
                width: calc(100% - 30px) !important; 
              }
              .premium-card { 
                padding: 35px 25px !important; 
              }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="container">
              <div class="header">
                <div class="logo-container">
                  <div style="background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 100%); border-radius: 50%; padding: 15px; display: inline-block; box-shadow: 0 8px 32px -4px rgba(26, 46, 79, 0.3);">
                    <img src="${env.baseUrl}/logo-180x180.png" alt="LexAtlas" class="logo-img" style="background: transparent; border: none; padding: 0;" />
                  </div>
                  <div class="tagline">Your Global Legal Compass</div>
                </div>
              </div>
              
              <div class="content">
                <div style="text-align: center;">
                  <div class="premium-badge">
                    🎯 NOUVEAU TEMPLATE 2025 ⭐ TEST FINAL ⭐
                  </div>
                </div>
                
                <div class="hero-text">Your Premium Sample Kit is Ready</div>
                
                <!-- UNIQUE IDENTIFIER FOR RESEND CACHE BYPASS: ${Date.now()} -->
                <div style="display: none; color: transparent; font-size: 0;">CACHE_BYPASS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}</div>
                
                <p class="description">
                  Thank you for choosing LexAtlas! We're excited to share our comprehensive 
                  marriage kit sample with you. This premium resource showcases the quality and 
                  thoroughness you can expect from our full marriage kits.
                </p>
                
                <div class="cta-container">
                  <a href="${sampleUrl || `${env.baseUrl}/downloads/samples/LEXATLAS-global-sample.pdf`}" class="cta-button">
                    📥 Download Your Premium Sample Kit
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
                  This sample demonstrates the premium quality of our full LexAtlas kits. 
                  For complete legal step-by-step guidance and expert support, explore our 
                  <a href="${env.baseUrl}/pricing" class="pricing-link">Premium Kits</a>.
                </p>
                
                <p class="description">
                  Questions? Our expert team is here to help. Reply to this email or contact us at 
                  <a href="mailto:contact.lexatlas@gmail.com" class="contact-link">contact.lexatlas@gmail.com</a>
                </p>
                
                <p class="description">
                  Best regards,<br>
                  <strong style="color: #1A2E4F;">The LexAtlas Team</strong>
                </p>
              </div>
              
              <div class="footer">
                <div class="footer-text">© 2025 LexAtlas. All rights reserved.</div>
                <div class="footer-text">This email was sent to ${to} because you requested a premium sample.</div>
                <div class="disclaimer">Jurist guidance only – not a law firm or attorney.</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `🎯 NOUVEAU TEMPLATE 2025 - LexAtlas Premium Sample

Thank you for choosing LexAtlas!

Your premium sample kit is ready:
${sampleUrl || `${env.baseUrl}/downloads/samples/LEXATLAS-global-sample.pdf`}

What's included:
• Essential document checklist with legal requirements
• Step-by-step procedure overview and timeline  
• Important deadlines and critical dates
• Contact information for relevant authorities

This sample demonstrates the premium quality of our full LexAtlas kits.

For complete legal guidance, visit: ${env.baseUrl}/pricing

Questions? Contact us at: contact.lexatlas@gmail.com

Best regards,
The LexAtlas Team

© 2025 LexAtlas. All rights reserved.
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
