import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendLeadSampleEmail } from '@/lib/sendEmail'
import { IS_DEV, RESEND_API_KEY } from '@/lib/env'
import { getEmailEnv } from '@/lib/emailEnv'

const DATA_DIR = path.join(process.cwd(), '.data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl')

// Ensure .data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Append lead to JSONL file
function appendLead(email: string, source: string) {
  ensureDataDir()
  
  const lead = {
    email,
    source,
    timestamp: new Date().toISOString(),
    ip: 'captured-if-available' // Could be enhanced with actual IP capture
  }
  
  fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body
    const env = getEmailEnv()

    console.log('[API/leads] start', { nodeEnv: process.env.NODE_ENV, hasKey: env.hasKey, email })

    // Basic validation
    if (!email || typeof email !== 'string') {
      console.log('[API/leads] invalid email format')
      return NextResponse.json(
        { ok: false, error: 'invalid_email' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('[API/leads] email validation failed:', email)
      return NextResponse.json(
        { ok: false, error: 'invalid_email' },
        { status: 400 }
      )
    }

    console.log('[API/leads] email validated:', email)

    // Store lead in JSONL file
    let saved = false
    try {
      appendLead(email, source || 'lead_magnet')
      saved = true
      console.log('[API/leads] saved lead', { email })
    } catch (error) {
      console.error('[API/leads] error storing lead:', error)
      // Continue with email sending even if storage fails
    }

    // Send lead sample email
    try {
      const result = await sendLeadSampleEmail(email, `${env.baseUrl}/downloads/samples/LEXATLAS-global-sample.pdf`)
      console.log('[API/leads] result', { 
        sent: result.sent, 
        reason: result.reason, 
        from: env.resolvedFrom, 
        echoTo: process.env.EMAIL_ECHO_TO || null 
      })

      // Determine user-friendly message
      let userMessage = 'Thank you for subscribing!'
      if (result.sent === false) {
        if (result.reason === 'provider_error') {
          userMessage = 'Thank you for subscribing! Your email has been saved and we\'ll contact you soon.'
        } else if (result.reason === 'missing_key_dev') {
          userMessage = 'Thank you for subscribing!'
        } else {
          userMessage = 'Thank you for subscribing!'
        }
      }

      return NextResponse.json({
        ok: true,
        saved: true,
        sent: result.sent === true,
        reason: result.reason ?? null,
        message: userMessage,
        email,
        env: {
          hasKey: env.hasKey,
          resolvedFrom: env.resolvedFrom,
          resolvedReason: env.resolvedReason,
          mode: process.env.NODE_ENV,
          echoTo: process.env.EMAIL_ECHO_TO ?? null,
          forcedSandbox: process.env.EMAIL_FORCE_SANDBOX === '1',
        },
      })
    } catch (emailError) {
      console.error('[API/leads] error sending email:', emailError)
      
      return NextResponse.json(
        { 
          ok: true, 
          saved,
          email,
          sent: false, 
          error: 'email_failed',
          message: 'Thank you for subscribing! Your email has been saved.',
          warning: null
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('[API/leads] general error:', error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'unknown_error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to check if API is working
export async function GET() {
  return NextResponse.json(
    { status: 'ok', message: 'Leads API is working' },
    { status: 200 }
  )
}
