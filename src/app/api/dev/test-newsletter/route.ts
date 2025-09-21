import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { sendNewsletterEmail } from '@/lib/email'
import { IS_DEV, RESEND_API_KEY } from '@/lib/env'

const DATA_DIR = path.join(process.cwd(), '.data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl')

// Ensure .data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Hash IP address for privacy
function hashIP(ip: string): string {
  const salt = process.env.LEADS_SALT || 'lexatlas-leads-salt-2025'
  return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16)
}

// Append newsletter subscription to JSONL file
function appendNewsletterSubscription(
  email: string, 
  userAgent: string, 
  ip: string, 
  success: boolean, 
  error?: string
) {
  try {
    ensureDataDir()
    
    const subscription = {
      email,
      source: 'newsletter',
      createdAt: new Date().toISOString(),
      userAgent: userAgent || 'unknown',
      ipHash: hashIP(ip || 'unknown'),
      success,
      error: error || null
    }
    
    fs.appendFileSync(LEADS_FILE, JSON.stringify(subscription) + '\n')
    return true
  } catch (error) {
    console.error('[Test Newsletter] Failed to save subscription:', error)
    return false
  }
}

export async function GET(request: NextRequest) {
  // Only allow in development
  if (!IS_DEV) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 404 }
    )
  }

  const testEmail = 'contact.lexatlas@gmail.com'
  const userAgent = 'dev-test-newsletter'
  const ip = '127.0.0.1'

  try {
    // Check if RESEND_API_KEY is missing
    if (!RESEND_API_KEY) {
      // Save subscription locally even without API key
      appendNewsletterSubscription(testEmail, userAgent, ip, false, 'missing_api_key')
      
      return NextResponse.json(
        { 
          ok: true, 
          email: testEmail,
          sent: false, 
          error: "Missing RESEND_API_KEY",
          message: 'Test subscription saved but email not sent.'
        },
        { status: 200 }
      )
    }

    // Send welcome newsletter email
    let emailSent = false
    let emailError: string | undefined = undefined

    try {
      const emailResult = await sendNewsletterEmail(testEmail)
      emailSent = emailResult.sent
      emailError = emailResult.reason || undefined
    } catch (error) {
      console.error('[Test Newsletter] Email send failed:', error)
      emailError = error instanceof Error ? error.message : 'Unknown error'
    }

    // Save subscription (always try to save, even if email failed)
    appendNewsletterSubscription(testEmail, userAgent, ip, emailSent, emailError)

    // Return response
    if (emailSent) {
      console.log('[Test Newsletter] Welcome email sent successfully to:', testEmail)
      return NextResponse.json({
        ok: true,
        email: testEmail,
        sent: true,
        message: 'Test newsletter subscription successful!'
      })
    } else {
      console.warn('[Test Newsletter] Email failed but subscription saved for:', testEmail)
      return NextResponse.json(
        { 
          ok: true, 
          email: testEmail,
          sent: false, 
          error: emailError,
          message: 'Test subscription saved but email failed.'
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('[Test Newsletter] General error:', error)
    return NextResponse.json(
      { 
        ok: false, 
        error: 'internal_error',
        message: 'Internal server error during test newsletter subscription.'
      },
      { status: 500 }
    )
  }
}
