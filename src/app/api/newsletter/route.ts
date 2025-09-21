import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { sendNewsletterEmail } from '@/lib/sendEmail'
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
    console.error('[Newsletter] Failed to save subscription:', error)
    return false
  }
}

// Robust email validation
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  if (email.length > 254) return false // RFC 5321 limit
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body
    const env = getEmailEnv()

    console.log('[API/newsletter] start', { nodeEnv: process.env.NODE_ENV, hasKey: env.hasKey, email })

    // Validate email
    if (!isValidEmail(email)) {
      console.log('[API/newsletter] invalid email format')
      return NextResponse.json(
        { ok: false, error: 'invalid_email' },
        { status: 400 }
      )
    }

    console.log('[API/newsletter] email validated:', email)

    // Extract request metadata
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Store lead in JSONL file
    let saved = false
    try {
      appendNewsletterSubscription(email, userAgent, ip, true, undefined)
      saved = true
      console.log('[API/newsletter] saved lead', { email })
    } catch (error) {
      console.error('[API/newsletter] error storing subscription:', error)
      // Continue with email sending even if storage fails
    }

    // Send newsletter email
    try {
      const result = await sendNewsletterEmail(email)
      console.log('[API/newsletter] result', { 
        sent: result.sent, 
        reason: result.reason, 
        from: env.resolvedFrom, 
        echoTo: process.env.EMAIL_ECHO_TO || null 
      })

      return NextResponse.json({
        ok: true,
        saved: true,
        sent: result.sent === true,
        reason: result.reason ?? null,
        message: result.reason ?? null,
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
      console.error('[API/newsletter] error sending email:', emailError)
      
      return NextResponse.json({
        ok: true,
        saved: true,
        sent: false,
        reason: 'provider_error',
        message: emailError instanceof Error ? emailError.message : 'Unknown error',
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
    }

  } catch (error) {
    console.error('[API/newsletter] general error:', error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'unknown_error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to check if API is working
export async function GET() {
  return NextResponse.json(
    { status: 'ok', message: 'Newsletter API is working' },
    { status: 200 }
  )
}
