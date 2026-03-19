const { test } = require("@playwright/test");
const { testData, buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
  realizarLogout,
  validarErroEmailExistente,
  validarPermaneceEmCadastro,
} = require("../utils/cadastro-flow");

test.describe("Cadastro e logout", () => {
  test("Cadastro com sucesso e logout", async ({ page }, testInfo) => {
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
    await realizarLogout(page);
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
});
