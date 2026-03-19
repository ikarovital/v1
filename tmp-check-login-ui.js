const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  async function registerAndLogin({ aceitarTermos }, label) {
    const email = `tmplogin.${Date.now()}.${Math.random().toString(16).slice(2)}@usuario.com`;
    const senha = "teste123";
    await page.goto("https://front.serverest.dev/cadastrarusuarios", { waitUntil: "domcontentloaded" });
    await page.locator('[data-testid="nome"]').fill("tmp user");
    await page.locator('[data-testid="email"]').fill(email);
    await page.locator('[data-testid="password"]').fill(senha);

    if (aceitarTermos) {
      await page.locator('[data-testid="checkbox"]').check();
    } else {
      // importante: NÃO desmarcar aqui (simula nosso helper)
    }

    await page.locator('[data-testid="cadastrar"]').click();
    await page.waitForSelector('[data-testid="logout"]', { timeout: 30000 });
    await page.locator('[data-testid="logout"]').click();
    await page.waitForSelector("h1", { timeout: 30000 });

    // tenta login
    await page.goto("https://front.serverest.dev/login", { waitUntil: "domcontentloaded" });
    await page.locator('[data-testid="email"]').fill(email);
    await page.locator('[data-testid="senha"]').fill(senha);
    await page.locator('[data-testid="entrar"]').click();

    const logoutVisible = await page.locator('[data-testid="logout"]').isVisible().catch(() => false);
    const h1 = await page.locator("h1").first().textContent().catch(() => null);
    console.log(label, { logoutVisible, h1 });
  }

  await registerAndLogin({ aceitarTermos: true }, "aceitarTermos=true");
  await registerAndLogin({ aceitarTermos: false }, "aceitarTermos=false (sem uncheck)");

  await browser.close();
})();

