import { test, expect } from '@playwright/test'

test.describe('Pricing Page', () => {
  test('should display three pricing tiers with EUR prices', async ({ page }) => {
    await page.goto('/pricing')
    
    // Check page title
    await expect(page).toHaveTitle(/Pricing/)
    
    // Check three pricing cards exist
    const cards = page.locator('[data-testid="pricing-card"]')
    await expect(cards).toHaveCount(3)
    
    // Check EUR prices are displayed
    await expect(page.getByText('29 €')).toBeVisible()
    await expect(page.getByText('75 €')).toBeVisible()
    await expect(page.getByText('200 €')).toBeVisible()
    
    // Check tier names
    await expect(page.getByText('Single Kit')).toBeVisible()
    await expect(page.getByText('Bundle of 3')).toBeVisible()
    await expect(page.getByText('Full Pack')).toBeVisible()
  })

  test('should open single kit selection dialog', async ({ page }) => {
    await page.goto('/pricing')
    
    // Click on single kit button
    await page.getByRole('button', { name: 'Choose Country Pair' }).click()
    
    // Check dialog opens
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText('Select Country Pair')).toBeVisible()
    
    // Check country options are available
    await expect(page.getByText('France – United States')).toBeVisible()
    await expect(page.getByText('France – United Kingdom')).toBeVisible()
  })

  test('should open bundle of 3 selection dialog', async ({ page }) => {
    await page.goto('/pricing')
    
    // Click on bundle of 3 button
    await page.getByRole('button', { name: 'Choose 3 Pairs' }).click()
    
    // Check dialog opens
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByText('Select 3 Country Pairs')).toBeVisible()
    
    // Check checkboxes are available
    const checkboxes = page.locator('input[type="checkbox"]')
    await expect(checkboxes).toHaveCount(10) // All priority slugs
  })

  test('should allow bundle of 3 selection', async ({ page }) => {
    await page.goto('/pricing')
    
    // Click on bundle of 3 button
    await page.getByRole('button', { name: 'Choose 3 Pairs' }).click()
    
    // Select exactly 3 items
    await page.getByLabel('France – United States').check()
    await page.getByLabel('France – United Kingdom').check()
    await page.getByLabel('France – Canada').check()
    
    // Check buy button is enabled
    await expect(page.getByRole('button', { name: 'Buy Bundle – 75 €' })).toBeEnabled()
  })

  test('should disable bundle of 3 with wrong count', async ({ page }) => {
    await page.goto('/pricing')
    
    // Click on bundle of 3 button
    await page.getByRole('button', { name: 'Choose 3 Pairs' }).click()
    
    // Select only 2 items
    await page.getByLabel('France – United States').check()
    await page.getByLabel('France – United Kingdom').check()
    
    // Check buy button is disabled
    await expect(page.getByRole('button', { name: 'Buy Bundle – 75 €' })).toBeDisabled()
  })

  test('should have direct purchase for full pack', async ({ page }) => {
    await page.goto('/pricing')
    
    // Check full pack button exists and is enabled
    const fullPackButton = page.getByRole('button', { name: 'Get Full Pack – 200 €' })
    await expect(fullPackButton).toBeVisible()
    await expect(fullPackButton).toBeEnabled()
  })

  test('should show savings percentages', async ({ page }) => {
    await page.goto('/pricing')
    
    // Check savings are displayed
    await expect(page.getByText(/Save \d+%/)).toBeVisible()
  })
})
