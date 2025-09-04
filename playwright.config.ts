import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  snapshotDir: './tests/__screenshots__',
  expect: {
    toMatchSnapshot: { threshold: 0.2 },
  },
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    timezoneId: 'UTC',
    locale: 'en-US',
    permissions: [],
    animations: 'disabled',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  // Keep existing dev webServer for local DX; CI jobs start server explicitly
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'visual',
      grep: /@vr/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default defineConfig(config);
