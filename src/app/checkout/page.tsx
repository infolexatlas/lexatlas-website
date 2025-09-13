

'use client'
export const dynamic = 'force-dynamic'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { CheckoutHeader } from '@/components/la/Checkout/Header'
import { CheckoutSummary } from '@/components/la/Checkout/Summary'
import { PaymentRedirect } from '@/components/la/Checkout/PaymentRedirect'
import { SupportLegal } from '@/components/la/Checkout/SupportLegal'
import { track } from '@/lib/analytics'
import { PageTransition } from '@/components/ui/page-transition'

function CheckoutInner() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('kit') || searchParams.get('product')
  const [kit, setKit] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const isFake = process.env.NEXT_PUBLIC_FAKE_CHECKOUT === '1'

  useEffect(() => {
    if (!productSlug) return
    setKit(productSlug)
    track('checkout_view', { kit: productSlug })
  }, [productSlug])

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Dev convenience: always fake-redirect in non-production
      if (process.env.NODE_ENV !== 'production' && productSlug) {
        const origin = (typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
        const url = new URL('/success', origin)
        url.searchParams.set('fake', '1')
        url.searchParams.set('kind', 'single')
        url.searchParams.set('slug', productSlug)
        url.searchParams.set('session_id', `fake_${Date.now()}`)
        window.location.href = url.toString()
        return
      }

      if (isFake && productSlug) {
        const origin = (typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
        const url = new URL('/success', origin)
        url.searchParams.set('fake', '1')
        url.searchParams.set('kind', 'single')
        url.searchParams.set('slug', productSlug)
        url.searchParams.set('session_id', `fake_${Date.now()}`)
        window.location.href = url.toString()
        return
      }

      // Use new endpoint to create checkout session
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kit: productSlug }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data?.url) {
        window.location.href = data.url
        return
      }
      console.error('Checkout: failed response', { status: response.status, data })
      alert('Checkout could not start. Please try again later.')
      setLoading(false)
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  if (!kit) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-serif font-bold text-brand-deep mb-2">No Product Selected</h1>
              <p className="text-brand-textMuted mb-6">
                Please select a product to proceed with checkout.
              </p>
              <a 
                href="/kits" 
                className="inline-flex items-center justify-center rounded-xl bg-brand-deep text-white px-6 py-3 font-medium transition hover:bg-brand-deep/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
      <PageTransition>
      <div className="min-h-screen bg-brand-ivory py-12 md:py-16">
        <Container>
          <CheckoutHeader />
          <div className="grid md:grid-cols-[minmax(0,1fr)_420px] gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <CheckoutSummary kit={kit} priceEUR={29} />
              <SupportLegal />
            </div>
            <PaymentRedirect kit={kit} />
          </div>
        </Container>
      </div>
      </PageTransition>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <CheckoutInner />
    </Suspense>
  )
}
