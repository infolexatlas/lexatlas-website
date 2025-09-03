'use client'

import { useState } from 'react'
import PricingCard from './PricingCard'
import { DEFAULT_EUR, PRICE_BUNDLE_3, PRICE_BUNDLE_10 } from '@/lib/pricing'
import { PRIORITY_SLUGS } from '@/lib/kits.client'
import { getDisplayPairFromSlug } from '@/lib/kits.display'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

type Props = {
  onSingleCheckout: (slug: string) => Promise<void>
  onBundle3Checkout: (slugs: string[]) => Promise<void>
  onBundle10Checkout: () => Promise<void>
}

export default function PricingCards({ onSingleCheckout, onBundle3Checkout, onBundle10Checkout }: Props) {
  const [single, setSingle] = useState<string>('')
  const [bundle3, setBundle3] = useState<string[]>([])
  const [loading, setLoading] = useState<'single' | 'bundle3' | 'bundle10' | null>(null)
  const [openSingle, setOpenSingle] = useState(false)
  const [openBundle, setOpenBundle] = useState(false)

  const toggleBundle3 = (slug: string) => {
    setBundle3(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      if (prev.length < 3) return [...prev, slug]
      return prev
    })
  }

  // Expose simple global hooks for the comparison table CTAs
  // Allows opening dialogs or triggering full checkout from elsewhere on the page
  if (typeof window !== 'undefined') {
    ;(window as any).LA_pricing = {
      openSingle: () => setOpenSingle(true),
      openBundle3: () => setOpenBundle(true),
      buyFull: async () => { setLoading('bundle10'); try { await onBundle10Checkout() } finally { setLoading(null) } },
    }
  }

  return (
    <section aria-labelledby="pricing-cards-title" className="section-premium pt-0">
      <div className="container">
        <h2 id="pricing-cards-title" className="sr-only">Packages</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Single */}
          <Dialog open={openSingle} onOpenChange={setOpenSingle}>
            <PricingCard
              id="single"
              title="Single Kit"
              subtitle="Perfect for one country pair"
              priceCents={DEFAULT_EUR.price}
              currency={DEFAULT_EUR.currency}
              features={[
                'Complete marriage guide',
                'Checklist',
                'Legal requirements',
                'Instant download'
              ]}
              ctaLabel="Choose Country Pair"
              ctaNode={
                <button
                  onClick={() => setOpenSingle(true)}
                  className="w-full rounded-2xl bg-brand-navy text-white font-semibold px-6 py-4 text-base md:text-lg shadow-soft hover:shadow-premium hover:shadow-gold-glow transition-premium focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Choose Country Pair
                </button>
              }
            />
            <DialogContent className="z-[70] bg-white text-slate-900 ring-1 ring-slate-200 rounded-xl2 shadow-xl w-full max-w-lg mx-auto p-4 md:p-6">
              <DialogHeader>
                <DialogTitle className="heading-3 text-brand-navy">Select Country Pair</DialogTitle>
                <DialogDescription className="text-brand-textMuted">
                  Choose the country pair for your marriage kit
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="country-pair" className="text-base font-medium text-brand-navy">Country Pair</Label>
                  <Select value={single} onValueChange={setSingle}>
                    <SelectTrigger className="mt-2 bg-white rounded-xl2">
                      <SelectValue placeholder="Select a country pair" />
                    </SelectTrigger>
                    <SelectContent className="z-[70] bg-white rounded-xl2 shadow-xl overflow-hidden">
                      {PRIORITY_SLUGS.map((slug) => {
                        const displayPair = getDisplayPairFromSlug(slug)
                        return (
                          <SelectItem key={slug} value={slug}>
                            {displayPair ? `${displayPair.left} – ${displayPair.right}` : slug}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={async () => { if (!single) return; setLoading('single'); try { await onSingleCheckout(single) } finally { setLoading(null) } }}
                  disabled={!single || loading !== null}
                  className="w-full"
                  size="lg"
                >
                  {loading === 'single' ? 'Processing…' : 'Buy Now'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Bundle 3 */}
          <Dialog open={openBundle} onOpenChange={setOpenBundle}>
            <PricingCard
              id="bundle3"
              title="Bundle of 3"
              subtitle="Choose any 3 country pairs"
              priceCents={PRICE_BUNDLE_3.price}
              currency={PRICE_BUNDLE_3.currency}
              features={[
                '3 guides',
                'Mix & match',
                'All checklists',
                'Instant downloads'
              ]}
              ctaLabel="Choose 3 Pairs"
              ctaNode={
                <button
                  onClick={() => setOpenBundle(true)}
                  className="w-full rounded-2xl bg-brand-navy text-white font-semibold px-6 py-4 text-base md:text-lg shadow-soft hover:shadow-premium hover:shadow-gold-glow transition-premium focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Choose 3 Pairs
                </button>
              }
              badge={{ label: 'Most Popular' }}
              popular
            />
            <DialogContent className="z-[70] bg-white text-slate-900 ring-1 ring-slate-200 rounded-xl2 shadow-xl w-full max-w-md mx-auto p-4 md:p-6">
              <DialogHeader>
                <DialogTitle className="heading-3 text-brand-navy">Select 3 Country Pairs</DialogTitle>
                <DialogDescription className="text-brand-textMuted">
                  Choose exactly 3 country pairs for your bundle
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-3 max-h-[60vh] overflow-y-auto overscroll-contain">
                  {PRIORITY_SLUGS.map((slug) => {
                    const displayPair = getDisplayPairFromSlug(slug)
                    return (
                      <div key={slug} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <Checkbox
                          id={slug}
                          checked={bundle3.includes(slug)}
                          onCheckedChange={() => toggleBundle3(slug)}
                          disabled={!bundle3.includes(slug) && bundle3.length >= 3}
                          className="text-brand-gold"
                        />
                        <Label htmlFor={slug} className="text-base text-brand-navy cursor-pointer flex-1">
                          {displayPair ? `${displayPair.left} – ${displayPair.right}` : slug}
                        </Label>
                      </div>
                    )
                  })}
                </div>
                <div className="text-sm text-brand-textMuted text-center">
                  Selected: {bundle3.length}/3
                </div>
                <Button
                  onClick={async () => { if (bundle3.length !== 3) return; setLoading('bundle3'); try { await onBundle3Checkout(bundle3) } finally { setLoading(null) } }}
                  disabled={bundle3.length !== 3 || loading !== null}
                  className="w-full"
                  size="lg"
                >
                  {loading === 'bundle3' ? 'Processing…' : 'Buy Bundle'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Full Pack */}
          <PricingCard
            id="bundle10"
            title="Full Pack"
            subtitle="All 10 priority country pairs"
            priceCents={PRICE_BUNDLE_10.price}
            currency={PRICE_BUNDLE_10.currency}
            features={[
              'All 10 guides',
              'Complete collection',
              'Maximum value',
              'Instant downloads'
            ]}
            ctaLabel={`Get Full Pack – ${(PRICE_BUNDLE_10.price / 100).toFixed(0)} €`}
            onCta={async () => { setLoading('bundle10'); try { await onBundle10Checkout() } finally { setLoading(null) } }}
          />
        </div>
      </div>
    </section>
  )
}


