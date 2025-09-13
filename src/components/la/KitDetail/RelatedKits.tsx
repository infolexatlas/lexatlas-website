'use client'
import Link from 'next/link'

export function RelatedKits({ related }: { related: string[] }) {
  if (!related?.length) return null
  return (
    <section className="section pt-6 md:pt-8">
      <div className="container">
        <h2 className="text-2xl font-semibold tracking-tight">You might also like</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {related.map((slug) => (
            <div key={slug} className="h-full">
              <Link href={`/kits/${slug}`} className="block h-full rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-premium hover:border-brand-gold">
                <div className="text-sm font-medium text-brand-navy">{slug.toUpperCase().replace('-', ' – ')}</div>
                <div className="mt-1 text-xs text-muted-foreground">Marriage Kit</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


