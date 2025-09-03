'use client'

import { FadeIn } from '@/components/ui/motion'

export function PreviewHero() {
  return (
    <section className="pt-10 md:pt-14 pb-6 md:pb-10">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--la-text)]">
            Free <span className="text-[var(--la-accent)]">Previews</span>
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--la-text),transparent_40%)]">
            Get a free sample from our cross-border marriage kits, or preview a specific country pair by email.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="text-sm text-[color-mix(in_srgb,var(--la-text),transparent_50%)]">
            Instant download • Lifetime access
          </p>
        </FadeIn>
      </div>
    </section>
  )
}


