"use client"

import PricingHero from '@/components/la/Pricing/PricingHero'
import PricingCards from '@/components/la/Pricing/PricingCards'
import PricingComparison from '@/components/la/Pricing/PricingComparison'
import PricingLeadMagnet from '@/components/la/Pricing/PricingLeadMagnet'
import PricingFAQ from '@/components/la/Pricing/PricingFAQ'
import PricingCTA from '@/components/la/Pricing/PricingCTA'
import { JsonLd } from '@/components/JsonLd'
import { DEFAULT_EUR, PRICE_BUNDLE_3, PRICE_BUNDLE_10 } from '@/lib/pricing'
import { PageTransition } from '@/components/ui/page-transition'

export default function PricingPage() {
  async function startCheckout(url: string, payload: any) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.redirected) { window.location.href = res.url; return }
    const data = await res.json()
    if (!res.ok || !data?.ok || !data?.url) { throw new Error(data?.detail || data?.message || 'Failed to create a checkout session') }
    window.location.href = data.url
  }

  return (
    <PageTransition>
      <main>
        <PricingHero />
        <PricingCards
          onSingleCheckout={(slug) => startCheckout('/api/checkout/single', { kind: 'single', slug })}
          onBundle3Checkout={(slugs) => startCheckout('/api/checkout/bundle3', { kind: 'bundle3', slugs })}
          onBundle10Checkout={() => startCheckout('/api/checkout/bundle10', { kind: 'bundle10' })}
        />
        <PricingComparison />
        <PricingLeadMagnet />
        <PricingFAQ />
        <PricingCTA />

        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'itemListElement': [
              {
                '@type': 'Product',
                'name': 'Single Kit',
                'brand': { '@type': 'Brand', 'name': 'LexAtlas' },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': DEFAULT_EUR.currency,
                  'price': (DEFAULT_EUR.price / 100).toFixed(2),
                  'availability': 'https://schema.org/InStock',
                  'url': '/pricing'
                }
              },
              {
                '@type': 'Product',
                'name': 'Bundle of 3',
                'brand': { '@type': 'Brand', 'name': 'LexAtlas' },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': PRICE_BUNDLE_3.currency,
                  'price': (PRICE_BUNDLE_3.price / 100).toFixed(2),
                  'availability': 'https://schema.org/InStock',
                  'url': '/pricing'
                }
              },
              {
                '@type': 'Product',
                'name': 'Full Pack',
                'brand': { '@type': 'Brand', 'name': 'LexAtlas' },
                'offers': {
                  '@type': 'Offer',
                  'priceCurrency': PRICE_BUNDLE_10.currency,
                  'price': (PRICE_BUNDLE_10.price / 100).toFixed(2),
                  'availability': 'https://schema.org/InStock',
                  'url': '/pricing'
                }
              }
            ]
          }}
        />
      </main>
    </PageTransition>
  )
}
