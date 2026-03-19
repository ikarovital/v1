// @ts-check
const path = require("node:path");
const { defineConfig, devices } = require("@playwright/test");
const { defineBddConfig } = require("playwright-bdd");

/**
 * O playwright-bdd registra a config pela pasta de saída (outputDir).
 * project.testDir precisa ser exatamente esse caminho — senão ocorre:
 * "BDD config not found for testDir: .../tests"
 */
const bddTestDir = defineBddConfig({
  paths: ["tests/features/**/*.feature"],
  steps: ["tests/steps/**/*.steps.js"],
  require: ["tests/steps/**/*.steps.js"],
  outputDir: "tests/specs",
});

const sharedUse = {
  baseURL: "https://front.serverest.dev",
  trace: "on-first-retry",
  screenshot: "only-on-failure",
  video: "retain-on-failure",
};

module.exports = defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: sharedUse,
  projects: [
    {
      name: "bdd",
      testDir: bddTestDir,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
