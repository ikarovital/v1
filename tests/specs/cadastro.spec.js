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
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("../utils/sessao-flow");

async function snapshot(page, testInfo, name) {
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: true,
  });
}

test.describe("Cadastro", () => {
  test("Cadastro com sucesso e logout", async ({ page }, testInfo) => {
    await abrirPaginaCadastro(page);
    await snapshot(page, testInfo, "spec-cadastro-aberto.png");

    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email: buildUniqueEmail("spec-cadastro"),
      senha: testData.usuarioValido.senha,
      aceitarTermos: true,
    });

    await validarBoasVindas(page, testData.usuarioValido.nome);
    await snapshot(page, testInfo, "spec-cadastro-validado.png");

    await realizarLogout(page);
    await validarRedirecionamentoParaLogin(page);
    await snapshot(page, testInfo, "spec-cadastro-reaprovacao-logout.png");
  });

  test("Cadastro com email ja existente", async ({ page, request }, testInfo) => {
    const emailExistente = buildUniqueEmail("spec-existente");

    // Garante determinismo criando o usuario via API antes de tentar cadastrar na UI
    await request.post("https://serverest.dev/usuarios", {
      data: {
        nome: testData.usuarioExistente.nome,
        email: emailExistente,
        password: testData.usuarioExistente.senha,
        administrador: "false",
      },
    });

    await abrirPaginaCadastro(page);
    await snapshot(page, testInfo, "spec-existente-aberto.png");

    await preencherCadastro(page, {
      nome: testData.usuarioExistente.nome,
      email: emailExistente,
      senha: testData.usuarioExistente.senha,
      aceitarTermos: true,
    });

    await validarErroEmailExistente(page);
    await snapshot(page, testInfo, "spec-existente-erro-validado.png");
  });

  test("Cadastro sem aceitar termos", async ({ page }, testInfo) => {
    await abrirPaginaCadastro(page);
    await snapshot(page, testInfo, "spec-sem-termos-aberto.png");

    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email: buildUniqueEmail("spec-sem-termos"),
      senha: testData.usuarioValido.senha,
      aceitarTermos: false,
    });

    await validarPermaneceEmCadastro(page);
    await snapshot(page, testInfo, "spec-sem-termos-validado.png");
  });
});

