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

export interface CheckoutSession {
  id: string
  url: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  country: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface Country {
  code: string
  name: string
  flag: string
}

export type StripePriceId = 'marriageKit' | 'bundle'

export interface Kit {
  slug: string
  title: string
  description: string
  price: number
  currency: string
}

export interface PricingTier {
  name: string
  price: number
  currency: string
  features: string[]
  popular?: boolean
}

// Extend Window interface for Plausible analytics
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void
  }
}
