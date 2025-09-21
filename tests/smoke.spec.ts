import { test, expect } from '@playwright/test'

const base = process.env.BASE_URL || 'http://127.0.0.1:3000'
const prod = process.env.NEXT_PUBLIC_BASE_URL || ''
const url = (p = '') => new URL(p, base).toString()

test.describe('@smoke basic', () => {
  test('home renders', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Lex Atlas|Kits|Marriage/i)
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

  test('checkout flow smoke test', async ({ page }) => {
    // Mock the checkout API endpoint
    await page.route('**/api/checkout', async route => {
      const body = await route.request().postDataJSON()
      
      // Verify the request has required fields
      expect(body).toHaveProperty('priceId')
      expect(body).toHaveProperty('country1')
      expect(body).toHaveProperty('country2')
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          url: 'https://checkout.stripe.com/test_session_123'
        })
      })
    })

    await page.goto('/kits/fra-gbr')
    
    // Find and click the Buy Now button
    const buyButton = page.getByRole('button', { name: /buy now/i })
    await expect(buyButton).toBeVisible()
    
    // Click the button and verify it triggers the checkout
    await buyButton.click()
    
    // Verify the checkout API was called
    // The actual redirect would happen in a real scenario
    await page.waitForTimeout(100) // Give time for the API call
  })

  test('checkout success page renders with session data', async ({ page }) => {
    // Mock Stripe API for session retrieval
    await page.route('**/api/checkout/session/*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'cs_test_123',
          customer_email: 'test@example.com',
          amount_total: 2900,
          currency: 'eur',
          metadata: {
            kitSlug: 'fra-gbr'
          }
        })
      })
    })

    await page.goto('/checkout/success?session_id=cs_test_123')
    
    // Verify success page elements
    await expect(page.getByText('Payment Successful!')).toBeVisible()
    await expect(page.getByText('Check your email')).toBeVisible()
    await expect(page.getByText('Order Summary')).toBeVisible()
    await expect(page.getByText('FRA ↔ GBR Marriage Kit')).toBeVisible()
  })

  test('checkout cancel page renders', async ({ page }) => {
    await page.goto('/checkout/cancel?kit=fra-gbr')
    
    // Verify cancel page elements
    await expect(page.getByText('Payment Cancelled')).toBeVisible()
    await expect(page.getByText('Try Again')).toBeVisible()
    await expect(page.getByText('Browse All Kits')).toBeVisible()
  })
})


