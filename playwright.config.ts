import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3000',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1366, height: 900 },
    ignoreHTTPSErrors: true,
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
    },
  },
});
