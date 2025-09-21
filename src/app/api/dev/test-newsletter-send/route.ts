import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterEmail } from '@/lib/email'
import { getEmailEnv } from '@/lib/emailEnv'
import { IS_DEV } from '@/lib/env'

export async function GET(request: NextRequest) {
  // Only allow in development
  if (!IS_DEV) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 404 }
    )
  }

  const { searchParams } = new URL(request.url)
  const to = searchParams.get('to') || 'contact.lexatlas@gmail.com'

  try {
    const result = await sendNewsletterEmail(to)
    
    return NextResponse.json({
      ok: true,
      result,
      env: getEmailEnv()
    })
  } catch (error) {
    console.error('[Test Newsletter Send] Error:', error)
    
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        env: getEmailEnv()
      },
      { status: IS_DEV ? 200 : 500 }
    )
  }
}
