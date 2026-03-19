const { expect } = require("@playwright/test");
const { objects } = require("./objects");

async function abrirPaginaCadastro(page) {
  await page.goto("/cadastrarusuarios");
  await expect(page.locator(objects.cadastro.nomeInput)).toBeVisible();
}

async function preencherCadastro(page, { nome, email, senha, aceitarTermos = true }) {
  await page.locator(objects.cadastro.nomeInput).fill(nome);
  await page.locator(objects.cadastro.emailInput).fill(email);
  await page.locator(objects.cadastro.senhaInput).fill(senha);
  if (aceitarTermos) {
    await page.locator(objects.cadastro.termosCheckbox).check();
  }
  await page.locator(objects.cadastro.cadastrarButton).click();
}

async function validarBoasVindas(page, nome) {
  await expect(page.locator(objects.cadastro.tituloPagina)).toContainText(
    `Bem Vindo ${nome}`
  );
}

async function validarErroEmailExistente(page) {
  await expect(page.locator(objects.cadastro.alertaErro)).toBeVisible();
  await expect(page.locator(objects.cadastro.alertaErro)).toContainText(
    /email|e-mail|utilizado|existe|usado|cadastrado/i
  );
}

async function validarPermaneceEmCadastro(page) {
  await expect(page).toHaveURL(/\/cadastrarusuarios/);
  await expect(page.locator(objects.cadastro.nomeInput)).toBeVisible();
}

module.exports = {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
  validarErroEmailExistente,
  validarPermaneceEmCadastro,
};
