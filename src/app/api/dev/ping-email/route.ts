import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { IS_DEV, RESEND_API_KEY } from '@/lib/env'

export async function GET(request: NextRequest) {
  // Only allow in development
  if (!IS_DEV) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 404 }
    )
  }

  // Check if RESEND_API_KEY is set
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { 
        ok: false, 
        sent: false, 
        error: "Invalid or missing RESEND_API_KEY"
      },
      { status: 400 }
    )
  }

  try {
    const resend = new Resend(RESEND_API_KEY)
    
    const { data, error } = await resend.emails.send({
      from: 'LexAtlas <noreply@lexatlas.com>',
      to: ['contact.lexatlas@gmail.com'],
      subject: 'LexAtlas Test',
      html: '<p>✅ Resend is working!</p>',
      text: '✅ Resend is working!',
    })

    if (error) {
      console.error('[Email] Resend API error:', error)
      return NextResponse.json(
        { 
          ok: false, 
          sent: false, 
          error: "Invalid or missing RESEND_API_KEY"
        },
        { status: 400 }
      )
    }

    console.log('[Email] Test email sent successfully to: contact.lexatlas@gmail.com')
    return NextResponse.json({
      ok: true,
      sent: true
    })
  } catch (error) {
    console.error('[Email] send failed:', error)
    return NextResponse.json(
      { 
        ok: false, 
        sent: false, 
        error: "Invalid or missing RESEND_API_KEY"
      },
      { status: 400 }
    )
  }
}
