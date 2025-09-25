import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { KITS, KIT_SLUGS } from '@/lib/kits.config'
import { kitsDetail } from '@/lib/kits-detail-data'
import { HeaderBlock } from '@/components/la/KitDetail/HeaderBlock'
import { BuyBox } from '@/components/la/KitDetail/BuyBox'
import { Included } from '@/components/la/KitDetail/Included'
import { About } from '@/components/la/KitDetail/About'
import { TrustStrip } from '@/components/la/KitDetail/TrustStrip'
import { RelatedKits } from '@/components/la/KitDetail/RelatedKits'
import { BreadcrumbsJsonLd } from '@/components/la/KitDetail/JsonLd'
import { CrossPassports } from '@/components/la/KitDetail/CrossPassports'
import ProductJsonLd from '@/components/seo/ProductJsonLd'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const revalidate = false // fully static

export async function generateStaticParams() {
  return KIT_SLUGS.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const kit = KITS[slug]
  if (!kit) return { title: 'LexAtlas — Kit not found' }

  return {
    title: kit.title, // ≤ 60 chars already curated
    description: kit.description, // ≤ 155 chars
    alternates: { canonical: kit.url },
    openGraph: {
      title: kit.title,
      description: kit.description,
      url: kit.url,
      type: 'website',
      images: [{ url: `https://lex-atlas.com${kit.ogImage}` }]
    },
    twitter: {
      card: 'summary_large_image',
      title: kit.title,
      description: kit.description,
      images: [`https://lex-atlas.com${kit.ogImage}`]
    }
  }
}

export default async function KitPage({ params }: Props) {
  const { slug } = await params
  const kit = KITS[slug]
  if (!kit) return notFound()

  // Use the short slug directly for kit detail lookup
  const kitDetail = kitsDetail[slug as keyof typeof kitsDetail]
  if (!kitDetail) return notFound()

  // Extract country code from short slug for CrossPassports component
  const countryCode = slug.split('-')[1] as any

  const styledTitle = (
    <div>
      <div>{kit.title.replace(/\nMarriage Guide$/, '')}</div>
      <div className="text-brand-gold mt-1">Marriage Guide</div>
    </div>
  )

  return (
    <main data-testid="kit-detail-app-router">
      {/* Product JSON-LD */}
      <ProductJsonLd
        name={kit.title}
        description={kit.description}
        sku={kit.sku}
        image={`https://lex-atlas.com${kit.ogImage}`}
        url={kit.url}
        price={kit.price}
        priceCurrency={kit.currency}
        brandName={kit.brand}
        validFrom={kit.validFrom}
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
