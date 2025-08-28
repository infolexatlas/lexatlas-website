import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { getAllProducts } from '@/data/products'

export function Pricing() {
  const products = getAllProducts()

  return (
    <section className="py-20 bg-brand-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the option that best fits your needs. All kits include lifetime updates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <div key={product.id}>
              <Card className={`h-full relative ${product.isBundle ? 'border-brand-gold shadow-lg' : 'border-gray-200'}`}>
                {product.isBundle && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-gold text-brand-deep px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-serif text-brand-deep">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    {product.shortDescription}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-brand-deep">
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

                  <ul className="space-y-3 text-left">
                    {product.features.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-brand-gold flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full" size="lg">
                    <a href={`/checkout?product=${product.slug}`}>
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            Secure payment processed by Stripe • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  )
}
