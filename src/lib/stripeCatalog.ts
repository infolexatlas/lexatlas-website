import { stripe } from './stripe'

export const STRIPE_CATALOG = {
  single_kit: { 
    lookup_key: 'single_kit_eur_2900', 
    amount: 2900, 
    currency: 'eur' 
  },
  bundle_3: { 
    lookup_key: 'bundle_3_eur_7500', 
    amount: 7500, 
    currency: 'eur' 
  },
  bundle_10: { 
    lookup_key: 'bundle_10_eur_20000', 
    amount: 20000, 
    currency: 'eur' 
  }
} as const

export type CatalogKey = keyof typeof STRIPE_CATALOG

/**
 * Get price ID by lookup key
 */
export async function getPriceIdByLookupKey(lookupKey: string): Promise<string | null> {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
      active: true,
      limit: 1
    })
    
    return prices.data[0]?.id || null
  } catch (error) {
    console.error('Error fetching price by lookup key:', error)
    return null
  }
}

/**
 * Ensure prices exist in development environment
 * Creates products and prices if they don't exist
 */
export async function ensurePricesExistDev(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    console.log('Skipping price creation in production')
    return
  }

  console.log('Ensuring Stripe prices exist for development...')

  for (const [key, config] of Object.entries(STRIPE_CATALOG)) {
    const existingPrice = await getPriceIdByLookupKey(config.lookup_key)
    
    if (existingPrice) {
      console.log(`✓ Price ${config.lookup_key} already exists: ${existingPrice}`)
      continue
    }

    try {
      // Create product first
      const product = await stripe.products.create({
        name: getProductName(key as CatalogKey),
        description: getProductDescription(key as CatalogKey),
        metadata: {
          lookup_key: config.lookup_key
        }
      })

      // Create price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: config.amount,
        currency: config.currency,
        lookup_key: config.lookup_key,
        metadata: {
          product_key: key
        }
      })

      console.log(`✓ Created price ${config.lookup_key}: ${price.id}`)
    } catch (error) {
      console.error(`✗ Failed to create price ${config.lookup_key}:`, error)
    }
  }
}

function getProductName(key: CatalogKey): string {
  switch (key) {
    case 'single_kit':
      return 'Single Marriage Kit'
    case 'bundle_3':
      return 'Bundle of 3 Marriage Kits'
    case 'bundle_10':
      return 'Full Pack - 10 Marriage Kits'
    default:
      return 'Marriage Kit'
  }
}

function getProductDescription(key: CatalogKey): string {
  switch (key) {
    case 'single_kit':
      return 'Complete marriage guide for one country pair'
    case 'bundle_3':
      return 'Choose any 3 marriage kits from our collection'
    case 'bundle_10':
      return 'Complete collection of all 10 priority marriage kits'
    default:
      return 'Marriage kit'
  }
}
