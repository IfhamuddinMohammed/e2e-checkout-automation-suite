const { defineConfig, devices } = require('@playwright/test');

const ENV = process.env.ENV || "dev";    // Read from Jenkins parameter

// Environment URLs
const envConfig = {
  dev: "https://www.saucedemo.com",
  qa: "https://qa.saucedemo.com",
  uat: "https://uat.saucedemo.com"
};

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30000,

  retries: 1,                     // retry failed tests once
  workers: 3,                     // parallel execution

  reporter: [
    ['list'],
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    // ['allure-playwright']      // (optional if you want Allure)
  ],

  use: {
    baseURL: envConfig[ENV],      // URL changes based on Jenkins parameter
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  // PROJECTS → run same tests on Chromium / Firefox / WebKit
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
