'use client'

import { FadeIn } from '@/components/ui/motion'

export function NotFoundHero() {
  return (
    <section className="pt-12 pb-6 text-center">
      <div className="max-w-2xl mx-auto space-y-4">
        <FadeIn>
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--la-accent)]">404</span>
        </FadeIn>
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--la-text)]">We couldn’t find that page</h1>
        </FadeIn>
        <FadeIn>
          <p className="text-[color-mix(in_srgb,var(--la-text),transparent_40%)]">Let’s get you where you need to go.</p>
        </FadeIn>
      </div>
    </section>
  )
}


