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

async function snapshot(page, testInfo, name) {
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: true,
  });
}

test.describe("Cadastro, login e logout", () => {
  test("Cadastro com sucesso", async ({ page }, testInfo) => {
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
  });

  test("Cadastro com email ja existente", async ({ page }, testInfo) => {
    const emailExistente = buildUniqueEmail("spec-existente");

    await abrirPaginaCadastro(page);
    await snapshot(page, testInfo, "spec-existente-aberto.png");
    await preencherCadastro(page, {
      nome: testData.usuarioExistente.nome,
      email: emailExistente,
      senha: testData.usuarioExistente.senha,
      aceitarTermos: true,
    });
    await validarBoasVindas(page, testData.usuarioExistente.nome);
    await snapshot(page, testInfo, "spec-existente-primeiro-validado.png");
    await page.goto("/cadastrarusuarios");
    await snapshot(page, testInfo, "spec-existente-navegou-novamente.png");
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

  test("Login e logout com sucesso", async ({ page, request }, testInfo) => {
    const loginEmail = buildUniqueEmail("spec-login");
    const loginSenha = "teste123";
    await request.post("https://serverest.dev/usuarios", {
      data: {
        nome: "usuario spec login",
        email: loginEmail,
        password: loginSenha,
        administrador: "false",
      },
    });

    await abrirPaginaLogin(page);
    await snapshot(page, testInfo, "spec-login-aberto.png");
    await realizarLogin(page, {
      email: loginEmail,
      senha: loginSenha,
    });
    await validarLoginComSucesso(page);
    await snapshot(page, testInfo, "spec-login-validado.png");
    await realizarLogout(page);
    await validarRedirecionamentoParaLogin(page);
    await snapshot(page, testInfo, "spec-logout-validado.png");
  });
});
