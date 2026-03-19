const { test, createBdd } = require("playwright-bdd");
const { testData, buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
  validarErroEmailExistente,
  validarPermaneceEmCadastro,
} = require("../utils/cadastro-flow");

const { Given, When, Then } = createBdd(test);
let emailExistente;

Given("que acessei a pagina de cadastro de usuarios", async ({ page }, testInfo) => {
  await abrirPaginaCadastro(page);
  await page.screenshot({
    path: testInfo.outputPath("acesso-pagina-cadastro.png"),
    fullPage: true,
  });
});

When(
  "informo nome, email e senha validos e clico em cadastrar",
  async ({ page }, testInfo) => {
    const email = buildUniqueEmail("cadastro");

    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email,
      senha: testData.usuarioValido.senha,
      aceitarTermos: true,
    });

    await page.screenshot({
      path: testInfo.outputPath("apos-cadastro-sucesso.png"),
      fullPage: true,
    });
  }
);

Then("devo ver a mensagem de boas-vindas com o nome do usuario", async ({ page }) => {
  await validarBoasVindas(page, testData.usuarioValido.nome);
});

When(
  "informo dados de um usuario ja cadastrado e clico em cadastrar",
  async ({ page }, testInfo) => {
    emailExistente = buildUniqueEmail("existente");

    await preencherCadastro(page, {
      nome: testData.usuarioExistente.nome,
      email: emailExistente,
      senha: testData.usuarioExistente.senha,
      aceitarTermos: true,
    });
    await validarBoasVindas(page, testData.usuarioExistente.nome);
    await page.goto("/cadastrarusuarios");

    await preencherCadastro(page, {
      nome: testData.usuarioExistente.nome,
      email: emailExistente,
      senha: testData.usuarioExistente.senha,
      aceitarTermos: true,
    });
    await page.screenshot({
      path: testInfo.outputPath("tentativa-email-existente.png"),
      fullPage: true,
    });
  }
);

Then("devo ver a mensagem de erro de email ja utilizado", async ({ page }) => {
  await validarErroEmailExistente(page);
});

When(
  "informo nome, email e senha validos sem aceitar os termos e clico em cadastrar",
  async ({ page }, testInfo) => {
    const email = buildUniqueEmail("semtermos");

    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email,
      senha: testData.usuarioValido.senha,
      aceitarTermos: false,
    });

    await page.screenshot({
      path: testInfo.outputPath("cadastro-sem-termos.png"),
      fullPage: true,
    });
  }
);

Then("devo permanecer na pagina de cadastro", async ({ page }) => {
  await validarPermaneceEmCadastro(page);
});
