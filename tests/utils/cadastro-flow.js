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
  // Espera o estado pós-cadastro (usuário logado) antes de validar o texto do título.
  // Isso reduz flakiness quando a renderização do h1 atrasa.
  await expect(page.getByTestId("logout")).toBeVisible({
    timeout: 15000,
  });
  await expect(page.locator(objects.cadastro.tituloPagina)).toContainText(
    `Bem Vindo ${nome}`,
    { timeout: 15000 }
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

async function validarCadastroAposEnvio(page) {
  // O ServeRest pode (dependendo do perfil/estado) ou:
  // 1) logar automaticamente (logout visível)
  // 2) apenas mostrar mensagem de cadastro com sucesso
  const logout = page.getByTestId("logout");
  const logoutVisible = await logout.isVisible().catch(() => false);

  if (logoutVisible) {
    await expect(page).toHaveURL(/\/(admin\/home|home)/, { timeout: 30000 });
    await expect(page.locator(objects.sessao.homeHeading).first()).toContainText(
      /Serverest Store|Bem Vindo/i,
      { timeout: 30000 }
    );
    return;
  }

  // Caso não logue automaticamente, validamos a confirmação de cadastro.
  await expect(page.locator(objects.cadastro.alertaErro)).toContainText(
    /Cadastro realizado com sucesso/i,
    { timeout: 30000 }
  );
}

module.exports = {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
  validarErroEmailExistente,
  validarPermaneceEmCadastro,
  validarCadastroAposEnvio,
};
