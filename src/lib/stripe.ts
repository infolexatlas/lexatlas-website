import Stripe from 'stripe'

export const isFakeCheckout = process.env.NEXT_PUBLIC_FAKE_CHECKOUT === '1'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

export const stripe = (!isFakeCheckout && stripeSecretKey)
  ? new Stripe(stripeSecretKey)
  : null

export function assertStripe(stripe: Stripe | null) { 
  if (!stripe) throw new Error('Stripe unavailable'); 
}

// Priority to LIVE keys if provided, fallback to TEST keys
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export { stripePublicKey }

export const stripePriceIds = {
  marriageKit: process.env.STRIPE_PRICE_MARRIAGE || 'price_test_marriage',
  bundle: process.env.STRIPE_PRICE_BUNDLE || 'price_test_bundle',
} as const

export type StripePriceId = keyof typeof stripePriceIds

// Helper to check if we're in production mode
export const isStripeLive = stripeSecretKey?.startsWith('sk_live_')

// Helper to check if we should use fake checkout (for testing)
export const useFakeCheckout = isFakeCheckout
