import { getPriceForPair, hasSpecificPricing } from './pricing'
import { parsePair, getCountryName } from './countries'

export interface KitContent {
  pair: string
  country1: string
  country2: string
  country1Name: string
  country2Name: string
  hasPdf: boolean
  hasMdx: boolean
  pdfUrl?: string
  mdxUrl?: string
  description: string
  price: number
  currency: string
  isDefaultPrice: boolean
}

/**
 * Check if a PDF exists for a specific pair
 */
async function checkPdfExists(pair: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises')
    await fs.access(`public/downloads/marriage/${pair}.pdf`)
    return true
  } catch {
    return false
  }
}

/**
 * Check if MDX content exists for a specific pair
 */
async function checkMdxExists(pair: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises')
    await fs.access(`src/content/marriage/briefs/${pair}.mdx`)
    return true
  } catch {
    return false
  }
}

/**
 * Get kit content information for a specific pair
 */
export async function getKitContent(pair: string): Promise<KitContent | null> {
  const pairData = parsePair(pair)
  
  if (!pairData) {
    return null
  }

  const country1Name = getCountryName(pairData.country1)
  const country2Name = getCountryName(pairData.country2)
  
  if (!country1Name || !country2Name) {
    return null
  }

  const [hasPdf, hasMdx] = await Promise.all([
    checkPdfExists(pair),
    checkMdxExists(pair)
  ])

  const priceInfo = getPriceForPair(pair)
  const isDefaultPrice = !hasSpecificPricing(pair)

  return {
    pair: pairData.pair,
    country1: pairData.country1,
    country2: pairData.country2,
    country1Name,
    country2Name,
    hasPdf,
    hasMdx,
    pdfUrl: hasPdf ? `/downloads/marriage/${pair}.pdf` : undefined,
    mdxUrl: hasMdx ? `/kits/marriage-kit/${pair}/content` : undefined,
    description: `Comprehensive marriage guide for ${country1Name} and ${country2Name}. Includes step-by-step procedures, document requirements, and expert legal guidance.`,
    price: priceInfo.price,
    currency: priceInfo.currency,
    isDefaultPrice
  }
}

/**
 * Generate a placeholder PDF URL for pairs without actual PDFs
 */
export function getPlaceholderPdfUrl(pair: string): string {
  return `/api/download/${pair}`
}

/**
 * Get all available kit pairs with their status
 */
export async function getAllKitPairs(): Promise<KitContent[]> {
  // This would typically come from a database or file system
  // For now, we'll return a subset of common pairs
  const commonPairs = ['FR-US', 'FR-JP', 'DE-US', 'US-JP', 'UK-US']
  
  const kits = await Promise.all(
    commonPairs.map(pair => getKitContent(pair))
  )
  
  return kits.filter((kit): kit is KitContent => kit !== null)
}
