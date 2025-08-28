import { NextRequest, NextResponse } from 'next/server'
import { stripe, useFakeCheckout } from '@/lib/stripe'
import { getPriceIdByLookupKey } from '@/lib/stripeCatalog'
import { isValidPrioritySlug } from '@/lib/kits.config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slugs } = body

    // Validate inputs
    if (!Array.isArray(slugs) || slugs.length !== 3) {
      return NextResponse.json(
        { error: 'Exactly 3 slugs required' },
        { status: 400 }
      )
    }

    // Validate all slugs
    for (const slug of slugs) {
      if (!isValidPrioritySlug(slug)) {
        return NextResponse.json(
          { error: `Invalid slug: ${slug}` },
          { status: 400 }
        )
      }
    }

    // Use fake checkout for testing
    if (useFakeCheckout) {
      return NextResponse.json({
        url: `${request.nextUrl.origin}/success?session_id=fake_bundle3_${Date.now()}`
      })
    }

    // Get price ID
    const priceId = await getPriceIdByLookupKey('bundle_3_eur_7500')
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
        slugs: slugs.join(','),
        kind: 'bundle_3'
      },
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Bundle checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
