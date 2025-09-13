'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { track } from '@/lib/analytics'
import { getStripePriceId } from '@/lib/stripe-prices'
import { loadStripe } from '@stripe/stripe-js'

export function BuyBox({ priceEUR, slug }: { priceEUR: number; slug: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBuyNow = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Track analytics
      track('checkout_click', { type: 'single', pair: slug })
      
      // Fire Plausible event if available
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('checkout_start', { props: { kit: slug } })
      }

      // Get price ID for this kit
      const priceId = getStripePriceId(slug)
      if (!priceId) {
        throw new Error('Price not configured for this kit')
      }

      // Create checkout session
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          kitSlug: slug,
          successPath: '/checkout/success',
          cancelPath: '/checkout/cancel',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      if (!url) {
        throw new Error('No checkout URL received')
      }

      // Redirect to Stripe Checkout
      window.location.href = url

    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleDownload = () => {
    track('lead_magnet_submit', { source: 'kit_detail', pair: slug })
    // Direct download without page redirect
    window.location.href = `/api/sample?slug=${encodeURIComponent(slug)}`
  }

  return (
    <aside className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-premium hover:border-brand-gold transition-all duration-300 animate-reveal">
      <div className="text-3xl font-bold">{priceEUR} €</div>
      <div className="mt-1 text-xs text-muted-foreground">One-time payment • Lifetime access</div>
      <div className="mt-4 space-y-3">
        <Button
          className="w-full gold-hover"
          onClick={handleBuyNow}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Buy Now'}
        </Button>
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        
        <Button 
          variant="secondary" 
          className="w-full" 
          onClick={handleSampleDownload}
        >
          Download Sample Kit
        </Button>
        <div className="pt-2 text-xs text-muted-foreground">Secure payments by Stripe • 256‑bit SSL</div>
      </div>
    </aside>
  )
}


