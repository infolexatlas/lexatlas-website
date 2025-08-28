import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Payment successful for session:', session.id)
        
        // Here you would typically:
        // 1. Update your database
        // 2. Send confirmation email
        // 3. Generate download links
        // 4. Update inventory
        
        break

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('Payment intent succeeded:', paymentIntent.id)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        console.log('Payment failed:', failedPayment.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
