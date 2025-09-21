import { Resend } from 'resend'
import { BASE_URL, RESEND_API_KEY } from '@/lib/env'

// Initialize Resend if API key is available
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export interface FulfillmentData {
  sessionId: string
  customerEmail: string
  amountTotal: number
  currency: string
  kitPair?: string
  lineItems?: Array<{
    description?: string | null
    quantity?: number | null
    amount_total?: number
  }>
}

/**
 * Generates a download link for the purchased kit
 * @param sessionId - Stripe session ID
 * @param kitPair - Country pair (e.g., 'FRA-GBR')
 * @returns Download URL
 */
function generateDownloadLink(sessionId: string, kitPair?: string): string {
  if (!kitPair) {
    return `${BASE_URL}/contact?reason=download&session=${sessionId}`
  }
  
  const [country1, country2] = kitPair.toUpperCase().split('-')
  if (!country1 || !country2) {
    return `${BASE_URL}/contact?reason=download&session=${sessionId}`
  }
  
  const params = new URLSearchParams()
  params.set('order', sessionId)
  params.set('type', kitPair.toUpperCase())
  params.set('country1', country1)
  params.set('country2', country2)
  
  return `${BASE_URL}/download?${params.toString()}`
}

/**
 * HTML email template for purchase confirmation
 */
function getConfirmationHtmlTemplate(data: FulfillmentData): string {
  const downloadLink = generateDownloadLink(data.sessionId, data.kitPair)
  const kitName = data.kitPair 
    ? `${data.kitPair.replace('-', ' ↔ ')} Marriage Kit`
    : 'Your Marriage Kit'
  
  const amount = (data.amountTotal / 100).toFixed(2)
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Confirmation - Lex Atlas</title>
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
        .order-details { background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #D4AF37; }
        .order-details h3 { margin: 0 0 15px 0; color: #0A2342; font-size: 18px; }
        .order-row { display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e9ecef; }
        .order-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; font-weight: bold; color: #0A2342; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
        .footer-text { font-size: 14px; color: #666; margin: 5px 0; }
        .disclaimer { font-size: 12px; color: #999; margin-top: 15px; font-style: italic; }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .header { padding: 30px 20px !important; }
            .content { padding: 30px 20px !important; }
            .hero-text { font-size: 20px !important; }
            .cta-button { padding: 14px 24px !important; font-size: 16px !important; }
            .order-row { flex-direction: column; }
            .order-row span:last-child { margin-top: 5px; }
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
                            <div class="logo">Lex Atlas</div>
                            <div class="tagline">Your Global Legal Compass</div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <div class="hero-text">Purchase Confirmed!</div>
                            
                            <p class="description">
                                Thank you for your purchase! Your marriage kit is ready for download. 
                                We've included all the essential documents and step-by-step guidance 
                                you need for your specific country pair.
                            </p>
                            
                            <div style="text-align: center;">
                                <a href="${downloadLink}" class="cta-button">
                                    📥 Download Your Kit
                                </a>
                            </div>
                            
                            <div class="order-details">
                                <h3>Order Details</h3>
                                <div class="order-row">
                                    <span>Product:</span>
                                    <span>${kitName}</span>
                                </div>
                                <div class="order-row">
                                    <span>Order ID:</span>
                                    <span>${data.sessionId}</span>
                                </div>
                                <div class="order-row">
                                    <span>Amount:</span>
                                    <span>${amount} ${data.currency.toUpperCase()}</span>
                                </div>
                            </div>
                            
                            <p class="description">
                                <strong>What's included in your kit:</strong><br>
                                • Complete document checklist<br>
                                • Step-by-step procedure guide<br>
                                • Official form templates<br>
                                • Consulate and city hall contacts<br>
                                • Timeline and deadline tracker<br>
                                • Lifetime updates
                            </p>
                            
                            <p class="description">
                                If you have any questions or need assistance, please reply to this email 
                                or contact us at 
                                <a href="mailto:contact.lexatlas@gmail.com" style="color: #D4AF37;">contact.lexatlas@gmail.com</a>
                            </p>
                            
                            <p class="description">
                                Best regards,<br>
                                <strong>The Lex Atlas Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <div class="footer-text">© 2025 Lex Atlas. All rights reserved.</div>
                            <div class="footer-text">This email was sent to ${data.customerEmail}</div>
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

/**
 * Plain text email template for purchase confirmation
 */
function getConfirmationTextTemplate(data: FulfillmentData): string {
  const downloadLink = generateDownloadLink(data.sessionId, data.kitPair)
  const kitName = data.kitPair 
    ? `${data.kitPair.replace('-', ' ↔ ')} Marriage Kit`
    : 'Your Marriage Kit'
  
  const amount = (data.amountTotal / 100).toFixed(2)
  
  return `Purchase Confirmed!

Thank you for your purchase! Your marriage kit is ready for download.

Download your kit: ${downloadLink}

Order Details:
- Product: ${kitName}
- Order ID: ${data.sessionId}
- Amount: ${amount} ${data.currency.toUpperCase()}

What's included in your kit:
• Complete document checklist
• Step-by-step procedure guide
• Official form templates
• Consulate and city hall contacts
• Timeline and deadline tracker
• Lifetime updates

If you have any questions or need assistance, please reply to this email 
or contact us at contact.lexatlas@gmail.com

Best regards,
The Lex Atlas Team

---
© 2025 Lex Atlas. All rights reserved.
This email was sent to ${data.customerEmail}
Jurist guidance only – not a law firm or attorney.`
}

/**
 * Fulfills an order by sending confirmation email and logging details
 * @param data - Order fulfillment data
 * @returns Promise<{sent: boolean, reason?: string}>
 */
export async function fulfillOrder(data: FulfillmentData): Promise<{sent: boolean, reason?: string}> {
  const { sessionId, customerEmail, amountTotal, currency, kitPair } = data
  
  // Log the fulfillment (no secrets, no full PII)
  console.log('[Fulfillment] Processing order:', {
    sessionId,
    email: customerEmail,
    amount: amountTotal,
    currency,
    kitPair: kitPair || 'unknown',
    timestamp: new Date().toISOString()
  })
  
  // Check if Resend is configured
  if (!RESEND_API_KEY) {
    console.warn('[Fulfillment] RESEND_API_KEY not configured - email not sent')
    return { sent: false, reason: 'missing_api_key' }
  }
  
  if (!resend) {
    console.error('[Fulfillment] Resend client not initialized')
    return { sent: false, reason: 'client_not_initialized' }
  }
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Lex Atlas <contact.lexatlas@gmail.com>',
      to: [customerEmail],
      subject: 'Purchase Confirmation - Your Marriage Kit is Ready!',
      html: getConfirmationHtmlTemplate(data),
      text: getConfirmationTextTemplate(data),
    })
    
    if (error) {
      console.error('[Fulfillment] Email send failed:', error)
      return { sent: false, reason: 'email_send_failed' }
    }
    
    console.log('[Fulfillment] Confirmation email sent successfully:', {
      emailId: emailData?.id,
      to: customerEmail,
      sessionId
    })
    
    return { sent: true }
  } catch (error) {
    console.error('[Fulfillment] Unexpected error:', error)
    return { sent: false, reason: 'unexpected_error' }
  }
}
