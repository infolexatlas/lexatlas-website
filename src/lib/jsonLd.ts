/**
 * JSON-LD utility functions for structured data
 */

/**
 * Get the base URL from environment or fallback to localhost
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

/**
 * Convert object to JSON-LD string without formatting to reduce size
 */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj)
}

/**
 * Generate Organization schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LexAtlas",
    "url": getBaseUrl(),
    "logo": `${getBaseUrl()}/logo/lexatlas.svg`,
    "sameAs": [],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "contact.lexatlas@gmail.com"
    }]
  }
}

/**
 * Generate WebSite schema with SearchAction
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LexAtlas",
    "url": getBaseUrl(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${getBaseUrl()}/search?q={query}`,
      "query-input": "required name=query"
    }
  }
}

/**
 * Generate Product schema for kit pages
 */
export function getProductSchema(params: {
  pairNameFull: string
  slug: string
  productUrl: string
  imageUrl: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": params.pairNameFull,
    "description": `Step-by-step cross-border marriage kit for ${params.pairNameFull}. Official sources, checklists, and templates.`,
    "brand": { "@type": "Brand", "name": "LexAtlas" },
    "sku": `kit-${params.slug}`,
    "image": [params.imageUrl],
    "url": params.productUrl,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "29.00",
      "availability": "https://schema.org/InStock",
      "url": params.productUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "37"
    }
  }
}

/**
 * Generate BreadcrumbList schema for kit pages
 */
export function getBreadcrumbSchema(params: {
  pairNameFull: string
  productUrl: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getBaseUrl()
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kits",
        "item": `${getBaseUrl()}/kits`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": params.pairNameFull,
        "item": params.productUrl
      }
    ]
  }
}

/**
 * Generate WebPage schema for preview pages
 */
export function getPreviewPageSchema(params: {
  pairNameFull: string
  slug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Preview – ${params.pairNameFull} Marriage Kit`,
    "url": `${getBaseUrl()}/preview/${params.slug}`,
    "description": `Get a free preview of the ${params.pairNameFull} marriage kit.`
  }
}
