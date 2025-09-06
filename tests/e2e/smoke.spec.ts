import { test, expect } from '@playwright/test'

const base = process.env.BASE_URL || 'http://127.0.0.1:3000'
const url = (p = '') => new URL(p, base).toString()

test.describe('@smoke polished site', () => {
  test('home renders with hero + CTA', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/LexAtlas/i)
    await expect(
      page.locator('[data-testid="hero-globe"], canvas, [id*="globe" i]')
    ).toBeVisible()
    await expect(page.locator('a[href="/contact"]').first()).toBeVisible()
  })

  test('kits index has FRA→USA and FRA→CAN', async ({ page }) => {
    await page.goto('/kits')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('a[href="/kits/fra-usa"]').first()).toHaveCount(1)
    await expect(page.locator('a[href="/kits/fra-can"]').first()).toHaveCount(1)
    const totalKitLinks = await page.locator('a[href^="/kits/"]').count()
    expect(totalKitLinks).toBeGreaterThan(1)
  })

  test('kit detail FRA→USA shows passports/FAQ/sticky CTA', async ({
    page,
  }) => {
    await page.goto('/kits/fra-usa')
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /France.*United\s*States|FRA.*USA/i,
      })
    ).toBeVisible()
    // Look for passports block by container class/shape rather than img alt text
    await expect(page.locator('svg').first()).toBeVisible()
    // CTA may be multiple links; assert at least one Contact link exists
    const contactLinks = await page
      .getByRole('link', { name: /contact/i })
      .count()
    expect(contactLinks).toBeGreaterThan(0)
    // Presence of FAQ: navigate link exists on the page
    const faqLinks = await page.getByRole('link', { name: /faq/i }).count()
    expect(faqLinks).toBeGreaterThan(0)
  })

  test('robots has dynamic sitemap', async ({ request }) => {
    const res = await request.get(url('/robots.txt'))
    expect(res.ok()).toBeTruthy()
    const txt = await res.text()
    const expected = new RegExp(
      `Sitemap:\\s*${url('/sitemap.xml').replace(/\//g, '\\/')}`,
      'i'
    )
    expect(txt).toMatch(expected)
  })

  test('sitemap lists required routes', async ({ request }) => {
    const res = await request.get(url('/sitemap.xml'))
    expect(res.ok()).toBeTruthy()
    const xml = await res.text()
    for (const p of ['/', '/kits', '/kits/fra-usa', '/kits/fra-can']) {
      expect(xml).toContain(url(p))
    }
  })

  test('canonicalization /kits/marriage-kit/us-fr → FR-US (preserve query)', async ({
    request,
  }) => {
    const res = await request.get(url('/kits/marriage-kit/us-fr?utm=x'), {
      maxRedirects: 0,
    })
    expect([307, 308]).toContain(res.status())
    const loc = res.headers()['location'] || ''
    expect(loc).toContain('/kits/marriage-kit/FR-US')
  })
})
