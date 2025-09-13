import { test, expect } from '@playwright/test'

const base = process.env.BASE_URL || 'http://127.0.0.1:3000'
const prod = process.env.NEXT_PUBLIC_BASE_URL || ''
const url = (p = '') => new URL(p, base).toString()

test.describe('@smoke basic', () => {
  test('home renders', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/LexAtlas|Kits|Marriage/i)
  })

  test('robots and sitemap', async ({ request }) => {
    const robots = await request.get(url('/robots.txt'))
    expect(robots.ok()).toBeTruthy()
    const txt = await robots.text()
    expect(txt).toMatch(/Sitemap:\s*.+\/sitemap\.xml/i)

    const sm = await request.get(url('/sitemap.xml'))
    expect(sm.ok()).toBeTruthy()
    const xml = await sm.text()
    const m = xml.match(/<loc>(https?:\/\/[^<]+)<\/loc>/)
    const host = m ? m[1].replace(/\/$/, '') : (prod || base).replace(/\/$/, '')
    expect(xml).toContain(`${host}/`)
    expect(xml).toContain(`${host}/kits`)
  })

  test('kit detail page has Buy Now button', async ({ page }) => {
    // Mock fetch to prevent actual Stripe calls during testing
    await page.route('**/api/checkout/session', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          id: 'test_session_id',
          url: 'https://checkout.stripe.com/test'
        })
      })
    })

    await page.goto('/kits/fra-usa')
    
    // Check that the Buy Now button exists
    const buyButton = page.getByRole('button', { name: /buy now/i })
    await expect(buyButton).toBeVisible()
    
    // Check that the button is not disabled initially
    await expect(buyButton).not.toBeDisabled()
    
    // Verify the page has the expected structure
    await expect(page.locator('[data-testid="kit-detail-app-router"]')).toBeVisible()
  })
})


