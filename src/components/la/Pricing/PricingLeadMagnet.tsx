'use client'

import { KitSampleCTA } from '@/components/la/Kit/KitSampleCTA'

export default function PricingLeadMagnet() {
  return (
    <section aria-labelledby="lead-magnet-title" className="pt-8 pb-8 md:pt-10 md:pb-10 bg-transparent">
      <h2 id="lead-magnet-title" className="sr-only">Free Sample</h2>
      <KitSampleCTA compact />
    </section>
  )
}


