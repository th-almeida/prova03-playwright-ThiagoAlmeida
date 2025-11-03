import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'src/scenarios',
  timeout: 60000,
  retries: 0,
  use: {
    trace: 'on',
    locale: 'pt-BR',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'off',
    actionTimeout: 15000,
    navigationTimeout: 30000
  },
  expect: {
    timeout: 15000
  },
  reporter: [
    [
      'html',
      {
        outputFolder: 'artifacts/report',
        open: 'never'
      }
    ]
  ]
};
export default config;
