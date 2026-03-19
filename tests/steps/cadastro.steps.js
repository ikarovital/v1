const { test, createBdd } = require("playwright-bdd");
const { testData, buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
  validarErroEmailExistente,
  validarPermaneceEmCadastro,
} = require("../utils/cadastro-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");

const { Given, When, Then } = createBdd(test);
let emailExistente;

Given("que acessei a pagina de cadastro de usuarios", async ({ page, $testInfo }) => {
  await abrirPaginaCadastro(page);
  await screenshotAndAttach(page, $testInfo, "acesso-pagina-cadastro.png");
});

When(
  "informo nome, email e senha validos e clico em cadastrar",
  async ({ page, $testInfo }) => {
    const email = buildUniqueEmail("cadastro");

    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email,
      senha: testData.usuarioValido.senha,
      aceitarTermos: true,
    });

    await screenshotAndAttach(page, $testInfo, "apos-cadastro-sucesso.png");
  }
);

Then(
  "devo ver a mensagem de boas-vindas com o nome do usuario",
  async ({ page, $testInfo }) => {
    await validarBoasVindas(page, testData.usuarioValido.nome);
    await screenshotAndAttach(page, $testInfo, "then-boas-vindas.png");
  }
);

When(
  "informo dados de um usuario ja cadastrado e clico em cadastrar",
  async ({ page, $testInfo }) => {
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
    await screenshotAndAttach(page, $testInfo, "tentativa-email-existente.png");
  }
);

Then(
  "devo ver a mensagem de erro de email ja utilizado",
  async ({ page, $testInfo }) => {
    await validarErroEmailExistente(page);
    await screenshotAndAttach(
      page,
      $testInfo,
      "then-erro-email-existente.png"
    );
  }
);

When(
  "informo nome, email e senha validos sem aceitar os termos e clico em cadastrar",
  async ({ page, $testInfo }) => {
    const email = buildUniqueEmail("semtermos");

    await preencherCadastro(page, {
      nome: testData.usuarioValido.nome,
      email,
      senha: testData.usuarioValido.senha,
      aceitarTermos: false,
    });

    await screenshotAndAttach(page, $testInfo, "cadastro-sem-termos.png");
  }
);

Then(
  "devo permanecer na pagina de cadastro",
  async ({ page, $testInfo }) => {
    await validarPermaneceEmCadastro(page);
    await screenshotAndAttach(page, $testInfo, "then-sem-termos.png");
  }
);
