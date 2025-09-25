// Server component to inject Product JSON-LD (SSR)
import React from 'react'
import { toJsonLd } from '@/lib/jsonLd'

type ProductJsonLdProps = {
  name: string
  description: string
  sku: string
  image: string
  url: string
  price: string
  priceCurrency: string
  availability?: string // default InStock
  brandName?: string // default Lex Atlas
  validFrom?: string
}

export default function ProductJsonLd(props: ProductJsonLdProps) {
  const {
    name, description, sku, image, url, price, priceCurrency,
    availability = 'https://schema.org/InStock',
    brandName = 'Lex Atlas',
    validFrom
  } = props

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    image,
    url,
    brand: {
      '@type': 'Organization',
      name: brandName
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability,
      ...(validFrom ? { validFrom } : {})
    }
  }

  return (
    <script
      type="application/ld+json"
      // SSR safe injection
      dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
    />
  )
}
