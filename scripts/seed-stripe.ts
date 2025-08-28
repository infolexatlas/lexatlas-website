#!/usr/bin/env tsx

import { ensurePricesExistDev } from '../src/lib/stripeCatalog'

async function main() {
  try {
    await ensurePricesExistDev()
    console.log('✅ Stripe seeding completed successfully')
  } catch (error) {
    console.error('❌ Stripe seeding failed:', error)
    process.exit(1)
  }
}

main()
