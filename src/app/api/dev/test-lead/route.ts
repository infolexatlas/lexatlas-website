import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendLeadMagnetEmail } from '@/lib/email'
import { IS_DEV, RESEND_API_KEY } from '@/lib/env'

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
    ip: 'test-endpoint'
  }
  
  fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + '\n')
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
  const source = 'dev_test_lead'

  try {
    // Store lead in JSONL file
    try {
      appendLead(testEmail, source)
    } catch (error) {
      console.error('Error storing lead:', error)
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Failed to save lead',
          message: 'Could not save lead to database.'
        },
        { status: 500 }
      )
    }

    // Check if RESEND_API_KEY is missing
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Missing RESEND_API_KEY",
          message: 'Email service is not configured.'
        },
        { status: 500 }
      )
    }

    // Send lead magnet email
    try {
      const emailResult = await sendLeadMagnetEmail(testEmail, { source })

      if (emailResult.sent) {
        console.log('[Test Lead] Email sent successfully to:', testEmail)
        return NextResponse.json({
          ok: true,
          email: testEmail,
          sent: true,
          message: 'Test lead submitted and email sent successfully!'
        })
      } else {
        console.error('[Test Lead] Email failed:', emailResult.reason)
        return NextResponse.json(
          { 
            ok: true, 
            email: testEmail,
            sent: false, 
            error: emailResult.reason,
            message: 'Test lead saved but email failed.',
            warning: 'Email delivery failed.'
          },
          { status: 200 }
        )
      }
    } catch (emailError) {
      console.error('[Test Lead] Error sending email:', emailError)
      return NextResponse.json(
        { 
          ok: true, 
          email: testEmail,
          sent: false, 
          error: 'email_failed',
          message: 'Test lead saved but email failed.',
          warning: 'Email delivery failed.'
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('[Test Lead] General error:', error)
    return NextResponse.json(
      { 
        ok: false, 
        error: 'internal_error',
        message: 'Internal server error during test lead submission.'
      },
      { status: 500 }
    )
  }
}
