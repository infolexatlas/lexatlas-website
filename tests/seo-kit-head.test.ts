import { test, expect } from '@playwright/test'
import { KITS, KIT_SLUGS } from '../src/lib/kits.config'

// Test 3 random kit pages for SEO metadata
const testSlugs = KIT_SLUGS.slice(0, 3)

test.describe('SEO Kit Head Tests', () => {
  for (const slug of testSlugs) {
    test(`Kit ${slug} has correct SEO metadata`, async ({ page }) => {
      const kit = KITS[slug]
      expect(kit).toBeDefined()

      // Navigate to the kit page
      await page.goto(`/kits/${slug}`)

      // Test title
      const title = await page.title()
      expect(title).toBe(kit.title)

      // Test canonical URL
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toBe(kit.url)

      // Test JSON-LD exists and contains required fields
      const jsonLdScript = page.locator('script[type="application/ld+json"]')
      await expect(jsonLdScript).toHaveCount(1)

      const jsonLdContent = await jsonLdScript.textContent()
      const jsonLd = JSON.parse(jsonLdContent!)

      // Verify Product JSON-LD structure
      expect(jsonLd['@type']).toBe('Product')
      expect(jsonLd.name).toBe(kit.title)
      expect(jsonLd.description).toBe(kit.description)
      expect(jsonLd.sku).toBe(kit.sku)
      expect(jsonLd.brand['@type']).toBe('Brand')
      expect(jsonLd.brand.name).toBe(kit.brand)
      expect(jsonLd.image).toBe(`https://lex-atlas.com${kit.ogImage}`)
      expect(jsonLd.url).toBe(kit.url)

      // Verify Offer structure
      expect(jsonLd.offers['@type']).toBe('Offer')
      expect(jsonLd.offers.price).toBe(kit.price)
      expect(jsonLd.offers.priceCurrency).toBe(kit.currency)
      expect(jsonLd.offers.availability).toBe('https://schema.org/InStock')
      expect(jsonLd.offers.url).toBe(kit.url)
      expect(jsonLd.offers.validFrom).toBe(kit.validFrom)
    })
  }

  test('API vitals endpoint returns 200', async ({ request }) => {
    const response = await request.get('/api/vitals')
    expect(response.status()).toBe(200)
  })

  test('API vitals endpoint accepts POST with 204', async ({ request }) => {
    const response = await request.post('/api/vitals', {
      data: { test: 'data' }
    })
    expect(response.status()).toBe(204)
  })
})
