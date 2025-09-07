import { test, expect } from '@playwright/test'

test.describe('@smoke Smoke checks', () => {
  test('@smoke home renders and has title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/LexAtlas/i)
  })

  test('@smoke kits renders and has at least one card', async ({ page }) => {
    await page.goto('/kits')
    const cards = page.locator('[data-testid="kit-card"], article, a[href^="/kits/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('@smoke robots has sitemap', async ({ page }) => {
    const res = await page.goto('/robots.txt')
    const body = await res!.text()
    expect(body).toMatch(/Sitemap:\s*https?:\/\/[^\s]+\/sitemap\.xml/i)
  })

  test('@smoke sitemap lists kits', async ({ page }) => {
    const res = await page.goto('/sitemap.xml')
    const body = await res!.text()
    expect(body).toMatch(/<loc>.*\/kits<\/loc>/)
  })
})


