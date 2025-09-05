import { test, expect } from '@playwright/test';

const VR_ENABLED = process.env.PLAYWRIGHT_VR === '1' && !process.env.CI;

test.describe(VR_ENABLED ? 'Visual regression' : test.skip('VR disabled on CI'), () => {
  test('home @vr', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() =>
      document
        .querySelector('[data-test="cookie-close"]')
        ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    );
    await expect(page).toHaveScreenshot('home-full.png', { fullPage: true });
  });

  test('kits fra-usa @vr', async ({ page }) => {
    await page.goto('/kits/fra-usa');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('kits-fra-usa-full.png', { fullPage: true });
  });

  test('kits fra-can @vr', async ({ page }) => {
    await page.goto('/kits/fra-can');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('kits-fra-can-full.png', { fullPage: true });
  });
});


