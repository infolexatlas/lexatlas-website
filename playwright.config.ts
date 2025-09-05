import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  expect: {
    // Keep default snapshot paths; do NOT set snapshotPathTemplate.
    toMatchSnapshot: { threshold: 0.2 },
    toHaveScreenshot: {
      // stable screenshots
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    timezoneId: 'UTC',
    locale: 'en-US',
    colorScheme: 'light',
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [['list']],
});
