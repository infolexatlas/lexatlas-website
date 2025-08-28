import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/LexAtlas/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Cross‑Border Legal Kits')
    
    // Check navigation
    await expect(page.locator('nav')).toBeVisible()
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Explore the Marriage Kit/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Browse All Kits/ })).toBeVisible()
    
    // Check new Phase 3 components
    await expect(page.getByText('Trusted by International Couples')).toBeVisible()
    await expect(page.getByText('What Our Customers Say')).toBeVisible()
    await expect(page.getByText('Our Commitment to You')).toBeVisible()
  })

  test('should navigate to kits page', async ({ page }) => {
    await page.goto('/')
    
    // Click on Browse All Kits
    await page.getByRole('link', { name: /Browse All Kits/ }).click()
    
    // Should navigate to kits page
    await expect(page).toHaveURL('/kits')
    await expect(page.locator('h1')).toContainText('Legal Kits')
  })

  test('should be accessible', async ({ page }) => {
    await page.goto('/')
    
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings.first()).toHaveText(/Cross‑Border Legal Kits/)
    
    // Check for proper focus management
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
  })
})
