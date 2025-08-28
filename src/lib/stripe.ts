import Stripe from 'stripe'

// Priority to LIVE keys if provided, fallback to TEST keys
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export { stripePublicKey }

export const stripePriceIds = {
  marriageKit: process.env.STRIPE_PRICE_MARRIAGE || 'price_test_marriage',
  bundle: process.env.STRIPE_PRICE_BUNDLE || 'price_test_bundle',
} as const

export type StripePriceId = keyof typeof stripePriceIds

// Helper to check if we're in production mode
export const isStripeLive = stripeSecretKey?.startsWith('sk_live_')

// Helper to check if we should use fake checkout (for testing)
export const useFakeCheckout = process.env.NEXT_PUBLIC_FAKE_CHECKOUT === '1'
