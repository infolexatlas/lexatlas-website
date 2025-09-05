import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  snapshotDir: './tests/__screenshots__',
  expect: {
    toMatchSnapshot: { threshold: 0.2 },
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFileName}-snapshots/{arg}.png',
  },
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    timezoneId: 'UTC',
    geolocation: undefined,
    locale: 'en-US',
    colorScheme: 'light',
    permissions: [],
    screenshot: 'only-on-failure',
    video: 'off',
  },
  // Keep existing dev webServer for local DX; CI jobs start server explicitly
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', headless: true, ...devices['Desktop Chrome'] } },
  ],
};

export default defineConfig(config);
