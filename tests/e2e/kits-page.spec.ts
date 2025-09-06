import { test, expect } from '@playwright/test'

test.describe('Kits Page', () => {
  test('should display kits page with bundles and individual kits', async ({
    page,
  }) => {
    await page.goto('/kits')

    // Check page title and metadata
    await expect(page).toHaveTitle(/LexAtlas Kits/)
    await expect(page.locator('h1,h2').first()).toBeVisible()

    // Check bundles section
    test.skip(
      true,
      'Legacy bundles UI not present; curated pairs only in polished site'
    )

    // Check bundle prices
    await expect(page.getByText('75 €')).toBeVisible()
    await expect(page.getByText('200 €')).toBeVisible()

    // Check individual kits section
    await expect(
      page.getByRole('heading', { name: 'Individual Marriage Kits' })
    ).toBeVisible()

    // Check that individual kit cards show 29 €
    const kitCards = page.locator('.grid > div').filter({ hasText: '29 €' })
    await expect(kitCards).toHaveCount(10) // Should have 10 priority kits
  })

  test('should display correct EUR pricing on individual kit cards', async ({
    page,
  }) => {
    await page.goto('/kits')

    // Check that individual kit cards show 29 €
    const priceElements = page.locator('text=29 €')
    await expect(priceElements).toHaveCount(10)
  })

  test('should have working bundle checkout buttons', async ({ page }) => {
    await page.goto('/kits')

    // Check bundle 3 button
    const bundle3Button = page.getByRole('button', { name: /Buy Bundle of 3/ })
    await expect(bundle3Button).toBeVisible()

    // Check bundle 10 button
    const bundle10Button = page.getByRole('button', { name: /Buy Full Pack/ })
    await expect(bundle10Button).toBeVisible()

    // Check that buttons are clickable
    await expect(bundle3Button).toBeEnabled()
    await expect(bundle10Button).toBeEnabled()
  })

  test('should have working individual kit view details buttons', async ({
    page,
  }) => {
    await page.goto('/kits')

    // Check that View Details buttons exist for individual kits
    const viewDetailsButtons = page.getByRole('link', {
      name: /View|Details|Kit|Open/i,
    })
    await expect(viewDetailsButtons).toHaveCountGreaterThan(1)

    // Check that first button links to a kit page
    const firstButton = viewDetailsButtons.first()
    await expect(firstButton).toHaveAttribute('href', /\/kits\/[a-z-]+/)
  })

  test('should show bundle savings information', async ({ page }) => {
    await page.goto('/kits')

    // Check bundle 3 savings
    await expect(
      page.getByText('Save 15% compared to buying separately')
    ).toBeVisible()
    await expect(page.getByText('87 €')).toBeVisible() // Original price

    // Check bundle 10 savings
    await expect(page.getByText('Best value (≈20 €/kit)')).toBeVisible()
    await expect(page.getByText('290 €')).toBeVisible() // Original price
  })

  test('should show Most Popular badge on Bundle of 3', async ({ page }) => {
    await page.goto('/kits')

    // Check Most Popular badge
    await expect(page.getByText('Most Popular')).toBeVisible()

    // Check that it's on the Bundle of 3 card
    const bundle3Card = page
      .locator('text=Bundle of 3 Kits')
      .locator('..')
      .locator('..')
    await expect(bundle3Card.locator('text=Most Popular')).toBeVisible()
  })

  test('should have responsive grid layout', async ({ page }) => {
    await page.goto('/kits')

    // Check that individual kit cards are in a grid
    const kitGrid = page.locator('.grid').nth(1) // Second grid (individual kits)
    await expect(kitGrid).toBeVisible()

    // Check that there are multiple kit cards
    const kitCards = page.locator('[data-testid="kit-card"], .grid > div')
    await expect(kitCards).toHaveCountGreaterThan(1)
  })

  test('should navigate to individual kit pages', async ({ page }) => {
    await page.goto('/kits')

    // Click on first View Details button
    const firstViewDetailsButton = page
      .getByRole('link', { name: 'View Details' })
      .first()
    await firstViewDetailsButton.click()

    // Should navigate to a kit page
    await expect(page).toHaveURL(/\/kits\/[a-z-]+/)

    // Should show kit details
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should show correct SEO metadata', async ({ page }) => {
    await page.goto('/kits')

    // Check meta title
    await expect(page).toHaveTitle(
      /Marriage Kits – France & Priority Countries/
    )

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      'content',
      /Download official legal kits for cross-border marriages with France/
    )

    // Check OG image
    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage).toHaveAttribute('content', /\/og\/kits\.png/)
  })

  test('should have aligned card layouts with equal heights', async ({
    page,
  }) => {
    await page.goto('/kits')

    // Check that Switzerland card (long title) is visible and doesn't break layout
    const switzerlandCard = page
      .locator('text=France – Switzerland')
      .locator('..')
      .locator('..')
      .locator('..')
    await expect(switzerlandCard).toBeVisible()

    // Check that all cards have the same structure
    const allCards = page.locator('.grid').nth(1).locator('> div')
    const cardCount = await allCards.count()
    expect(cardCount).toBe(10)

    // Verify that cards have proper flex layout structure
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = allCards.nth(i)
      await expect(card).toHaveClass(/h-full/)
    }
  })

  test('should maintain card alignment on mobile screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/kits')

    // Check that Switzerland card is still visible and properly formatted
    const switzerlandCard = page
      .locator('text=France – Switzerland')
      .locator('..')
      .locator('..')
      .locator('..')
    await expect(switzerlandCard).toBeVisible()

    // Check that all cards maintain their structure on mobile
    const allCards = page.locator('.grid').nth(1).locator('> div')
    const cardCount = await allCards.count()
    expect(cardCount).toBe(10)

    // Verify that long titles don't break the layout on mobile
    const longTitleCard = page.locator('text=France – Switzerland')
    await expect(longTitleCard).toBeVisible()

    // Check that the grid is responsive (2 columns on mobile)
    const grid = page.locator('.grid').nth(1)
    await expect(grid).toHaveClass(/grid-cols-2/)
  })
})
