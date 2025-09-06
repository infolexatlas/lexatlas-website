import { test, expect } from '@playwright/test'
const BASE = process.env.BASE_URL || 'http://localhost:3000'
const url = (p: string) => (p.startsWith('http') ? p : `${BASE}${p.startsWith('/') ? '' : '/'}${p}`)

// Smoke 1: Home loads and body is visible
test('home renders without errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.goto(url('/'))
  await expect(page.locator('body')).toBeVisible()
  expect(errors).toHaveLength(0)
})

// Smoke 2: 404 page renders for unknown route
test('unknown route shows 404 page', async ({ page }) => {
  await page.goto(url('/this-route-should-not-exist'))
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
})

// Smoke 3: title is set on home (basic SEO check)
test('home has a non-empty page title', async ({ page }) => {
  await page.goto(url('/'))
  const title = await page.title()
  expect(title).not.toEqual('')
})
