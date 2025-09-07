import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PRIORITY_SLUGS } from '@/lib/kits.client'
import { getDisplayPairFromSlug } from '@/lib/kits.display'
import { getSinglePriceForPair } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'

export function KitGrid() {
  return (
    <section className="bg-brand-ivory py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 animate-reveal">
          <div className="flex items-center justify-center mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-brand-navy to-brand-gold mr-3"></div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight">
              Individual Marriage Kits
            </h2>
          </div>
          <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
            Choose specific country combinations for your cross-border marriage
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          {PRIORITY_SLUGS.map((slug, index) => {
            const displayPair = getDisplayPairFromSlug(slug)
            const priceInfo = getSinglePriceForPair(slug)
            
            if (!displayPair) return null
            
            return (
              <div key={slug} className="h-full animate-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-full bg-white border-0 rounded-xl2 shadow-soft hover:scale-105 hover:shadow-premium transition-all duration-250 flex flex-col group">
                  <CardHeader className="pb-3 flex-shrink-0">
                    <CardTitle className="text-base font-medium text-brand-navy leading-snug line-clamp-2 min-h-[3.25rem] break-words group-hover:text-brand-gold transition-colors duration-250">
                      {displayPair.left} – {displayPair.right}
                    </CardTitle>
                    <CardDescription className="text-sm text-brand-textMuted">
                      {displayPair.left} – {displayPair.right} Marriage Kit
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="flex-grow" />
                  
                  <CardContent className="pt-0 mt-auto">
                    <div className="text-2xl font-bold text-brand-navy mb-4 tabular-nums leading-none min-h-[2rem] flex items-center">
                      29 €
                    </div>
                    <Button asChild className="w-full" variant="outline" size="sm">
                      <Link href={`/kits/${slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12 lg:mt-16 animate-reveal">
          <Button asChild size="xl" variant="premium">
            <Link href="/pricing">
              View All Pricing Options
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
