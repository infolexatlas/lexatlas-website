'use client'

import { useEffect } from 'react'

interface ProductJsonLdProps {
  name: string
  description: string
  price: string
  priceCurrency: string
  availability?: string
  image?: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function ProductJsonLd({
  name,
  description,
  price,
  priceCurrency,
  availability = 'https://schema.org/InStock',
  image,
  url,
}: ProductJsonLdProps) {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      description,
      image,
      url,
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability,
        seller: {
          '@type': 'Organization',
          name: 'LexAtlas',
        },
      },
      brand: {
        '@type': 'Brand',
        name: 'LexAtlas',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [name, description, price, priceCurrency, availability, image, url])

  return null
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [items])

  return null
}

export function OrganizationJsonLd() {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LexAtlas',
      url: 'https://lexatlas.com',
      logo: 'https://lexatlas.com/logo-lexatlas.svg',
      description: 'Your Global Legal Compass. Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.',
      sameAs: [
        'https://linkedin.com/company/lexatlas',
        'https://twitter.com/lexatlas',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'contact@lexatlas.com',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
