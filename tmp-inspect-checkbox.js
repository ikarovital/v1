const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://front.serverest.dev/cadastrarusuarios", {
    waitUntil: "domcontentloaded",
  });

  const el = page.locator('[data-testid="checkbox"]').first();
  const outer = await el.evaluate((node) => node.outerHTML);

  const labelText = await el.evaluate((node) => {
    const root = node.closest("label") || node.parentElement;
    return (root && root.innerText ? root.innerText : "").trim();
  });

  const aria = await el.getAttribute("aria-label");

  console.log({ outer, labelText, aria });

  await browser.close();
})();

