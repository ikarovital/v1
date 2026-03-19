const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  async function run(aceitarTermos, label) {
    const email = `tmp.${Date.now()}.${Math.random().toString(16).slice(2)}@usuario.com`;
    await page.goto("https://front.serverest.dev/cadastrarusuarios", { waitUntil: "domcontentloaded" });
    await page.locator('[data-testid="nome"]').fill("tmp user");
    await page.locator('[data-testid="email"]').fill(email);
    await page.locator('[data-testid="password"]').fill("teste123");
    if (aceitarTermos) {
      await page.locator('[data-testid="checkbox"]').check();
    } else {
      await page.locator('[data-testid="checkbox"]').uncheck().catch(() => {});
    }
    await page.locator('[data-testid="cadastrar"]').click();
    await page.waitForLoadState("domcontentloaded").catch(()=>{});

    const h1 = await page.locator("h1").first().textContent().catch(()=>null);
    const logoutVisible = await page.locator('[data-testid="logout"]').isVisible().catch(()=>false);
    const url = page.url();
    console.log(label, { url, h1, logoutVisible });
  }

  await run(true, "aceitarTermos=true");
  await run(false, "aceitarTermos=false");

  await browser.close();
})();

