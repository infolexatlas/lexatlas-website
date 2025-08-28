import { NextRequest, NextResponse } from 'next/server'
import { stripe, useFakeCheckout } from '@/lib/stripe'
import { getPriceIdByLookupKey } from '@/lib/stripeCatalog'
import { PRIORITY_SLUGS } from '@/lib/kits.config'

export async function POST(request: NextRequest) {
  try {
    // Use fake checkout for testing
    if (useFakeCheckout) {
      return NextResponse.json({
        url: `${request.nextUrl.origin}/success?session_id=fake_bundle10_${Date.now()}`
      })
    }

    // Get price ID
    const priceId = await getPriceIdByLookupKey('bundle_10_eur_20000')
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price not found' },
        { status: 500 }
      )
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        slugs: PRIORITY_SLUGS.join(','),
        kind: 'bundle_10'
      },
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Bundle 10 checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
