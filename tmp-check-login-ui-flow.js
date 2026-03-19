const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const email = `tmploginflow.${Date.now()}.${Math.random().toString(16).slice(2)}@usuario.com`;
  const senha = "teste123";

  // 1) Cadastro
  await page.goto("https://front.serverest.dev/cadastrarusuarios", {
    waitUntil: "domcontentloaded",
  });
  await page.locator('[data-testid="nome"]').fill("tmp login flow");
  await page.locator('[data-testid="email"]').fill(email);
  await page.locator('[data-testid="password"]').fill(senha);
  // admin checkbox (administrador)
  await page.locator('[data-testid="checkbox"]').check();
  await page.locator('[data-testid="cadastrar"]').click();

  // Aguarda sucesso ou login
  await page.waitForTimeout(2000).catch(() => {});

  // 2) Login
  await page.goto("https://front.serverest.dev/login", {
    waitUntil: "domcontentloaded",
  });
  await page.locator('[data-testid="email"]').fill(email);
  await page.locator('[data-testid="senha"]').fill(senha);
  await page.locator('[data-testid="entrar"]').click();

  // Verifica logout
  let logoutVisible = false;
  try {
    await page.locator('[data-testid="logout"]').waitFor({
      state: "visible",
      timeout: 15000,
    });
    logoutVisible = true;
  } catch {}

  const url = page.url();
  const h1 = await page.locator("h1").first().textContent().catch(() => null);
  console.log({ email, logoutVisible, url, h1 });

  await browser.close();
})();

