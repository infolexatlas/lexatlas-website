'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, CreditCard, Shield, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { getProductBySlug } from '@/data/products'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (productSlug) {
      const foundProduct = getProductBySlug(productSlug)
      setProduct(foundProduct)
    }
  }, [productSlug])

  const handleCheckout = async (priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          productSlug,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-brand-deep" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-4">
              Complete Your Purchase
            </h1>
            <p className="text-xl text-gray-600">
              Secure checkout powered by Stripe
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-brand-deep">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {product.shortDescription}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-brand-deep">What's included:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature: string) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-brand-deep">Countries covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.countries.slice(0, 8).map((country: string) => (
                      <span
                        key={country}
                        className="px-2 py-1 bg-brand-gold/10 text-brand-deep text-xs rounded"
                      >
                        {country}
                      </span>
                    ))}
                    {product.countries.length > 8 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{product.countries.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Options */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-brand-deep">
                    Choose Your Option
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-brand-deep">{product.title}</h4>
                        <p className="text-sm text-gray-600">Single kit purchase</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-deep">
                          {formatPrice(product.price)}
                        </div>
                        <p className="text-sm text-gray-600">One-time payment</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleCheckout(product.stripePriceId)}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay {formatPrice(product.price)}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Benefits */}
              <Card className="bg-brand-gold/5 border-brand-gold/20">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-brand-gold" />
                      <span className="text-sm font-medium text-brand-deep">
                        Secure payment with Stripe
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-brand-gold" />
                      <span className="text-sm font-medium text-brand-deep">
                        Instant PDF download
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 text-brand-gold flex items-center justify-center">
                        <span className="text-xs font-bold">30</span>
                      </div>
                      <span className="text-sm font-medium text-brand-deep">
                        30-day money-back guarantee
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
