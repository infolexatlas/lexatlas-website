import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
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
      console.warn('[Stripe] Missing STRIPE_SECRET_KEY. Returning mock success URL.')
      const url = `${baseUrl}/success?kit=${encodeURIComponent(kit)}&dev=1&session_id=fake_${Date.now()}`
      return NextResponse.json({ ok: true, url }, { status: 200 })
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: Math.round((item.priceEUR || 29) * 100),
            product_data: {
              name: `${String(item.slug || kit).toUpperCase().replace('-', ' – ')} Marriage Kit`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&kit=${encodeURIComponent(kit)}`,
      cancel_url: `${baseUrl}/checkout?kit=${encodeURIComponent(kit)}&canceled=1`,
    })

    return NextResponse.json({ ok: true, url: session.url }, { status: 200 })
  } catch (error: any) {
    console.error('[api/checkout/create] error', error)
    return NextResponse.json({ ok: false, error: 'server_error', detail: String(error?.message || error) }, { status: 500 })
  }
}


