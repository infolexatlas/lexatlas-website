'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn, HoverLift } from '@/components/ui/motion'
import { track } from '@/lib/analytics'
import { Download } from 'lucide-react'
import { useCallback } from 'react'

export function PrimaryActions() {
  const onDownload = useCallback(() => {
    track('preview_download_click')
  }, [])

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 max-w-4xl mx-auto">
        <FadeIn>
          <HoverLift className="h-full">
            <Card className="rounded-2xl border bg-card shadow-sm transition ring-1 ring-[var(--la-accent)]/15 hover:ring-[var(--la-accent)]/30 hover:shadow-gold-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-[var(--la-text)]">Download global sample (PDF)</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center gap-4">
                <p className="text-sm text-[color-mix(in_srgb,var(--la-text),transparent_45%)]">
                  Explore a sample of what’s inside our guides.
                </p>
                <Button asChild onClick={onDownload} className="justify-center hover:shadow-gold-glow">
                  <a href="/kits/samples/LEXATLAS-global-sample.pdf" download>
                    <Download className="mr-2 h-4 w-4" aria-hidden />
                    Download sample
                  </a>
                </Button>
              </CardContent>
            </Card>
          </HoverLift>
        </FadeIn>
      </div>
    </section>
  )
}


