import { NextRequest, NextResponse } from 'next/server'
import { sendLeadSampleEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email, company } = await req.json()
    if (company) {
      // honeypot filled; pretend success
      return NextResponse.json({ ok: true })
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    try {
      const result = await sendLeadSampleEmail(email)
      if (!result.sent) {
        console.log('[sample] email not sent, reason:', result.reason)
      }
    } catch (e) {
      console.log('[sample] email provider unavailable, simulating success')
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: true }) // graceful fallback
  }
}


