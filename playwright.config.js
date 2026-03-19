// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const { defineBddConfig } = require("playwright-bdd");

defineBddConfig({
  paths: ["tests/features/**/*.feature"],
  steps: ["tests/steps/**/*.steps.js"],
  require: ["tests/steps/**/*.steps.js"],
  outputDir: "tests/specs-gen",
});

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: ["specs/**/*.spec.js"],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: {
    baseURL: "https://front.serverest.dev",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

