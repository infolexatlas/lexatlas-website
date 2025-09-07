'use client'

import { FadeIn } from '@/components/ui/motion'

export function CheckoutHeader() {
  return (
    <header className="mb-8 text-center">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--la-text)]">Secure Checkout</h1>
      </FadeIn>
      <FadeIn>
        <p className="text-[color-mix(in_srgb,var(--la-text),transparent_40%)]">Instant download • One‑time payment • Lifetime access</p>
      </FadeIn>
    </header>
  )
}


