import { test, expect } from '@playwright/test'

test.describe('Country Pair Functionality', () => {
  test('should load marriage kit landing page', async ({ page }) => {
    await page.goto('/kits/marriage-kit')
    
    await expect(page).toHaveTitle(/International Marriage Kits/)
    await expect(page.locator('h1')).toContainText('International Marriage Kits')
    await expect(page.locator('text=Select Two Countries')).toBeVisible()
  })

  test('should show country selector and navigate to pair page', async ({ page }) => {
    await page.goto('/kits/marriage-kit')
    
    // Type in first country field
    await page.fill('[data-testid="country1-input"]', 'France')
    await page.click('text=France')
    
    // Type in second country field
    await page.fill('[data-testid="country2-input"]', 'United States')
    await page.click('text=United States')
    
    // Click submit button
    await page.click('text=View Marriage Kit')
    
    // Should navigate to the pair page
    await expect(page).toHaveURL(/\/kits\/marriage-kit\/FR-US/)
    await expect(page.locator('h1')).toContainText('Marriage Kit: France & United States')
  })

  test('should prevent selecting same country twice', async ({ page }) => {
    await page.goto('/kits/marriage-kit')
    
    // Select France in first field
    await page.fill('[data-testid="country1-input"]', 'France')
    await page.click('text=France')
    
    // Try to select France in second field
    await page.fill('[data-testid="country2-input"]', 'France')
    
    // France should not appear in second dropdown
    await expect(page.locator('text=France')).not.toBeVisible()
  })

  test('should show fallback content when MDX is missing', async ({ page }) => {
    await page.goto('/kits/marriage-kit/XX-YY') // Invalid pair
    
    await expect(page).toHaveTitle(/Country Pair Not Found/)
  })

  test('should show brief coming soon for missing MDX', async ({ page }) => {
    // Use a valid pair that doesn't have MDX content
    await page.goto('/kits/marriage-kit/DE-JP')
    
    await expect(page.locator('text=Brief Coming Soon')).toBeVisible()
    await expect(page.locator('text=We\'re currently preparing the detailed guide')).toBeVisible()
  })

  test('should show existing MDX content', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR-US')
    
    await expect(page.locator('text=Marriage Between France and United States')).toBeVisible()
    await expect(page.locator('text=Required Documents')).toBeVisible()
  })

  test('should handle PDF download with missing PDF', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR-US')
    
    // Should show PDF not available message
    await expect(page.locator('text=PDF Not Available')).toBeVisible()
    await expect(page.locator('text=PDF not uploaded yet')).toBeVisible()
  })

  test('should redirect invalid pairs to 404', async ({ page }) => {
    await page.goto('/kits/marriage-kit/INVALID')
    
    await expect(page).toHaveTitle(/Country Pair Not Found/)
  })

  test('should redirect same country pairs to 404', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR-FR')
    
    await expect(page).toHaveTitle(/Country Pair Not Found/)
  })

  test('should handle checkout with country pair metadata', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR-US')
    
    // Mock the checkout API
    await page.route('/api/checkout', async route => {
      const postData = route.postDataJSON()
      expect(postData.country1).toBe('FR')
      expect(postData.country2).toBe('US')
      expect(postData.pair).toBe('FR-US')
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: 'https://checkout.stripe.com/test' })
      })
    })
    
    // Click buy button
    await page.click('text=Buy Single Kit')
    
    // Should have made the API call with correct metadata
    await expect(page).toHaveURL(/checkout\.stripe\.com/)
  })

  test('should handle alphabetical ordering in URLs', async ({ page }) => {
    // Navigate to US-FR (should redirect to FR-US)
    await page.goto('/kits/marriage-kit/US-FR')
    
    // Should redirect to alphabetical order
    await expect(page).toHaveURL(/\/kits\/marriage-kit\/FR-US/)
  })

  test('should handle lowercase redirects', async ({ page }) => {
    // Navigate to lowercase pair
    await page.goto('/kits/marriage-kit/fr-us')
    
    // Should redirect to uppercase
    await expect(page).toHaveURL(/\/kits\/marriage-kit\/FR-US/)
  })

  test('should redirect old single-country routes', async ({ page }) => {
    // Navigate to old single-country route
    await page.goto('/kits/marriage-kit/FR')
    
    // Should redirect to pair selector
    await expect(page).toHaveURL(/\/kits\/marriage-kit$/)
  })

  test('should show correct metadata for pair pages', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR-US')
    
    // Check meta tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Marriage Kit: France & United States/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /France and United States/)
  })

  test('should handle country pair selector accessibility', async ({ page }) => {
    await page.goto('/kits/marriage-kit')
    
    // Check that inputs have proper labels
    await expect(page.locator('label[for="country1"]')).toContainText('First Country')
    await expect(page.locator('label[for="country2"]')).toContainText('Second Country')
    
    // Check that submit button is properly labeled
    await expect(page.locator('button[type="submit"]')).toContainText('View Marriage Kit')
  })
})
