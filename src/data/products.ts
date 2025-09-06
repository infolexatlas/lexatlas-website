export interface Product {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  currency: string
  features: string[]
  countries: string[]
  tags: string[]
  pdfUrl: string
  imageUrl: string
  stripePriceId: string
  isBundle?: boolean
  includedKits?: string[]
}

export const products: Product[] = [
  {
    id: 'marriage-kit',
    slug: 'marriage-kit',
    title: 'Cross-Border Marriage Kit',
    description: 'Comprehensive legal guide for international marriage procedures across 30 countries. Includes step-by-step checklists, document templates, and country-specific requirements.',
    shortDescription: 'Expert guidance for international marriage procedures in 30 countries',
    price: 50,
    currency: 'USD',
    features: [
      'Step-by-step checklists for each country',
      'Document templates and forms',
      'Country-specific legal requirements',
      'Timeline planning tools',
      'Expert legal guidance',
      'Lifetime updates',
      'Instant PDF download'
    ],
    countries: [
      'United States', 'France', 'Germany', 'Italy', 'Spain', 'United Kingdom',
      'Canada', 'Australia', 'Netherlands', 'Belgium', 'Switzerland', 'Austria',
      'Sweden', 'Norway', 'Denmark', 'Finland', 'Japan', 'South Korea',
      'Singapore', 'Hong Kong', 'Brazil', 'Argentina', 'Mexico', 'Chile',
      'South Africa', 'New Zealand', 'Ireland', 'Portugal', 'Greece', 'Poland'
    ],
    tags: ['marriage', 'cross-border', 'international', 'legal', 'checklists'],
    pdfUrl: '/documents/cross-border-marriage-kit.pdf',
    imageUrl: '/images/marriage-kit-mockup.jpg',
    stripePriceId: 'price_test_marriage'
  },
  {
    id: 'bundle-2-kits',
    slug: 'bundle-2-kits',
    title: 'Bundle: 2 Legal Kits',
    description: 'Choose any two legal kits and save 50% on the second kit. Perfect for couples or families dealing with multiple international legal procedures.',
    shortDescription: 'Get any 2 legal kits with 50% off the second',
    price: 75,
    originalPrice: 100,
    currency: 'USD',
    features: [
      'Choose any 2 legal kits',
      '50% discount on second kit',
      'All features included',
      'Lifetime updates',
      'Instant PDF downloads',
      'Flexible selection'
    ],
    countries: ['All countries covered by selected kits'],
    tags: ['bundle', 'discount', 'multiple-kits', 'savings'],
    pdfUrl: '/documents/bundle-instructions.pdf',
    imageUrl: '/images/bundle-mockup.jpg',
    stripePriceId: 'price_test_bundle',
    isBundle: true,
    includedKits: ['marriage-kit', 'future-tax-kit']
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProduct(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getAllProducts(): Product[] {
  return products
}

export function getNonBundleProducts(): Product[] {
  return products.filter(product => !product.isBundle)
}
