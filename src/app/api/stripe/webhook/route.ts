import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { fulfillOrder, FulfillmentData } from '@/lib/stripe/fulfill'

export const runtime = 'nodejs'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

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
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('Payment successful for session:', session.id)
        
        // Fetch the complete session with line items and customer data
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'customer']
        })
        
        // Extract fulfillment data
        const fulfillmentData: FulfillmentData = {
          sessionId: fullSession.id,
          customerEmail: fullSession.customer_email || fullSession.customer_details?.email || '',
          amountTotal: fullSession.amount_total || 0,
          currency: fullSession.currency || 'eur',
          kitPair: fullSession.metadata?.kitSlug || fullSession.metadata?.pair,
          lineItems: fullSession.line_items?.data.map(item => ({
            description: item.description,
            quantity: item.quantity,
            amount_total: item.amount_total
          }))
        }
        
        // Validate required data
        if (!fulfillmentData.customerEmail) {
          console.error('No customer email found for session:', session.id)
          return NextResponse.json(
            { error: 'Missing customer email' },
            { status: 400 }
          )
        }
        
        // Fulfill the order (send email + log)
        const fulfillmentResult = await fulfillOrder(fulfillmentData)
        
        if (!fulfillmentResult.sent) {
          console.warn('Order fulfillment failed:', {
            sessionId: session.id,
            reason: fulfillmentResult.reason
          })
        }
        
        break

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent succeeded:', paymentIntent.id)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
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