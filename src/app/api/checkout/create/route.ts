import { NextRequest, NextResponse } from 'next/server'
import { kitsDetail } from '@/lib/kits-detail-data'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { kit } = body as { kit?: string }
    if (!kit) {
      return NextResponse.json({ ok: false, error: 'missing_kit' }, { status: 400 })
    }

    const item = kitsDetail[kit as keyof typeof kitsDetail] as any
    if (!item) {
      return NextResponse.json({ ok: false, error: 'unknown_kit' }, { status: 400 })
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    if (!stripeKey) {
      const url = `${baseUrl}/success?kit=${encodeURIComponent(kit)}&dev=1&session_id=fake_${Date.now()}`
      return NextResponse.json({ ok: true, url }, { status: 200 })
    }

    // Use Stripe REST API directly via fetch instead of SDK
    const sessionData = new URLSearchParams()
    sessionData.append('mode', 'payment')
    sessionData.append('line_items[0][price_data][currency]', 'eur')
    sessionData.append('line_items[0][price_data][unit_amount]', String(Math.round((item.priceEUR || 29) * 100)))
    sessionData.append('line_items[0][price_data][product_data][name]', `${String(item.slug || kit).toUpperCase().replace('-', ' – ')} Marriage Kit`)
    sessionData.append('line_items[0][quantity]', '1')
    sessionData.append('success_url', `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&kit=${encodeURIComponent(kit)}`)
    sessionData.append('cancel_url', `${baseUrl}/checkout?kit=${encodeURIComponent(kit)}&canceled=1`)

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: sessionData.toString(),
    })

    const sessionJson = await response.json() as any

    if (!response.ok) {
      console.error('[checkout] Stripe error:', sessionJson)
      return NextResponse.json({
        ok: false,
        error: 'server_error',
        detail: sessionJson.error?.message || 'Stripe error'
      }, { status: 500 })
    }

    return NextResponse.json({ ok: true, url: sessionJson.url }, { status: 200 })
  } catch (error: any) {
    const errorMsg = error?.message || String(error)
    console.error('[checkout] error', errorMsg)
    return NextResponse.json({ ok: false, error: 'server_error', detail: errorMsg }, { status: 500 })
  }
}


