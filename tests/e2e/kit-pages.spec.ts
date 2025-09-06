import { test, expect } from '@playwright/test'

test.describe('Individual Kit Pages', () => {
  test('should display France first with full country names', async ({
    page,
  }) => {
    await page.goto('/kits/fra-can')

    // Check that title shows France – Canada format
    await expect(page.locator('h1')).toContainText(
      'France – Canada Marriage Kit'
    )

    // Check meta title
    await expect(page).toHaveTitle(/France – Canada Marriage Kit/)
  })

  test('should show universal sample download link', async ({ page }) => {
    await page.goto('/kits/fra-usa')

    // Check that sample download button exists
    const sampleButton = page.getByRole('link', { name: /Sample/i })
    await expect(sampleButton).toBeVisible({ timeout: 10000 })

    // Check that it points to the global sample
    await expect(sampleButton).toHaveAttribute(
      'href',
      '/kits/samples/LEXATLAS-global-sample.pdf'
    )

    // Check that it opens in new tab
    await expect(sampleButton).toHaveAttribute('target', '_blank')
  })

  test('should display correct pricing in EUR', async ({ page }) => {
    await page.goto('/kits/fra-gbr')

    // Check that price shows 29 € in the purchase card
    await expect(page.locator('text=29 €').first()).toBeVisible()

    // Check that buy button shows correct text
    await expect(
      page.getByRole('button', { name: /Buy|Contact|Download/i })
    ).toBeVisible()

    // Verify price is only in the purchase card, not in the header
    const header = page.locator('h1').locator('..')
    await expect(header.locator('text=29 €')).not.toBeVisible()
  })

  test('should have working checkout form', async ({ page }) => {
    await page.goto('/kits/fra-deu')

    // Check that checkout form exists
    const actionForm = page.locator('form').first()
    await expect(actionForm).toBeVisible()

    // Check that slug is passed correctly
    const slugInput = page.locator('input[name="slug"]')
    await expect(slugInput).toHaveValue('fra-deu')
  })

  test('should show trust badges', async ({ page }) => {
    await page.goto('/kits/fra-esp')

    // Check that trust badges section exists (scroll to find it)
    await page
      .getByRole('region')
      .filter({ hasText: /Trust|Reasons|Why/i })
      .first()
      .scrollIntoViewIfNeeded()
    await expect(
      page
        .getByRole('region')
        .filter({ hasText: /Trust|Reasons|Why/i })
        .first()
    ).toBeVisible()
  })

  test('should handle invalid kit slugs', async ({ page }) => {
    await page.goto('/kits/invalid-slug')

    // Should show 404 page
    await expect(page.getByRole('heading')).toContainText(/(Not Found|404)/)
  })

  test('should display consistent France first format across all kits', async ({
    page,
  }) => {
    const testSlugs = ['fra-usa', 'fra-can', 'fra-gbr', 'fra-deu']

    for (const slug of testSlugs) {
      await page.goto(`/kits/${slug}`)

      // Check that title follows France first format
      const title = page.locator('h1')
      await expect(title).toContainText('France – ')
      await expect(title).toContainText('Marriage Kit')

      // Check that it shows full country names
      await expect(title).not.toContainText('FRA – ')
      await expect(title).not.toContainText('USA')
      await expect(title).not.toContainText('CAN')
    }
  })

  test('should have price only in purchase card, not in header', async ({
    page,
  }) => {
    await page.goto('/kits/fra-usa')

    // Check that price is visible in the purchase card (specifically the price display, not the button)
    const priceDisplay = page.locator(':text("€")')
    await expect(priceDisplay.first()).toBeVisible()

    // Check that price is NOT visible in the header section
    const headerSection = page.locator('h1').locator('..')
    await expect(headerSection.locator('text=29 €')).not.toBeVisible()

    // Check that "One-time payment • Lifetime access" is only in purchase card
    const purchaseCard = page
      .locator('text=Get Your Kit')
      .locator('..')
      .locator('..')
    await expect(
      purchaseCard.locator('text=One-time payment • Lifetime access')
    ).toBeVisible()
    await expect(
      headerSection.locator('text=One-time payment • Lifetime access')
    ).not.toBeVisible()
  })

  test('should have clean CTA buttons without prices', async ({ page }) => {
    await page.goto('/kits/fra-usa')

    // Check that Buy Now button doesn't contain price
    const primaryCta = page
      .getByRole('button')
      .filter({ hasText: /Buy|Contact|Download/i })
      .first()
    await expect(primaryCta).toBeVisible()

    // Check that the button text is exactly "Buy Now"
    await expect(buyNowButton).toHaveText('Buy Now')
  })
})
