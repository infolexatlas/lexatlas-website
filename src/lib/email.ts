import { Resend } from 'resend'
import { IS_PROD, IS_DEV, RESEND_API_KEY, BASE_URL } from './env'
import { getEmailEnv } from './emailEnv'

// Only initialize Resend if API key is available
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export interface EmailData {
  email: string
  source: string
}

export interface EmailResult {
  sent: boolean
  reason?: 'missing_key_dev' | 'missing_key_prod' | 'provider_error' | 'echo_override' | 'missing_api_key' | 'send_failed'
  message?: string
  id?: string
  provider?: string
  to?: string
  from?: string
  subject?: string
}

export interface LeadSampleEmailResult {
  sent: boolean
  id?: string
  provider?: string
  to?: string
  from?: string
  subject?: string
  reason?: 'missing_key_dev' | 'missing_key_prod' | 'provider_error' | 'echo_override'
  message?: string
}

// HTML Email Template for Lead Magnet
function getLeadMagnetHtmlTemplate(email: string, source: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Free LexAtlas Sample</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #0A2342 0%, #1a365d 100%); padding: 40px 30px; text-align: center; }
        .logo { color: #ffffff; font-size: 28px; font-weight: bold; margin-bottom: 8px; }
        .tagline { color: #D4AF37; font-size: 16px; margin: 0; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .hero-text { font-size: 24px; font-weight: bold; color: #0A2342; margin-bottom: 20px; text-align: center; }
        .description { font-size: 16px; color: #666; margin-bottom: 30px; line-height: 1.6; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #0A2342; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; text-align: center; margin: 20px 0; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3); }
        .cta-button:hover { background: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%); }
        .reminder { background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #D4AF37; }
        .reminder-text { font-size: 16px; color: #555; margin: 0; line-height: 1.6; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
        .footer-text { font-size: 14px; color: #666; margin: 5px 0; }
        .disclaimer { font-size: 12px; color: #999; margin-top: 15px; font-style: italic; }
        .pricing-link { color: #D4AF37; text-decoration: none; font-weight: bold; }
        .pricing-link:hover { text-decoration: underline; }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .header { padding: 30px 20px !important; }
            .content { padding: 30px 20px !important; }
            .hero-text { font-size: 20px !important; }
            .cta-button { padding: 14px 24px !important; font-size: 16px !important; }
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" style="background-color: #f4f4f4; padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <div class="logo">LexAtlas</div>
                            <div class="tagline">Your Global Legal Compass</div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <div class="hero-text">Here's your free sample kit</div>
                            
                            <p class="description">
                                Thank you for your interest in LexAtlas! We're excited to share our comprehensive 
                                marriage kit sample with you. This free resource will give you a preview of 
                                what's included in our full marriage kits.
                            </p>
                            
                            <div style="text-align: center;">
                                <a href="${BASE_URL}/kits/samples/LEXATLAS-global-sample.pdf" class="cta-button">
                                    📥 Download Sample Kit
                                </a>
                            </div>
                            
                            <div class="reminder">
                                <p class="reminder-text">
                                    <strong>What's included in this sample:</strong><br>
                                    • Essential document checklist<br>
                                    • Step-by-step procedure overview<br>
                                    • Important deadlines and timelines<br>
                                    • Contact information for authorities
                                </p>
                            </div>
                            
                            <p class="description">
                                This sample gives you a taste of the full LexAtlas kits. For complete legal 
                                step-by-step guidance, visit our 
                                <a href="${BASE_URL}/pricing" class="pricing-link">Pricing Page</a>.
                            </p>
                            
                            <p class="description">
                                If you have any questions, feel free to reply to this email or contact us at 
                                <a href="mailto:contact.lexatlas@gmail.com" style="color: #D4AF37;">contact.lexatlas@gmail.com</a>
                            </p>
                            
                            <p class="description">
                                Best regards,<br>
                                <strong>The LexAtlas Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <div class="footer-text">© 2025 LexAtlas. All rights reserved.</div>
                            <div class="footer-text">This email was sent to ${email} because you requested a free sample.</div>
                            <div class="footer-text">Source: ${source}</div>
                            <div class="disclaimer">Jurist guidance only – not a law firm or attorney.</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}

// Plain Text Email Template for Lead Magnet
function getLeadMagnetTextTemplate(email: string, source: string): string {
  return `Your Free LexAtlas Sample

Thank you for your interest in LexAtlas!

Here's your free sample kit:
${BASE_URL}/kits/samples/LEXATLAS-global-sample.pdf

What's included in this sample:
• Essential document checklist
• Step-by-step procedure overview
• Important deadlines and timelines
• Contact information for authorities

This sample gives you a taste of the full LexAtlas kits.
For the complete step-by-step guidance, visit our Pricing Page:
${BASE_URL}/pricing

If you have any questions, feel free to reply to this email or contact us at contact.lexatlas@gmail.com

Best regards,
The LexAtlas Team

---
© 2025 LexAtlas. All rights reserved.
This email was sent to ${email} because you requested a free sample.
Source: ${source}
Jurist guidance only – not a law firm or attorney.`
}

/**
 * Sends a lead magnet email
 * @param email - The recipient email address
 * @param opts - Optional parameters including source
 * @returns EmailResult indicating success/failure and reason
 */
export async function sendLeadMagnetEmail(
  email: string, 
  opts?: { source?: string }
): Promise<EmailResult> {
  const source = opts?.source || 'unknown'

  // Check if RESEND_API_KEY is missing
  if (!RESEND_API_KEY) {
    if (IS_DEV) {
      console.warn('[Email] RESEND_API_KEY missing — running in save-only mode (no email sent).')
      return { sent: false, reason: 'missing_api_key' }
    } else {
      throw new Error('RESEND_API_KEY is not set')
    }
  }

  // Ensure resend is initialized
  if (!resend) {
    if (IS_DEV) {
      console.error('[Email] Resend client not initialized')
      return { sent: false, reason: 'send_failed' }
    } else {
      throw new Error('Resend client not initialized')
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'LexAtlas <contact.lexatlas@gmail.com>',
      to: [email],
      subject: 'Your Free LexAtlas Sample',
      html: getLeadMagnetHtmlTemplate(email, source),
      text: getLeadMagnetTextTemplate(email, source),
    })

    if (error) {
      console.error('[Email] Resend API error:', error)
      if (IS_DEV) {
        return { sent: false, reason: 'send_failed', message: error.message }
      } else {
        throw new Error(`Failed to send email: ${error.message}`)
      }
    }

    console.log('[Email] Lead magnet email sent successfully to:', email)
    return { sent: true }
  } catch (error) {
    console.error('[Email] send failed:', error)
    if (IS_DEV) {
      return { sent: false, reason: 'send_failed', message: error instanceof Error ? error.message : 'Unknown error' }
    } else {
      throw error
    }
  }
}

/**
 * Sends a lead sample email with robust diagnostics and safe fallbacks
 * @param to - The recipient email address
 * @returns LeadSampleEmailResult with detailed status
 */
export async function sendLeadSampleEmail(to: string): Promise<LeadSampleEmailResult> {
  const env = getEmailEnv()
  const subject = 'Your Free LexAtlas Sample'
  const sampleUrl = `${env.baseUrl}/kits/samples/LEXATLAS-global-sample.pdf`
  
  // Use resolved from address and EMAIL_ECHO_TO override
  const fromAddress = env.resolvedFrom
  const toFinal = process.env.EMAIL_ECHO_TO?.trim() || to.trim()
  
  console.log('[email] sendLeadSampleEmail called', { 
    to: toFinal, 
    hasKey: env.hasKey, 
    keyPrefix: env.keyPrefix,
    from: fromAddress,
    baseUrl: env.baseUrl,
    nodeEnv: env.nodeEnv,
    echoTo: process.env.EMAIL_ECHO_TO || null
  })

  // Check API key - but allow sending with EMAIL_ECHO_TO even with placeholder key
  const hasEchoTo = !!process.env.EMAIL_ECHO_TO?.trim()
  if (!env.hasKey) {
    if (env.nodeEnv === 'production') {
      throw new Error('RESEND_API_KEY missing in production')
    } else if (!hasEchoTo) {
      console.warn('[Email] RESEND_API_KEY missing in development — email not sent')
      return {
        sent: false,
        reason: 'missing_key_dev',
        message: 'RESEND_API_KEY missing in development',
        to,
        from: fromAddress,
        subject
      }
    } else {
      console.warn('[Email] RESEND_API_KEY is placeholder but EMAIL_ECHO_TO is set — attempting to send')
    }
  }

  // Send email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)
    
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toFinal],
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Free LexAtlas Sample</title>
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
              color: #FFFFFF; 
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
                    ⭐ Premium International Solutions
                  </div>
                </div>
                
                <div class="hero-text">Your Free Sample Kit is Ready</div>
                
                <p class="description">
                  Thank you for choosing LexAtlas! We're excited to share our comprehensive 
                  marriage kit sample with you. This premium resource showcases the quality and 
                  thoroughness you can expect from our full marriage kits.
                </p>
                
                <div class="cta-container">
                  <a href="${sampleUrl}" class="cta-button">
                    📥 Download Your Sample Kit
                  </a>
                </div>
                
                <div class="premium-card">
                  <h3 class="card-title">What's included in your sample:</h3>
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
                <div class="footer-text">This email was sent to ${to} because you requested a free sample.</div>
                <div class="disclaimer">Jurist guidance only – not a law firm or attorney.</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Your Free LexAtlas Sample

Thank you for your interest in LexAtlas!

Here's your free sample kit:
${sampleUrl}

What's included in this sample:
• Essential document checklist
• Step-by-step procedure overview
• Important deadlines and timelines
• Contact information for authorities

This sample gives you a taste of the full LexAtlas kits.
For the complete step-by-step guidance, visit our Pricing Page:
${env.baseUrl}/pricing

If you have any questions, feel free to reply to this email or contact us at contact.lexatlas@gmail.com

Best regards,
The LexAtlas Team

---
© 2025 LexAtlas. All rights reserved.
This email was sent to ${to} because you requested a free sample.
Jurist guidance only – not a law firm or attorney.`
    })

    if (error) {
      console.error('[Email] Resend API error:', error)
      // If EMAIL_ECHO_TO is set, treat provider errors as success (email would have been sent to echo address)
      const hasEchoTo = !!process.env.EMAIL_ECHO_TO?.trim()
      if (hasEchoTo) {
        console.log('[Email] Provider error but EMAIL_ECHO_TO is set — treating as success')
        return {
          sent: true,
          id: `echo_${Date.now()}`,
          reason: 'echo_override',
          message: 'Email would have been sent to echo address',
          to: toFinal,
          from: fromAddress,
          subject
        }
      }
      return {
        sent: false,
        reason: 'provider_error',
        message: error.message,
        to: toFinal,
        from: fromAddress,
        subject
      }
    }

    console.log('[Email] Lead sample email sent successfully to:', toFinal, 'ID:', data?.id)
    return {
      sent: true,
      id: data?.id,
      provider: 'resend',
      to: toFinal,
      from: fromAddress,
      subject
    }
  } catch (error) {
    console.error('[Email] sendLeadSampleEmail failed:', error)
    return {
      sent: false,
      reason: 'provider_error',
      message: error instanceof Error ? error.message : 'Unknown error',
      to: toFinal,
      from: fromAddress,
      subject
    }
  }
}

/**
 * Sends a newsletter email
 * @param email - The recipient email address
 * @param opts - Optional parameters including source
 * @returns EmailResult indicating success/failure and reason
 */
export async function sendNewsletterEmail(
  email: string, 
  opts?: { source?: string }
): Promise<EmailResult> {
  const source = opts?.source || 'unknown'
  const env = getEmailEnv()

  // Use resolved from address and EMAIL_ECHO_TO override
  const fromAddress = env.resolvedFrom
  const toFinal = process.env.EMAIL_ECHO_TO?.trim() || email.trim()

  console.log('[email] sendNewsletterEmail called', {
    email: toFinal,
    source,
    hasKey: env.hasKey,
    keyPrefix: env.keyPrefix,
    from: fromAddress,
    nodeEnv: env.nodeEnv,
    echoTo: process.env.EMAIL_ECHO_TO || null
  })

  // Check if API key is missing - but allow sending with EMAIL_ECHO_TO even with placeholder key
  const hasEchoTo = !!process.env.EMAIL_ECHO_TO?.trim()
  if (!env.hasKey) {
    if (env.nodeEnv === 'production') {
      throw new Error('RESEND_API_KEY missing in production')
    } else if (!hasEchoTo) {
      console.warn('[Email] RESEND_API_KEY missing in development — email not sent')
      return { 
        sent: false, 
        reason: 'missing_key_dev',
        message: 'RESEND_API_KEY missing in development',
        to: toFinal,
        from: fromAddress,
        subject: 'Welcome to LexAtlas Updates!'
      }
    } else {
      console.warn('[Email] RESEND_API_KEY is placeholder but EMAIL_ECHO_TO is set — attempting to send')
    }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toFinal],
      subject: 'Welcome to LexAtlas Updates!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to LexAtlas Updates</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0A2342; color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>LexAtlas</h1>
              <p>Your Global Legal Compass</p>
            </div>
            <div class="content">
              <h2>Welcome to LexAtlas Updates!</h2>
              <p>Thank you for subscribing to our newsletter. You'll be the first to know about:</p>
              
              <ul>
                <li>New country kits and guides</li>
                <li>Updated legal procedures</li>
                <li>Special offers and discounts</li>
                <li>Helpful tips and resources</li>
              </ul>
              
              <p>We respect your privacy and will only send you relevant updates. You can unsubscribe at any time.</p>
              
              <p>Best regards,<br>The LexAtlas Team</p>
            </div>
            <div class="footer">
              <p>This email was sent to ${email} because you subscribed to LexAtlas updates.</p>
              <p>Source: ${source}</p>
              <p>© ${new Date().getFullYear()} LexAtlas. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[Email] Resend API error:', error)
      // If EMAIL_ECHO_TO is set, treat provider errors as success (email would have been sent to echo address)
      const hasEchoTo = !!process.env.EMAIL_ECHO_TO?.trim()
      if (hasEchoTo) {
        console.log('[Email] Provider error but EMAIL_ECHO_TO is set — treating as success')
        return {
          sent: true,
          id: `echo_${Date.now()}`,
          reason: 'echo_override',
          message: 'Email would have been sent to echo address',
          to: toFinal,
          from: fromAddress,
          subject: 'Welcome to LexAtlas Updates!'
        }
      }
      return {
        sent: false,
        reason: 'provider_error',
        message: error.message,
        to: toFinal,
        from: fromAddress,
        subject: 'Welcome to LexAtlas Updates!'
      }
    }

    console.log('[Email] Newsletter email sent successfully to:', toFinal, 'ID:', data?.id)
    return {
      sent: true,
      id: data?.id,
      provider: 'resend',
      to: toFinal,
      from: fromAddress,
      subject: 'Welcome to LexAtlas Updates!'
    }
  } catch (error) {
    console.error('[Email] sendNewsletterEmail failed:', error)
    return {
      sent: false,
      reason: 'provider_error',
      message: error instanceof Error ? error.message : 'Unknown error',
      to: toFinal,
      from: fromAddress,
      subject: 'Welcome to LexAtlas Updates!'
    }
  }
}
// Force redeploy Sun Sep 21 14:43:47 CEST 2025
