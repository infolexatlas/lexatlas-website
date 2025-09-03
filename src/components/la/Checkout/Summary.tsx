'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FadeIn } from '@/components/ui/motion'
import { expandPairTitle } from '@/lib/kits.config'

interface SummaryProps {
  kit: string
  priceEUR?: number
}

export function CheckoutSummary({ kit, priceEUR = 29 }: SummaryProps) {
  const title = expandPairTitle(kit.toUpperCase())
  return (
    <FadeIn>
      <Card className="rounded-2xl border bg-card shadow-sm ring-1 ring-[var(--la-accent)]/10">
        <CardHeader>
          <CardTitle className="text-[var(--la-text)]">{title} <span className="text-[var(--la-accent)]">Marriage Kit</span></CardTitle>
          <CardDescription className="text-sm">One‑time payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold text-[var(--la-text)]">{priceEUR} €</div>
          <ul className="text-sm text-[color-mix(in_srgb,var(--la-text),transparent_40%)] list-disc pl-5 space-y-1">
            <li>Instant download</li>
            <li>Lifetime updates</li>
            <li>Expert‑verified</li>
          </ul>
        </CardContent>
      </Card>
    </FadeIn>
  )
}


