import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import { KITS, getLegacySlug, getKitBySlug } from '@/lib/kits.config'
import { kitsDetail } from '@/lib/kits-detail-data'
import { HeaderBlock } from '@/components/la/KitDetail/HeaderBlock'
import { BuyBox } from '@/components/la/KitDetail/BuyBox'
import { Included } from '@/components/la/KitDetail/Included'
import { About } from '@/components/la/KitDetail/About'
import { TrustStrip } from '@/components/la/KitDetail/TrustStrip'
import { RelatedKits } from '@/components/la/KitDetail/RelatedKits'
import { BreadcrumbsJsonLd } from '@/components/la/KitDetail/JsonLd'
import { CrossPassports } from '@/components/la/KitDetail/CrossPassports'

// Relax types to align with Next.js generated PageProps in .next/types
// which may type params as a Promise-like in some setups.
interface PageParams { slug: string }


// Generate dynamic metadata for kit pages
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const kit = getKitBySlug(slug)
  
  if (!kit) {
    return { title: 'LexAtlas — Cross-Border Marriage Kits' }
  }

  return {
    title: kit.title,
    description: kit.description,
    alternates: { canonical: kit.url },
    openGraph: {
      title: kit.title,
      description: kit.description,
      url: kit.url,
      type: 'website',
      siteName: 'LexAtlas',
      images: [
        {
          url: `https://lex-atlas.com${kit.ogImage}`,
          width: 1200,
          height: 630,
          alt: kit.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: kit.title,
      description: kit.description,
      images: [`https://lex-atlas.com${kit.ogImage}`],
      site: '@lexatlas',
      creator: '@lexatlas',
    },
  }
}

// Opt into static generation for better performance
export const dynamic = 'auto'
export const revalidate = 60
export const dynamicParams = false

export function generateStaticParams() {
  // Prebuild all descriptive kit slugs we have data for
  const params = Object.keys(KITS).map((slug) => ({ slug }))
  return params
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const kit = getKitBySlug(slug)
  
  if (!kit) return notFound()

  // Get the legacy slug for backward compatibility with existing components
  const legacySlug = getLegacySlug(slug)
  if (!legacySlug) return notFound()

  const kitDetail = kitsDetail[legacySlug as keyof typeof kitsDetail]
  if (!kitDetail) return notFound()

  // Extract country code from legacy slug for CrossPassports component
  const countryCode = legacySlug.split('-')[1] as any

  const styledTitle = (
    <>
      {kit.title.replace(' Marriage Guide (2025) | LexAtlas', '')}
      {' '}
      <span className="text-brand-gold">Marriage Guide</span>
    </>
  )

  // Product JSON-LD with all required fields
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: kit.title,
    description: kit.description,
    sku: kit.sku,
    brand: { '@type': 'Brand', name: 'LexAtlas' },
    image: `https://lex-atlas.com${kit.ogImage}`,
    url: kit.url,
    offers: {
      '@type': 'Offer',
      price: kit.price,
      priceCurrency: kit.currency,
      availability: 'https://schema.org/InStock',
      url: kit.url,
      validFrom: kit.validFrom
    }
  }

  return (
    <main data-testid="kit-detail-app-router">
      {/* Product JSON-LD */}
      <Script 
        id="jsonld-product" 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} 
      />

      <HeaderBlock 
        title={styledTitle} 
        lede={kitDetail.lede} 
        right={<CrossPassports partner={countryCode} />} 
        compact 
      />

      <section className="section pt-5 md:pt-6">
        <div className="container">
          <div className="grid gap-x-6 gap-y-0 md:grid-cols-[1fr_360px] items-start">
            <div>
              <Included items={kitDetail.features} inline />
            </div>
            <div className="self-start">
              <BuyBox priceEUR={kitDetail.priceEUR} slug={kitDetail.slug} />
            </div>
            {/* Trust stats glued directly under the boxes, full-width */}
            <div className="col-span-full md:col-span-2 mt-6">
              <TrustStrip />
            </div>
          </div>
        </div>
      </section>

      <About text={kitDetail.about} />
      <RelatedKits related={kitDetail.related} />

      <BreadcrumbsJsonLd name={kit.title} url={kit.url} />
    </main>
  )
}
