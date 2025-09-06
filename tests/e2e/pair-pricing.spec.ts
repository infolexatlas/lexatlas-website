import { test, expect } from '@playwright/test'

test.describe('Pair Pages Pricing', () => {
  test('should render pair page with default pricing for unknown pair', async ({
    page,
  }) => {
    // Test with a pair that doesn't have specific pricing
    await page.goto('/kits/marriage-kit/XX-YY')

    // Page should load without crashing
    await expect(page.getByRole('heading')).toBeVisible()

    // Should show default price
    await expect(page.locator('text=Starting at $249')).toBeVisible()

    // Should show the fallback note
    await expect(
      page.locator('text=Final price may vary by pair')
    ).toBeVisible()

    // Price buttons should be functional
    await expect(
      page.locator('button:has-text("Buy Single Kit")')
    ).toBeVisible()
    await expect(page.locator('button:has-text("Buy Bundle")')).toBeVisible()
  })

  test('should render pair page with specific pricing for known pair', async ({
    page,
  }) => {
    // Test with a pair that has specific pricing
    await page.goto('/kits/marriage-kit/FR-US')

    // Page should load without crashing
    await expect(page.getByRole('heading')).toContainText(
      /France|United States|USA/i
    )

    // Should show specific price
    await expect(page.locator('text=$299')).toBeVisible()

    // Should not show the fallback note
    await expect(
      page.locator('text=Final price may vary by pair')
    ).not.toBeVisible()

    // Should show "One-time purchase" instead of "Starting at"
    await expect(page.locator('text=One-time purchase')).toBeVisible()
  })

  test('should handle checkout with default pricing', async ({ page }) => {
    await page.goto('/kits/marriage-kit/XX-YY')

    // Click on single kit button
    await page
      .getByRole('button')
      .filter({ hasText: /Buy|Contact|Download/i })
      .first()
      .click()

    // Should redirect to Stripe checkout (or show loading state)
    // Note: In test environment, this might show an error or loading state
    // The important thing is that it doesn't crash
    await expect(page.locator('text=Processing...')).toBeVisible()
  })

  test('should handle checkout with specific pricing', async ({ page }) => {
    await page.goto('/kits/marriage-kit/FR-US')

    // Click on single kit button
    await page
      .getByRole('button')
      .filter({ hasText: /Buy|Contact|Download/i })
      .first()
      .click()

    // Should redirect to Stripe checkout (or show loading state)
    await expect(page.locator('text=Processing...')).toBeVisible()
  })

  test('should display correct country names in title and content', async ({
    page,
  }) => {
    await page.goto('/kits/marriage-kit/FR-JP')

    // Should show correct country names
    await expect(page.getByRole('heading')).toContainText(/France|Japan/i)

    // Should show correct price for FR-JP
    await expect(page.locator('text=$349')).toBeVisible()
  })

  test('should handle invalid pair gracefully', async ({ page }) => {
    // Test with an invalid pair format
    await page.goto('/kits/marriage-kit/INVALID-PAIR')

    // Should show 404 or handle gracefully
    // The page should either redirect to 404 or show some error handling
    const title = await page.title()
    expect(title).toMatch(/Not Found|Country Pair Not Found|LexAtlas/)
  })
})
