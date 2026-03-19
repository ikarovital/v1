const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  async function run({ admin }) {
    const email = `tmp.${Date.now()}.${Math.random().toString(16).slice(2)}@usuario.com`;
    const senha = "teste123";
    await page.goto("https://front.serverest.dev/cadastrarusuarios", {
      waitUntil: "domcontentloaded",
    });

    await page.locator('[data-testid="nome"]').fill("tmp user");
    await page.locator('[data-testid="email"]').fill(email);
    await page.locator('[data-testid="password"]').fill(senha);

    const cb = page.locator('[data-testid="checkbox"]');
    if (admin) {
      await cb.check();
    } else {
      await cb.uncheck().catch(() => {});
    }

    await page.locator('[data-testid="cadastrar"]').click();

    // Aguarda no máximo 15s o estado pós-cadastro
    await page.waitForTimeout(1000).catch(() => {});
    const logoutLocator = page.locator('[data-testid="logout"]');
    let logoutVisible = false;
    try {
      await logoutLocator.waitFor({ state: "visible", timeout: 15000 });
      logoutVisible = true;
    } catch {}

    const url = page.url();
    const h1 = await page.locator("h1").first().textContent().catch(() => null);
    const alertText = await page
      .locator(".alert, [role='alert']")
      .first()
      .textContent()
      .catch(() => "");

    console.log({ admin, url, h1, logoutVisible, alertText: alertText.trim().slice(0, 80) });
  }

  await run({ admin: true });
  await run({ admin: false });

  await browser.close();
})();

