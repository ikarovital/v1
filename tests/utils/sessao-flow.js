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
  // 1) Garante que o usuário está logado (logout visível).
  await expect(page.getByTestId("logout")).toBeVisible({ timeout: 30000 });

  // 2) Garante que já navegou para a home pós-login.
  await expect(page).toHaveURL(/\/(admin\/home|home)/, { timeout: 30000 });

  // 3) Só então valida o título da home (pode variar).
  await expect(page.locator(objects.sessao.homeHeading).first()).toContainText(
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
