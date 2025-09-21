import { Resend } from "resend";
import { getEmailEnv } from "./emailEnv";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPremiumLeadSampleEmail(to: string, sampleUrl: string) {
  const env = getEmailEnv();
  
  if (!env.hasKey) {
    throw new Error("RESEND_API_KEY missing");
  }

  const subject = "Your Premium LexAtlas Sample Kit";
  const fromAddress = env.resolvedFrom;
  
  console.log('[email] sendPremiumLeadSampleEmail called', {
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
          <title>Your Premium LexAtlas Sample</title>
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
              box-shadow: 0 8px 32px -4px rgba(212, 175, 55, 0.3);
              border: 3px solid rgba(212, 175, 55, 0.2);
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
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 25px;
              box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            
            .hero-text { 
              font-family: 'Georgia', serif;
              font-size: 32px; 
              font-weight: 700; 
              color: #1A2E4F; 
              margin-bottom: 30px; 
              text-align: center; 
              line-height: 1.2;
              letter-spacing: -0.5px;
            }
            
            .description { 
              font-size: 18px; 
              color: #6B7280; 
              margin-bottom: 40px; 
              line-height: 1.7; 
              text-align: center;
            }
            
            .cta-container {
              text-align: center;
              margin: 40px 0;
            }
            
            .cta-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #1A2E4F 0%, #2D4A6B 100%); 
              color: #D4AF37; 
              padding: 22px 45px; 
              text-decoration: none; 
              border-radius: 16px; 
              font-weight: 700; 
              font-size: 18px; 
              text-align: center; 
              box-shadow: 0 8px 32px -4px rgba(26, 46, 79, 0.25);
              border: 2px solid transparent;
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
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
              transform: translateY(-2px);
              box-shadow: 0 12px 40px -4px rgba(26, 46, 79, 0.35);
              border-color: #D4AF37;
              color: #FFD700;
            }
            
            .premium-card { 
              background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FB 100%);
              padding: 35px 30px; 
              border-radius: 20px; 
              margin: 45px 0; 
              border: 1px solid rgba(212, 175, 55, 0.2);
              box-shadow: 0 4px 20px -2px rgba(26, 46, 79, 0.08);
              position: relative;
              overflow: hidden;
            }
            
            .premium-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
            }
            
            .card-title { 
              font-family: 'Georgia', serif;
              font-size: 24px; 
              color: #1A2E4F; 
              margin: 0 0 20px 0; 
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
              margin-bottom: 15px;
              font-size: 16px;
              color: #6B7280;
            }
            
            .feature-icon {
              width: 20px;
              height: 20px;
              background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%);
              border-radius: 50%;
              margin-right: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            
            .feature-icon::before {
              content: '✓';
              color: #1A2E4F;
              font-weight: bold;
              font-size: 12px;
            }
            
            .footer { 
              background: linear-gradient(135deg, #F5F7FB 0%, #FFFFFF 100%); 
              padding: 40px 30px; 
              text-align: center; 
              border-top: 1px solid rgba(212, 175, 55, 0.1);
            }
            
            .footer-text { 
              font-size: 16px; 
              color: #6B7280; 
              margin: 8px 0; 
              line-height: 1.6; 
            }
            
            .disclaimer { 
              font-size: 14px; 
              color: #9CA3AF; 
              margin-top: 25px; 
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
                font-size: 28px !important; 
              }
              .description { 
                font-size: 16px !important; 
              }
              .cta-button { 
                padding: 20px 35px !important; 
                font-size: 16px !important; 
                width: calc(100% - 40px) !important; 
                max-width: 280px !important; 
              }
              .premium-card { 
                padding: 30px 20px !important; 
                margin: 35px 0 !important; 
              }
              .card-title { 
                font-size: 20px !important; 
              }
              .footer { 
                padding: 35px 20px !important; 
              }
              .footer-text { 
                font-size: 14px !important; 
              }
              .disclaimer { 
                font-size: 12px !important; 
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
                font-size: 24px !important; 
              }
              .cta-button { 
                padding: 18px 30px !important; 
                font-size: 15px !important; 
                width: calc(100% - 30px) !important; 
              }
              .premium-card { 
                padding: 25px 15px !important; 
              }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="container">
              <div class="header">
                <div class="logo-container">
                  <img src="${env.baseUrl}/logo-180x180.png" alt="LexAtlas" class="logo-img" />
                  <div class="tagline">Your Global Legal Compass</div>
                </div>
              </div>
              
              <div class="content">
                <div style="text-align: center;">
                  <div class="premium-badge">
                    🎯 PREMIUM DESIGN 2025 ⭐ Premium International Solutions
                  </div>
                </div>
                
                <div class="hero-text">Your Premium Sample Kit is Ready</div>
                
                <p class="description">
                  Thank you for choosing LexAtlas! We're excited to share our comprehensive 
                  marriage kit sample with you. This premium resource showcases the quality and 
                  thoroughness you can expect from our full marriage kits.
                </p>
                
                <div class="cta-container">
                  <a href="${sampleUrl}" class="cta-button">
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
      text: `Your Premium LexAtlas Sample

Thank you for choosing LexAtlas!

Your premium sample kit is ready:
${sampleUrl}

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
      console.log('[Email] Resend API error:', error);
      return {
        sent: false,
        reason: 'provider_error',
        from: fromAddress,
        echoTo: process.env.EMAIL_ECHO_TO ?? null,
      };
    }

    console.log('[Email] Success:', data);
    return {
      sent: true,
      reason: null,
      from: fromAddress,
      echoTo: process.env.EMAIL_ECHO_TO ?? null,
    };

  } catch (err: any) {
    console.error('[Email] Send error:', err);
    return {
      sent: false,
      reason: 'provider_error',
      from: fromAddress,
      echoTo: process.env.EMAIL_ECHO_TO ?? null,
    };
  }
}
