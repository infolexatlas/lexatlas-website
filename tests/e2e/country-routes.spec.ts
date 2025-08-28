import { test, expect } from '@playwright/test'

test.describe('Country Routes', () => {
  test('FR route exists and CTA works', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR')
    
    // Check page title
    await expect(page).toHaveTitle(/Marriage Kit — France/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Marriage Kit — France')
    
    // Check that pricing buttons are visible
    await expect(page.getByRole('button', { name: /Buy Single Kit/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Buy Bundle/ })).toBeVisible()
    
    // Check that country-specific content is present
    await expect(page.locator('text=France')).toBeVisible()
  })

  test('Checkout POST payload includes country=FR', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR')
    
    // Mock the fetch request
    await page.route('/api/checkout', async route => {
      const postData = route.postDataJSON()
      expect(postData.country).toBe('FR')
      expect(postData.priceId).toBe('marriageKit')
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ url: 'https://checkout.stripe.com/test' })
      })
    })
    
    // Click the single kit button
    await page.getByRole('button', { name: /Buy Single Kit/ }).click()
    
    // Wait for the checkout request to be made
    await page.waitForResponse('/api/checkout')
  })

  test('Success page shows Download', async ({ page }) => {
    // Mock the verification API
    await page.route('/api/verify-session', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: true,
          session: {
            id: 'cs_test_123',
            payment_status: 'paid',
            metadata: { country: 'FR' }
          }
        })
      })
    })
    
    await page.goto('/kits/marriage-kit/FR/success?session_id=cs_test_123')
    
    // Wait for verification to complete
    await page.waitForSelector('text=Payment Successful!')
    
    // Check that download component is visible
    await expect(page.locator('text=Download Ready')).toBeVisible()
    await expect(page.getByRole('button', { name: /Download PDF/ })).toBeVisible()
  })

  test('Country selector navigation works', async ({ page }) => {
    await page.goto('/kits/marriage-kit')
    
    // Click on the country selector
    await page.click('input[placeholder*="Select your country"]')
    
    // Type to search for France
    await page.fill('input[placeholder*="Select your country"]', 'France')
    
    // Click on France
    await page.click('text=France')
    
    // Should navigate to France page
    await expect(page).toHaveURL('/kits/marriage-kit/FR')
    await expect(page.locator('h1')).toContainText('Marriage Kit — France')
  })

  test('Invalid country code shows 404', async ({ page }) => {
    await page.goto('/kits/marriage-kit/INVALID')
    
    // Should show 404 or redirect
    await expect(page.locator('text=Country not found')).toBeVisible()
  })

  test('Cancel page works correctly', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR/cancel')
    
    // Check page content
    await expect(page.locator('h1')).toContainText('Payment Cancelled')
    await expect(page.getByRole('button', { name: /Try Again/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Browse All Countries/ })).toBeVisible()
    
    // Click try again should go back to FR page
    await page.getByRole('button', { name: /Try Again/ }).click()
    await expect(page).toHaveURL('/kits/marriage-kit/FR')
  })
})
