const { expect } = require("@playwright/test");
const { objects } = require("./objects");

async function abrirPaginaLogin(page) {
  await page.goto("/login");
  await expect(page.locator(objects.sessao.loginHeading)).toContainText("Login");
}

async function realizarLogin(page, { email, senha }) {
  await page.locator(objects.sessao.emailInput).fill(email);
  await page.locator(objects.sessao.senhaInput).fill(senha);
  await page.locator(objects.sessao.entrarButton).click();
}

async function validarLoginComSucesso(page) {
  // Espera o logout aparecer primeiro (somente após autenticar).
  await expect(page.locator(objects.sessao.logoutButton)).toBeVisible({
    timeout: 30000,
  });

  // Depois valida o título da home (o texto pode variar).
  await expect(page.locator(objects.sessao.homeHeading)).toContainText(
    /Serverest Store|Bem Vindo/i,
    { timeout: 30000 }
  );
}

async function realizarLogout(page) {
  await expect(page.locator(objects.sessao.logoutButton)).toBeVisible();
  await page.locator(objects.sessao.logoutButton).click();
}

async function validarRedirecionamentoParaLogin(page) {
  await expect(page.locator(objects.sessao.loginHeading)).toContainText("Login");
}

module.exports = {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
  realizarLogout,
  validarRedirecionamentoParaLogin,
};
