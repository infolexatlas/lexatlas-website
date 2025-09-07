import React from 'react'

export function JsonLd({ name, url, price }: { name: string; url: string; price: number }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    brand: { '@type': 'Brand', name: 'LexAtlas' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price,
      availability: 'https://schema.org/InStock',
      url,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BreadcrumbsJsonLd({ name, url }: { name: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Kits', item: '/kits' },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}


