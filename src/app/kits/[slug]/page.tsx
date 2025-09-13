import { redirect, notFound } from 'next/navigation'
import { normalizeSlug, titleFromSlug, ISO3 } from '@/lib/kits-slug'
import { kitsDetail } from '@/lib/kits-detail-data'
import { HeaderBlock } from '@/components/la/KitDetail/HeaderBlock'
import { BuyBox } from '@/components/la/KitDetail/BuyBox'
import { Included } from '@/components/la/KitDetail/Included'
import { About } from '@/components/la/KitDetail/About'
import { TrustStrip } from '@/components/la/KitDetail/TrustStrip'
import { RelatedKits } from '@/components/la/KitDetail/RelatedKits'
import { JsonLd, BreadcrumbsJsonLd } from '@/components/la/KitDetail/JsonLd'

// Relax types to align with Next.js generated PageProps in .next/types
// which may type params as a Promise-like in some setups.
interface PageParams { slug: string }
import { CrossPassports } from '@/components/la/KitDetail/CrossPassports'

// Opt into static generation for better performance
export const dynamic = 'auto'
export const revalidate = 60
export const dynamicParams = false

export function generateStaticParams() {
  // Prebuild all FRA-XXX pairs we have data for
  const params = Object.keys(kitsDetail).map((slug) => ({ slug }))
  return params
}

export default async function Page({ params, searchParams }: { params: Promise<PageParams>, searchParams?: Promise<Record<string, string | string[]>> } | any) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const norm = normalizeSlug(resolvedParams.slug)
  if (!norm) return notFound()
  if (norm !== resolvedParams.slug) {
    const sp = new URLSearchParams()
    for (const key in (resolvedSearchParams || {})) {
      const val = (resolvedSearchParams as any)[key]
      if (Array.isArray(val)) {
        val.forEach(v => sp.append(key, String(v)))
      } else if (val != null) {
        sp.set(key, String(val))
      }
    }
    const qs = sp.toString()
    redirect(`/kits/${norm}${qs ? `?${qs}` : ''}`)
  }

  const kit = kitsDetail[norm]
  if (!kit) return notFound()

  const title = titleFromSlug(norm)
  const url = `/kits/${norm}`

  const styledTitle = (
    <>
      {title.replace(' Marriage Kit', '')}
      {' '}
      <span className="text-brand-gold">Marriage Kit</span>
    </>
  )

  return (
    <main data-testid="kit-detail-app-router">
      <HeaderBlock title={styledTitle} lede={kit.lede} right={<CrossPassports partner={norm.split('-')[1] as any} />} compact />

      <section className="section pt-5 md:pt-6">
        <div className="container">
          <div className="grid gap-x-6 gap-y-0 md:grid-cols-[1fr_360px] items-start">
            <div>
              <Included items={kit.features} inline />
            </div>
            <div className="self-start">
              <BuyBox priceEUR={kit.priceEUR} slug={kit.slug} />
            </div>
            {/* Trust stats glued directly under the boxes, full-width */}
            <div className="col-span-full md:col-span-2 mt-6">
              <TrustStrip />
            </div>
          </div>
        </div>
      </section>

      <About text={kit.about} />
      <RelatedKits related={kit.related} />

      <JsonLd name={title} url={url} price={kit.priceEUR} />
      <BreadcrumbsJsonLd name={title} url={url} />
    </main>
  )
}
