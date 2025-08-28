import { test, expect } from '@playwright/test'

test.describe('Kit Pages', () => {
  test('should display FRA-USA kit page correctly', async ({ page }) => {
    await page.goto('/kits/fra-usa')
    
    // Check page title
    await expect(page).toHaveTitle(/France – United States/)
    
    // Check main content
    await expect(page.getByText('Marriage Kit France – United States')).toBeVisible()
    await expect(page.getByText('29 €')).toBeVisible()
    
    // Check buy button
    const buyButton = page.getByRole('button', { name: 'Buy Now – 29 €' })
    await expect(buyButton).toBeVisible()
    await expect(buyButton).toBeEnabled()
    
    // Check what's included section
    await expect(page.getByText("What's Included")).toBeVisible()
    await expect(page.getByText('Complete marriage procedure guide')).toBeVisible()
  })

  test('should display FRA-GBR kit page correctly', async ({ page }) => {
    await page.goto('/kits/fra-gbr')
    
    // Check page title
    await expect(page).toHaveTitle(/France – United Kingdom/)
    
    // Check main content
    await expect(page.getByText('Marriage Kit France – United Kingdom')).toBeVisible()
    await expect(page.getByText('29 €')).toBeVisible()
  })

  test('should show preview coming soon for missing samples', async ({ page }) => {
    await page.goto('/kits/fra-usa')
    
    // Check if preview section exists
    const previewSection = page.locator('text=Free preview')
    if (await previewSection.isVisible()) {
      // If preview is available, check the link
      await expect(page.getByRole('link', { name: 'Free Preview' })).toBeVisible()
    } else {
      // If preview is not available, check coming soon message
      await expect(page.getByText('Free preview coming soon')).toBeVisible()
    }
  })

  test('should have working buy now form', async ({ page }) => {
    await page.goto('/kits/fra-usa')
    
    // Check form exists
    const form = page.locator('form[action="/api/checkout/single"]')
    await expect(form).toBeVisible()
    
    // Check hidden inputs
    await expect(page.locator('input[name="slug"][value="fra-usa"]')).toBeVisible()
    await expect(page.locator('input[name="pairKey"][value="FR-US"]')).toBeVisible()
  })

  test('should display trust badges', async ({ page }) => {
    await page.goto('/kits/fra-usa')
    
    // Check trust badges section exists
    await expect(page.locator('[data-testid="trust-badges"]')).toBeVisible()
  })

  test('should have proper meta description', async ({ page }) => {
    await page.goto('/kits/fra-usa')
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Complete marriage guide for France – United States/)
  })

  test('should redirect to 404 for invalid slugs', async ({ page }) => {
    await page.goto('/kits/invalid-slug')
    
    // Should show 404 or redirect
    const status = page.url()
    expect(status).not.toContain('/kits/invalid-slug')
  })

  test('should work for all priority slugs', async ({ page }) => {
    const prioritySlugs = [
      'fra-usa', 'fra-gbr', 'fra-can', 'fra-mar', 'fra-deu',
      'fra-che', 'fra-bel', 'fra-esp', 'fra-ita', 'fra-prt'
    ]
    
    for (const slug of prioritySlugs) {
      await page.goto(`/kits/${slug}`)
      
      // Check page loads without error
      await expect(page).not.toHaveTitle(/404|Not Found/)
      
      // Check price is displayed
      await expect(page.getByText('29 €')).toBeVisible()
      
      // Check buy button exists
      await expect(page.getByRole('button', { name: /Buy Now/ })).toBeVisible()
    }
  })
})
