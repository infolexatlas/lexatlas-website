import { NextRequest, NextResponse } from 'next/server'
import { stripe, useFakeCheckout } from '@/lib/stripe'
import { getPriceIdByLookupKey } from '@/lib/stripeCatalog'
import { slugToPairKey, isValidPrioritySlug } from '@/lib/kits.config'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const slug = formData.get('slug') as string
    const pairKey = formData.get('pairKey') as string

    // Validate inputs
    if (!slug || !isValidPrioritySlug(slug)) {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      )
    }

    if (!pairKey || pairKey !== slugToPairKey(slug)) {
      return NextResponse.json(
        { error: 'Invalid pair key' },
        { status: 400 }
      )
    }

    // Use fake checkout for testing
    if (useFakeCheckout) {
      return NextResponse.json({
        url: `${request.nextUrl.origin}/success?session_id=fake_session_${Date.now()}`
      })
    }

    // Get price ID
    const priceId = await getPriceIdByLookupKey('single_kit_eur_2900')
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
        slug,
        pairKey,
        kind: 'single'
      },
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
