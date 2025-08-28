import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { parsePair } from '@/lib/countries'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, country1, country2, pair } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Verify the country pair matches
    const sessionCountry1 = session.metadata?.country1
    const sessionCountry2 = session.metadata?.country2
    const sessionPair = session.metadata?.pair
    
    if (country1 && country2) {
      // Parse and validate the requested country pair
      const requestedPair = parsePair(pair || `${country1}-${country2}`)
      const sessionPairData = sessionPair ? parsePair(sessionPair) : null
      
      if (!requestedPair || !sessionPairData || requestedPair.pair !== sessionPairData.pair) {
        return NextResponse.json(
          { error: 'Country pair mismatch' },
          { status: 400 }
        )
      }
    } else {
      // Fallback for backward compatibility with single country
      const country = country1 || country2
      if (country && session.metadata?.country !== country?.toUpperCase()) {
        return NextResponse.json(
          { error: 'Country mismatch' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ 
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        metadata: session.metadata,
        pair: sessionPair,
        country1: sessionCountry1,
        country2: sessionCountry2,
      }
    })
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
