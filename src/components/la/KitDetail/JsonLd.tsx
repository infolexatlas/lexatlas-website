import React from 'react'

function getOptimizedDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'fra-usa': 'Documents, CCAM/recognition, étapes légales pour un mariage France–USA. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-gbr': 'Documents, CNI/recognition, étapes légales pour un mariage France–UK. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-can': 'Documents, recognition, étapes légales pour un mariage France–Canada. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-mar': 'Documents, transcription, étapes légales pour un mariage France–Maroc. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-deu': 'Documents, reconnaissance, étapes légales pour un mariage France–Allemagne. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-che': 'Documents, reconnaissance, étapes légales pour un mariage France–Suisse. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-bel': 'Documents, reconnaissance, étapes légales pour un mariage France–Belgique. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-esp': 'Documents, reconnaissance, étapes légales pour un mariage France–Espagne. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-ita': 'Documents, reconnaissance, étapes légales pour un mariage France–Italie. Kit PDF prêt à l\'emploi, téléchargement instantané.',
    'fra-prt': 'Documents, reconnaissance, étapes légales pour un mariage France–Portugal. Kit PDF prêt à l\'emploi, téléchargement instantané.',
  };
  return descriptions[slug] || 'Kit PDF prêt à l\'emploi, téléchargement instantané.';
}

function getSku(slug: string): string {
  const skus: Record<string, string> = {
    'fra-usa': 'KIT-FRA-USA-2025',
    'fra-gbr': 'KIT-FRA-GBR-2025',
    'fra-can': 'KIT-FRA-CAN-2025',
    'fra-mar': 'KIT-FRA-MAR-2025',
    'fra-deu': 'KIT-FRA-DEU-2025',
    'fra-che': 'KIT-FRA-CHE-2025',
    'fra-bel': 'KIT-FRA-BEL-2025',
    'fra-esp': 'KIT-FRA-ESP-2025',
    'fra-ita': 'KIT-FRA-ITA-2025',
    'fra-prt': 'KIT-FRA-PRT-2025',
  };
  return skus[slug] || `KIT-${slug.toUpperCase()}-2025`;
}

export function JsonLd({ name, url, price, slug }: { name: string; url: string; price: number; slug: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "description": getOptimizedDescription(slug),
    "sku": getSku(slug),
    "brand": {
      "@type": "Brand",
      "name": "LexAtlas"
    },
    "image": `${baseUrl}/images/kits/${slug}-cover.jpg`,
    "url": `${baseUrl}${url}`,
    "offers": {
      "@type": "Offer",
      "price": price.toString(),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}${url}`,
      "validFrom": "2025-09-17"
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BreadcrumbsJsonLd({ name, url }: { name: string; url: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Kits', item: `${baseUrl}/kits` },
      { '@type': 'ListItem', position: 3, name, item: `${baseUrl}${url}` },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}


