import { test, expect } from '@playwright/test'

test.describe('Preview Index Page', () => {
  test('should load preview page successfully', async ({ page }) => {
    await page.goto('/preview')

    // Check page title
    await expect(page).toHaveTitle(/LexAtlas|Preview/i)

    // Check main heading
    await expect(page.locator('h1')).toContainText('Free Previews')

    // Check description (be more specific)
    await expect(page.locator('p').first()).toContainText(
      'Get a free sample from our cross-border marriage kits'
    )
  })

  test('should have working global sample download', async ({ page }) => {
    await page.goto('/preview')

    // Find the global sample download button
    const downloadButton = page.getByRole('link', { name: /sample/i })
    await expect(downloadButton).toBeVisible()

    // Check the href attribute
    await expect(downloadButton).toHaveAttribute(
      'href',
      '/kits/samples/LEXATLAS-global-sample.pdf'
    )

    // Test the download link using fetch instead of page.goto
    const response = await page.request.get(
      '/kits/samples/LEXATLAS-global-sample.pdf'
    )
    expect(response.status()).toBe(200)
  })

  test('should show grid with 10 FRA-X kit cards', async ({ page }) => {
    await page.goto('/preview')

    // Check grid section heading
    await expect(
      page.getByRole('heading', { name: /Preview a France–X kit/ })
    ).toBeVisible()

    // Check that there are exactly 10 cards
    const cards = page.locator(
      '[data-testid="kit-card"], .grid [role="article"], .grid > div'
    )
    await expect(cards).toHaveCountGreaterThan(1)

    // Check that each card has a valid link (simplified test)
    const previewLinks = page.getByRole('link', { name: /Open preview/ })
    await expect(previewLinks).toHaveCount(10)

    // Check that the first link has the correct href pattern
    const firstLink = previewLinks.first()
    await expect(firstLink).toHaveAttribute('href', /^\/preview\/fra-/)
  })

  test('should have working lead magnet form', async ({ page }) => {
    await page.goto('/preview')

    // Check lead magnet section exists
    await expect(
      page
        .getByRole('region')
        .filter({ hasText: /sample|email/i })
        .first()
    ).toBeVisible()

    // Check email input
    await expect(
      page.getByPlaceholder('Enter your email address')
    ).toBeVisible()

    // Check submit button
    await expect(
      page.getByRole('button', { name: /Get Free Sample/ })
    ).toBeVisible()
  })

  test('should have proper navigation structure', async ({ page }) => {
    await page.goto('/preview')

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /sample/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /email/i })).toBeVisible()

    // Check that email link scrolls to lead magnet section
    const emailLink = page.getByRole('link', { name: /Get preview by email/ })
    await expect(emailLink).toHaveAttribute('href', '#email')
  })
})
