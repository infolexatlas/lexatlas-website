import { test, expect } from '@playwright/test'

test.describe('Lead Magnet Banner', () => {
  test('should display lead magnet banner with correct text', async ({ page }) => {
    await page.goto('/pricing')
    
    // Check that lead magnet banner is visible
    await expect(page.getByText('Not ready to buy? Get a free sample of our marriage kit')).toBeVisible()
    
    // Check description text
    await expect(page.getByText('Download our comprehensive marriage kit sample and see what\'s included in our guides')).toBeVisible()
    
    // Check email input field
    await expect(page.getByPlaceholder('Enter your email address')).toBeVisible()
    
    // Check submit button
    await expect(page.getByRole('button', { name: 'Get Free Sample' })).toBeVisible()
  })

  test('should handle email submission', async ({ page }) => {
    await page.goto('/pricing')
    
    // Fill in email
    await page.fill('input[type="email"]', 'test@example.com')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for success message
    await expect(page.getByText('Thank you! Check your email for the free sample.')).toBeVisible()
  })



  test('should have correct privacy text', async ({ page }) => {
    await page.goto('/pricing')
    
    // Check privacy disclaimer
    await expect(page.getByText('We\'ll send you a free sample and occasional updates about new country kits.')).toBeVisible()
    await expect(page.getByText('Unsubscribe anytime.')).toBeVisible()
  })
})
