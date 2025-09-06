import { test, expect } from '@playwright/test'

const base = process.env.BASE_URL || 'http://127.0.0.1:3000'
const prod = process.env.NEXT_PUBLIC_BASE_URL || ''
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
    const expectedRoot = (prod || base).replace(/\/$/, '')
    expect(xml).toContain(`${expectedRoot}/`)
    expect(xml).toContain(`${expectedRoot}/kits`)
  })
})


