const { test } = require("@playwright/test");
const { testData, buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
  validarErroEmailExistente,
  validarPermaneceEmCadastro,
} = require("../utils/cadastro-flow");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("../utils/sessao-flow");

test.describe("Cadastro, login e logout", () => {
  test("Cadastro com sucesso", async ({ page }, testInfo) => {
    await abrirPaginaCadastro(page);
    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email: buildUniqueEmail("spec-cadastro"),
      senha: testData.usuarioValido.senha,
      aceitarTermos: true,
    });
    await validarBoasVindas(page, testData.usuarioValido.nome);
    await page.screenshot({
      path: testInfo.outputPath("spec-cadastro-sucesso.png"),
      fullPage: true,
    });
  });

  test("Cadastro com email ja existente", async ({ page }, testInfo) => {
    await abrirPaginaCadastro(page);
    await preencherCadastro(page, {
      nome: testData.usuarioExistente.nome,
      email: testData.usuarioExistente.email,
      senha: testData.usuarioExistente.senha,
      aceitarTermos: true,
    });
    await validarErroEmailExistente(page);
    await page.screenshot({
      path: testInfo.outputPath("spec-cadastro-email-existente.png"),
      fullPage: true,
    });
  });

  test("Cadastro sem aceitar termos", async ({ page }, testInfo) => {
    await abrirPaginaCadastro(page);
    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email: buildUniqueEmail("spec-sem-termos"),
      senha: testData.usuarioValido.senha,
      aceitarTermos: false,
    });
    await validarPermaneceEmCadastro(page);
    await page.screenshot({
      path: testInfo.outputPath("spec-cadastro-sem-termos.png"),
      fullPage: true,
    });
  });

  test("Login e logout com sucesso", async ({ page }, testInfo) => {
    await abrirPaginaLogin(page);
    await realizarLogin(page, {
      email: testData.loginValido.email,
      senha: testData.loginValido.senha,
    });
    await validarLoginComSucesso(page);
    await page.screenshot({
      path: testInfo.outputPath("spec-login-sucesso.png"),
      fullPage: true,
    });
    await realizarLogout(page);
    await validarRedirecionamentoParaLogin(page);
    await page.screenshot({
      path: testInfo.outputPath("spec-logout-sucesso.png"),
      fullPage: true,
    });
  });
});
