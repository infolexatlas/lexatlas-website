import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { getAllProducts } from '@/data/products'

export const metadata: Metadata = {
  title: 'Legal Kits - LexAtlas',
  description: 'Browse our comprehensive collection of international legal kits. Expert guidance for cross-border procedures.',
  openGraph: {
    title: 'Legal Kits - LexAtlas',
    description: 'Browse our comprehensive collection of international legal kits. Expert guidance for cross-border procedures.',
    images: [
      {
        url: '/og/kits.svg',
        width: 1200,
        height: 630,
        alt: 'Legal Kits - LexAtlas',
      },
      {
        url: '/og/kits.png',
        width: 1200,
        height: 630,
        alt: 'Legal Kits - LexAtlas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Kits - LexAtlas',
    description: 'Browse our comprehensive collection of international legal kits. Expert guidance for cross-border procedures.',
    images: ['/og/kits.svg', '/og/kits.png'],
  },
}

export default function KitsPage() {
  const products = getAllProducts()

  return (
    <div className="min-h-screen bg-brand-muted">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-6">
              Legal Kits
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert-built, country-specific PDF guides to handle international 
              legal procedures with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <div key={product.id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-brand-deep">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-brand-deep">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">One-time payment</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-brand-deep">What's included:</h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-brand-gold flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-brand-deep">Countries covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.countries.slice(0, 6).map((country) => (
                          <span
                            key={country}
                            className="px-2 py-1 bg-brand-gold/10 text-brand-deep text-xs rounded"
                          >
                            {country}
                          </span>
                        ))}
                        {product.countries.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{product.countries.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button asChild className="flex-1">
                        <Link href={`/kits/${product.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link href={`/checkout?product=${product.slug}`}>
                          Buy Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
