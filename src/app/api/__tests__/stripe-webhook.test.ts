import { NextRequest } from 'next/server'
import { POST } from '../stripe/webhook/route'

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn()
    },
    checkout: {
      sessions: {
        retrieve: jest.fn()
      }
    }
  }))
})

// Mock fulfillOrder
jest.mock('@/lib/stripe/fulfill', () => ({
  fulfillOrder: jest.fn()
}))

describe('/api/stripe/webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_secret'
  })

  afterEach(() => {
    delete process.env.STRIPE_WEBHOOK_SECRET
  })

  it('returns 400 when no signature is provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body'
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('No signature provided')
  })

  it('returns 500 when webhook secret is not configured', async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body',
      headers: {
        'stripe-signature': 'test_signature'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Webhook secret not configured')
  })

  it('returns 400 when signature verification fails', async () => {
    const { default: Stripe } = require('stripe')
    const mockStripe = new Stripe()
    mockStripe.webhooks.constructEvent.mockImplementation(() => {
      throw new Error('Invalid signature')
    })

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body',
      headers: {
        'stripe-signature': 'invalid_signature'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid signature')
  })

  it('handles checkout.session.completed event successfully', async () => {
    const { fulfillOrder } = require('@/lib/stripe/fulfill')
    const { default: Stripe } = require('stripe')
    
    const mockStripe = new Stripe()
    const mockSession = {
      id: 'cs_test_123',
      customer_email: 'test@example.com',
      amount_total: 2900,
      currency: 'eur',
      metadata: {
        kitSlug: 'fra-gbr'
      },
      line_items: {
        data: [{
          description: 'FRA-GBR Marriage Kit',
          quantity: 1,
          amount_total: 2900
        }]
      }
    }

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123'
        }
      }
    })

    mockStripe.checkout.sessions.retrieve.mockResolvedValue(mockSession)
    fulfillOrder.mockResolvedValue({ sent: true })

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body',
      headers: {
        'stripe-signature': 'valid_signature'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.received).toBe(true)
    expect(mockStripe.checkout.sessions.retrieve).toHaveBeenCalledWith('cs_test_123', {
      expand: ['line_items', 'customer']
    })
    expect(fulfillOrder).toHaveBeenCalledWith({
      sessionId: 'cs_test_123',
      customerEmail: 'test@example.com',
      amountTotal: 2900,
      currency: 'eur',
      kitPair: 'fra-gbr',
      lineItems: [{
        description: 'FRA-GBR Marriage Kit',
        quantity: 1,
        amount_total: 2900
      }]
    })
  })

  it('returns 400 when customer email is missing', async () => {
    const { default: Stripe } = require('stripe')
    
    const mockStripe = new Stripe()
    const mockSession = {
      id: 'cs_test_123',
      customer_email: null,
      customer_details: { email: null }
    }

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123'
        }
      }
    })

    mockStripe.checkout.sessions.retrieve.mockResolvedValue(mockSession)

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body',
      headers: {
        'stripe-signature': 'valid_signature'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing customer email')
  })

  it('handles other event types without error', async () => {
    const { default: Stripe } = require('stripe')
    
    const mockStripe = new Stripe()
    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test_123'
        }
      }
    })

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body',
      headers: {
        'stripe-signature': 'valid_signature'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.received).toBe(true)
  })

  it('handles fulfillment failure gracefully', async () => {
    const { fulfillOrder } = require('@/lib/stripe/fulfill')
    const { default: Stripe } = require('stripe')
    
    const mockStripe = new Stripe()
    const mockSession = {
      id: 'cs_test_123',
      customer_email: 'test@example.com',
      amount_total: 2900,
      currency: 'eur',
      metadata: {
        kitSlug: 'fra-gbr'
      }
    }

    mockStripe.webhooks.constructEvent.mockReturnValue({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123'
        }
      }
    })

    mockStripe.checkout.sessions.retrieve.mockResolvedValue(mockSession)
    fulfillOrder.mockResolvedValue({ sent: false, reason: 'email_send_failed' })

    const request = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: 'test body',
      headers: {
        'stripe-signature': 'valid_signature'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.received).toBe(true)
    expect(fulfillOrder).toHaveBeenCalled()
  })
})
