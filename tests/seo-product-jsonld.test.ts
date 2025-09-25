import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'https://lex-atlas.com'
const KITS = ['/kits/fra-usa', '/kits/fra-ita', '/kits/fra-mar']

for (const path of KITS) {
  test(`Product JSON-LD present on ${path}`, async ({ request }) => {
    const res = await request.get(`${BASE}${path}`)
    expect(res.status()).toBe(200)
    const html = await res.text()
    // Must contain a JSON-LD <script> with @type Product
    expect(html).toMatch(/<script[^>]+type="application\/ld\+json"[^>]*>/i)
    expect(html).toMatch(/"@type"\s*:\s*"Product"/)
  })
}
