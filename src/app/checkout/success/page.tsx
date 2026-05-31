import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Download, AlertCircle } from 'lucide-react'
import Stripe from 'stripe'

export const metadata: Metadata = {
  title: 'Payment Successful - LexAtlas',
  description: 'Your payment has been processed successfully. You will receive your marriage kit via email shortly.',
  robots: 'noindex, nofollow', // Don't index checkout pages
}

interface SuccessPageProps {
  searchParams: Promise<{ 
    session_id?: string
    kit?: string
  }>
}

interface SessionData {
  id: string
  customer_email?: string | null
  amount_total?: number | null
  currency?: string | null
  metadata?: {
    kitSlug?: string
    pair?: string
  } | null
  line_items?: {
    data: Array<{
      description?: string | null
      quantity?: number | null
      amount_total?: number
    }>
  }
}

async function fetchSessionData(sessionId: string): Promise<SessionData | null> {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('STRIPE_SECRET_KEY not configured - cannot fetch session data')
    return null
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    })

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items']
    })

    return {
      id: session.id,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata,
      line_items: session.line_items
    }
  } catch (error) {
    console.error('Failed to fetch session data:', error)
    return null
  }
}

function formatCurrency(amount: number, currency: string): string {
  const formattedAmount = (amount / 100).toFixed(2)
  return `${formattedAmount} ${currency.toUpperCase()}`
}

function getKitDisplayName(kitSlug?: string): string {
  if (!kitSlug) return 'Marriage Kit'
  
  const [country1, country2] = kitSlug.toUpperCase().split('-')
  if (!country1 || !country2) return 'Marriage Kit'
  
  return `${country1} ↔ ${country2} Marriage Kit`
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id, kit } = await searchParams
  
  // Fetch session data from Stripe if session_id is provided
  let sessionData: SessionData | null = null
  if (session_id && !session_id.startsWith('fake_')) {
    sessionData = await fetchSessionData(session_id)
  }

  const kitDisplayName = getKitDisplayName(kit || sessionData?.metadata?.kitSlug)
  const customerEmail = sessionData?.customer_email
  const amount = sessionData?.amount_total
  const currency = sessionData?.currency

  return (
    <main className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-brand-navy mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-brand-textMuted mb-6">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {/* Order Summary */}
          {sessionData && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium">{kitDisplayName}</span>
                </div>
                {amount && currency && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{formatCurrency(amount, currency)}</span>
                  </div>
                )}
                {customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-xs">{customerEmail}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Email Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Check your email</span>
            </div>
            <p className="text-sm text-blue-700">
              We've sent you a confirmation email with your marriage kit download link.
            </p>
          </div>

          {/* Missing Session Data Warning */}
          {!sessionData && session_id && !session_id.startsWith('fake_') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-900">Note</span>
              </div>
              <p className="text-sm text-yellow-700">
                Unable to fetch order details, but your payment was successful. 
                Check your email for confirmation.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {(kit || sessionData?.metadata?.kitSlug) && (
              <Button asChild className="w-full gold-hover">
                <Link href={`/kits/${kit || sessionData?.metadata?.kitSlug}`}>
                  <Download className="w-4 h-4 mr-2" />
                  View Your Kit
                </Link>
              </Button>
            )}
            
            <Button variant="secondary" asChild className="w-full">
              <Link href="/kits">
                Browse More Kits
              </Link>
            </Button>
          </div>

          {/* Session ID for support */}
          {session_id && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Session ID: {session_id}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
