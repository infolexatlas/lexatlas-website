"use client"
import { Container } from '@/components/ui/container'
import { LeadMagnetBanner } from '@/components/LeadMagnetBanner'
import { PreviewHero } from '@/components/la/Preview/Hero'
import { PrimaryActions } from '@/components/la/Preview/PrimaryActions'
import { PairsGrid } from '@/components/la/Preview/PairsGrid'
import { PreviewEmailModal } from '@/components/la/Preview/PreviewEmailModal'
import { TrustStrip } from '@/components/la/Preview/TrustStrip'
import { ClosingCTA } from '@/components/la/Preview/ClosingCTA'
import { PageTransition } from '@/components/ui/page-transition'
import { useState } from 'react'
import type { Pair } from '@/lib/pairs'

export default function PreviewPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPair, setSelectedPair] = useState<Pair | undefined>(undefined)

  return (
    <PageTransition>
      <Container className="py-8 md:py-10 space-y-6 md:space-y-8">
        <PreviewHero />

        <PrimaryActions />

        <PairsGrid onPreviewEmail={(pair) => { setSelectedPair(pair); setModalOpen(true) }} />

        <TrustStrip />

        <ClosingCTA />

        <PreviewEmailModal open={modalOpen} onOpenChange={setModalOpen} initialPair={selectedPair} />
      </Container>
    </PageTransition>
  )
}
