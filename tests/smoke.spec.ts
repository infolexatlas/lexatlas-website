import { test, expect } from '@playwright/test'

const base = process.env.BASE_URL || 'http://127.0.0.1:3000'
const url = (p = '') => new URL(p, base).toString()

test.describe('@smoke basic', () => {
  test('home renders', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/LexAtlas|Kits|Marriage/i)
  })

  test('robots and sitemap', async ({ request }) => {
    const robots = await request.get(url('/robots.txt'))
    expect(robots.ok()).toBeTruthy()
    const txt = await robots.text()
    expect(txt).toMatch(/Sitemap:\s*.+\/sitemap\.xml/i)

    const sm = await request.get(url('/sitemap.xml'))
    expect(sm.ok()).toBeTruthy()
    const xml = await sm.text()
    expect(xml).toContain(url('/'))
    expect(xml).toContain(url('/kits'))
  })
})


