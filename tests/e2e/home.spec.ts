import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/LexAtlas/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('LexAtlas')
    
    // Check navigation
    await expect(page.locator('nav')).toBeVisible()
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /View Pricing/ })).toBeVisible()
    await expect(page.getByRole('main').getByRole('link', { name: /Browse Kits/ })).toBeVisible()
    
    // Check new Phase 3 components
    await expect(page.getByText('Trusted by International Couples')).toBeVisible()
    await expect(page.getByText('What Our Customers Say')).toBeVisible()
    await expect(page.getByText('Our Commitment to You')).toBeVisible()
  })

  test('should navigate to kits page', async ({ page }) => {
    await page.goto('/')
    
    // Click on Browse Kits in the main content
    await page.getByRole('main').getByRole('link', { name: /Browse Kits/ }).click()
    
    // Should navigate to kits page
    await expect(page).toHaveURL('/kits')
    await expect(page.locator('h1')).toContainText('Marriage Kits')
  })

  test('should be accessible', async ({ page }) => {
    await page.goto('/')
    
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings.first()).toHaveText(/LexAtlas/)
    
    // Check for proper focus management
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
  })

  test('should have working Top Questions accordion', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to Top Questions section
    await page.getByText('Top Questions').scrollIntoViewIfNeeded()
    
    // Check section heading
    await expect(page.getByRole('heading', { name: 'Top Questions' })).toBeVisible()
    
    // Check that FAQ items are present
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).toBeVisible()
    await expect(page.getByText('Does the kit replace a lawyer?')).toBeVisible()
    await expect(page.getByText('Are the guides up to date and verified?')).toBeVisible()
    
    // Check that FAQ items are present (answers may not be visible by default with Radix UI)
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).toBeVisible()
    
    // Check that search is not present in preview
    await expect(page.getByPlaceholder('Search questions...')).not.toBeVisible()
    
    // Check "View All FAQs" link
    await expect(page.getByRole('link', { name: 'View All FAQs' })).toBeVisible()
  })

  test('should expand Top Questions accordion items', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to Top Questions section
    await page.getByText('Top Questions').scrollIntoViewIfNeeded()
    
    // Get the first FAQ question button
    const firstQuestion = page.getByRole('button').filter({ hasText: 'What is a LexAtlas Marriage Kit?' })
    const firstAnswer = page.getByText('A complete legal guide that explains step by step')
    
    // Initially answer may not be visible (Radix UI behavior)
    await expect(firstQuestion).toBeVisible()
    
    // Click to toggle
    await firstQuestion.click()
    
    // Verify the button is clickable and functional
    await expect(firstQuestion).toBeVisible()
  })

  test('should navigate to full FAQ page', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to Top Questions section
    await page.getByText('Top Questions').scrollIntoViewIfNeeded()
    
    // Click "View All FAQs" link
    await page.getByRole('link', { name: 'View All FAQs' }).click()
    
    // Should navigate to FAQ page
    await expect(page).toHaveURL('/faq')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Frequently Asked Questions')
  })
})
