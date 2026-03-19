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
  // Espera primeiro o título da área logada e, em seguida, o botão de logout.
  // Isso reduz flakiness quando o "logout" demora para renderizar após a navegação.
  await expect(page.locator(objects.sessao.homeHeading)).toContainText(
    /Serverest Store|Bem Vindo/i,
    { timeout: 20000 }
  );
  await expect(page.locator(objects.sessao.logoutButton)).toBeVisible({
    timeout: 20000,
  });
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
