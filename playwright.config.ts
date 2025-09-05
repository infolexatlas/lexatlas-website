import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Keep Playwright defaults for snapshot paths (no snapshotPathTemplate)
  testDir: './',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  use: {
    browserName: 'chromium',
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
    timezoneId: 'UTC',
    locale: 'en-US',
    viewport: { width: 1280, height: 800 },
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
    launchOptions: { args: ['--disable-dev-shm-usage'] },
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
    },
  },
};

export default config;
