const { test, createBdd } = require("playwright-bdd");
const { testData, buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaCadastro,
  preencherCadastro,
  validarCadastroAposEnvio,
} = require("../utils/cadastro-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");
const { registerCreatedUser } = require("../utils/users.store");

const { Given, When, Then } = createBdd(test);

// Given: usuário acessa a página de cadastro
Given(
  "que acessei a pagina de cadastro de usuarios",
  async ({ page, $testInfo }) => {
    await abrirPaginaCadastro(page);
    await screenshotAndAttach(page, $testInfo, "cadastro-aberto.png");
  }
);

// When: usuário cadastra como administrador (seleciona checkbox)
When(
  "informo nome, email e senha validos como administrador e clico em cadastrar",
  async ({ page, $testInfo }) => {
    const email = buildUniqueEmail("admin-cadastro");
    page.__usuarioCadastroAtual = {
      nome: testData.usuarioValido.nome,
      email,
      senha: testData.usuarioValido.senha,
      administrador: true,
    };

    await preencherCadastro(page, {
      nome: page.__usuarioCadastroAtual.nome,
      email: page.__usuarioCadastroAtual.email,
      senha: page.__usuarioCadastroAtual.senha,
      aceitarTermos: true,
    });

    await screenshotAndAttach(page, $testInfo, "cadastro-admin-submit.png");
  }
);

// When: usuário cadastra sem administrador (não seleciona checkbox)
When(
  "informo nome, email e senha validos sem administrador e clico em cadastrar",
  async ({ page, $testInfo }) => {
    const email = buildUniqueEmail("comum-cadastro");
    page.__usuarioCadastroAtual = {
      nome: testData.usuarioValido.nome,
      email,
      senha: testData.usuarioValido.senha,
      administrador: false,
    };

    await preencherCadastro(page, {
      nome: page.__usuarioCadastroAtual.nome,
      email: page.__usuarioCadastroAtual.email,
      senha: page.__usuarioCadastroAtual.senha,
      aceitarTermos: false,
    });

    await screenshotAndAttach(page, $testInfo, "cadastro-comum-submit.png");
  }
);

// Then: valida que o usuário está autenticado (tela inicial logado)
Then(
  "devo ver a tela inicial apos cadastro",
  async ({ page, $testInfo }) => {
    await validarCadastroAposEnvio(page);
    if (page.__usuarioCadastroAtual) {
      registerCreatedUser(page.__usuarioCadastroAtual, "cadastro.feature");
    }
    await screenshotAndAttach(page, $testInfo, "then-tela-inicial.png");
  }
);
