

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
      <div className="min-h-screen bg-brand-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-brand-deep" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
      <PageTransition>
      <div className="min-h-screen bg-[var(--la-surface)] py-12 md:py-16">
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
