import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Log Web Vitals data
    console.log('[WEB-VITAL]', {
      name: body.name,
      value: body.value,
      delta: body.delta,
      id: body.id,
      navigationType: body.navigationType,
      timestamp: new Date().toISOString(),
    })
    
    // TODO: Send to analytics service (GA4, Vercel Analytics, etc.)
    // For now, just log to console
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error processing Web Vitals:', error)
    return NextResponse.json({ error: 'Failed to process vitals' }, { status: 500 })
  }
}
