import { NextRequest, NextResponse } from 'next/server'
import { isFakeCheckout, assertStripe, stripe } from '@/lib/stripe'
import { parsePair, isValidCode } from '@/lib/countries'
import { getSuccessCancelUrls } from '@/lib/checkout'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { priceId, country1, country2, pair } = body

    if (!priceId) {
      return NextResponse.json(
        { ok: false, message: 'missing_price_id', detail: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Validate country pair
    if (!country1 || !country2 || !isValidCode(country1) || !isValidCode(country2)) {
      return NextResponse.json(
        { ok: false, message: 'invalid_country_codes', detail: 'Valid country codes are required' },
        { status: 400 }
      )
    }

    if (country1 === country2) {
      return NextResponse.json(
        { ok: false, message: 'same_countries', detail: 'Countries must be different' },
        { status: 400 }
      )
    }

    // Parse and validate the pair
    const pairData = parsePair(pair || `${country1}-${country2}`)
    if (!pairData) {
      return NextResponse.json(
        { ok: false, message: 'invalid_pair', detail: 'Invalid country pair' },
        { status: 400 }
      )
    }

    const { success_url, cancel_url } = getSuccessCancelUrls(request)

    if (isFakeCheckout) {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`);
      url.searchParams.set('fake', '1');
      url.searchParams.set('kind', 'single');
      url.searchParams.set('pair', pairData.pair);
      url.searchParams.set('session_id', `fake_${Date.now()}`);
      return Response.redirect(url.toString(), 303);
    }

    assertStripe(stripe)

    const session = await stripe!.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId === 'marriageKit' 
            ? process.env.STRIPE_PRICE_MARRIAGE || 'price_test_marriage'
            : process.env.STRIPE_PRICE_BUNDLE || 'price_test_bundle',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url,
      cancel_url,
      metadata: {
        kind: priceId === 'marriageKit' ? 'single_kit' : 'bundle',
        country1: pairData.country1,
        country2: pairData.country2,
        pair: pairData.pair,
        priceId,
      },
      customer_email: undefined, // Will be collected by Stripe
      billing_address_collection: 'auto',
      automatic_tax: { enabled: false },
    })

    return NextResponse.json({ ok: true, url: session.url }, { status: 200 })
  } catch (error: any) {
    console.error('[checkout] error:', error)
    return NextResponse.json(
      { ok: false, message: 'checkout_failed', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}
