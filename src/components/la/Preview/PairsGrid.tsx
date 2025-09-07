'use client'

import { StaggerContainer } from '@/components/ui/motion'
import { pairs, Pair } from '@/lib/pairs'
import { PairCard } from './PairCard'

interface PairsGridProps {
  onPreviewEmail: (pair: Pair) => void
}

export function PairsGrid({ onPreviewEmail }: PairsGridProps) {
  return (
    <section className="py-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--la-text)]">Preview a <span className="text-[var(--la-accent)]">France–X kit</span></h2>
        <p className="text-[color-mix(in_srgb,var(--la-text),transparent_45%)]">Choose a specific country pair to get a preview by email</p>
      </div>
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {pairs.map(p => (
          <PairCard key={p.slug} pair={p} onPreviewEmail={onPreviewEmail} />
        ))}
      </StaggerContainer>
    </section>
  )
}


