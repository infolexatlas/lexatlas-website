import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { parsePair, isValidCode } from '@/lib/countries'
import { getPriceForPair } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  try {
    const { priceId, country1, country2, pair } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Validate country pair
    if (!country1 || !country2 || !isValidCode(country1) || !isValidCode(country2)) {
      return NextResponse.json(
        { error: 'Valid country codes are required' },
        { status: 400 }
      )
    }

    if (country1 === country2) {
      return NextResponse.json(
        { error: 'Countries must be different' },
        { status: 400 }
      )
    }

    // Parse and validate the pair
    const pairData = parsePair(pair || `${country1}-${country2}`)
    if (!pairData) {
      return NextResponse.json(
        { error: 'Invalid country pair' },
        { status: 400 }
      )
    }

    // Get pricing information for this pair
    const priceInfo = getPriceForPair(pairData.pair)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
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
      success_url: `${baseUrl}/kits/marriage-kit/${pairData.pair}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/kits/marriage-kit/${pairData.pair}/cancel`,
      metadata: {
        product: 'marriage-kit',
        country1: pairData.country1,
        country2: pairData.country2,
        pair: pairData.pair,
        price: priceInfo.price.toString(),
        currency: priceInfo.currency,
        priceType: priceId,
      },
      customer_email: undefined, // Will be collected by Stripe
      billing_address_collection: 'auto',
      automatic_tax: { enabled: false },
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
