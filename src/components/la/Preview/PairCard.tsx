'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HoverLift, StaggerItem } from '@/components/ui/motion'
import { track } from '@/lib/analytics'
import type { Pair } from '@/lib/pairs'
import { Mail } from 'lucide-react'

interface PairCardProps {
  pair: Pair
  onPreviewEmail: (pair: Pair) => void
}

export function PairCard({ pair, onPreviewEmail }: PairCardProps) {
  return (
    <StaggerItem>
      <HoverLift>
        <Card className="rounded-2xl border bg-card shadow-sm transition will-change-transform">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[var(--la-text)]">
              {pair.label}
            </CardTitle>
            <CardDescription className="text-xs">
              Email preview available
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <ul className="text-xs text-[color-mix(in_srgb,var(--la-text),transparent_50%)] list-disc pl-4">
              <li>Table of contents</li>
              <li>Sample pages</li>
            </ul>
            <div className="pt-2">
              <Button 
                size="sm" 
                className="w-full" 
                onClick={() => { track('preview_email_open', { pair: pair.slug }); onPreviewEmail(pair); }}
              >
                <Mail className="h-4 w-4 mr-1.5" aria-hidden /> Preview by email
              </Button>
            </div>
          </CardContent>
        </Card>
      </HoverLift>
    </StaggerItem>
  )
}


