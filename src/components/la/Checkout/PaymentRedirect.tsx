'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/motion'
import { track } from '@/lib/analytics'

interface PaymentRedirectProps {
  kit: string
}

export function PaymentRedirect({ kit }: PaymentRedirectProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onPay = async () => {
    setError(null)
    setLoading(true)
    track('checkout_start', { kit })
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kit }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.url) {
        track('checkout_redirect', { kit })
        window.location.href = data.url as string
        return
      }
      throw new Error(data?.error || 'server_error')
    } catch (err: any) {
      console.error('[Checkout] error', err)
      setError('Could not start checkout. Please try again.')
      track('checkout_error', { kit, error: String(err?.message || err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <FadeIn>
      <Card className="rounded-2xl border bg-card shadow-sm sticky top-[96px] ring-1 ring-[var(--la-accent)]/15 hover:ring-[var(--la-accent)]/30 hover:shadow-gold-glow transition-premium">
        <CardHeader>
          <CardTitle className="text-[var(--la-text)]">Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={onPay} 
            disabled={loading}
            aria-busy={loading}
            className="w-full hover:shadow-gold-glow active:translate-y-[1px]"
          >
            {loading ? 'Processing…' : 'Pay with Stripe'}
          </Button>
          {error && (
            <p role="alert" className="text-sm text-red-600">{error}</p>
          )}
          <p className="text-xs text-[color-mix(in_srgb,var(--la-text),transparent_50%)] text-center">
            Your payment is secure. You can download instantly after checkout.
          </p>
        </CardContent>
      </Card>
    </FadeIn>
  )
}


