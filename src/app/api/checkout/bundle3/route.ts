import { NextRequest, NextResponse } from 'next/server'
import { isFakeCheckout, assertStripe, stripe } from '@/lib/stripe'
import { getSuccessCancelUrls } from '@/lib/checkout'
import { STRIPE_CATALOG } from '@/lib/stripeCatalog'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { success_url, cancel_url } = getSuccessCancelUrls(request)

    if (isFakeCheckout) {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`);
      url.searchParams.set('fake', '1');
      url.searchParams.set('kind', 'bundle3');
      url.searchParams.set('session_id', `fake_${Date.now()}`);
      return Response.redirect(url.toString(), 303);
    }

    assertStripe(stripe)

    const session = await stripe!.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Bundle of 3 Marriage Kits',
              description: 'Get 3 marriage kits for the price of 2.5 - Save 15%',
            },
            unit_amount: STRIPE_CATALOG.bundle_3.amount, // €75.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url,
      cancel_url,
      metadata: {
        kind: 'bundle_3',
      },
    })

    return NextResponse.json({ ok: true, url: session.url }, { status: 200 })
  } catch (error: any) {
    console.error('[checkout/bundle3] error:', error)
    return NextResponse.json(
      { ok: false, message: 'checkout_failed', detail: String(error?.message || error) },
      { status: 500 }
    )
  }
}
