const { test, createBdd } = require("playwright-bdd");
const { testData, buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaCadastro,
  preencherCadastro,
  validarBoasVindas,
} = require("../utils/cadastro-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");
const { criarUsuarioViaApi, criarEmailUnico } = require("../utils/user.factory");
const { abrirPaginaLogin, realizarLogin } = require("../utils/auth.helper");
const {
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("../utils/sessao-flow");

const { Given, When, Then } = createBdd(test);

// Given: usuário acessa a página de cadastro
Given("que acessei a pagina de cadastro de usuarios", async ({ page, $testInfo }) => {
  await abrirPaginaCadastro(page);
  await screenshotAndAttach(page, $testInfo, "acesso-pagina-cadastro.png");
});

// When: usuário preenche dados válidos e envia o cadastro
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

// Then: valida boas-vindas do cadastro
Then(
  "devo ver a mensagem de boas-vindas com o nome do usuario",
  async ({ page, $testInfo }) => {
    await validarBoasVindas(page, testData.usuarioValido.nome);
    await screenshotAndAttach(page, $testInfo, "then-boas-vindas.png");
  }
);

// Then: realiza reaprovação (logout) após cadastro
Then(
  "devo reaprovar o usuario cadastrado realizando logout com sucesso",
  async ({ page, $testInfo }) => {
    await realizarLogout(page);
    await validarRedirecionamentoParaLogin(page);
    await screenshotAndAttach(
      page,
      $testInfo,
      "then-reaprovacao-logout.png"
    );
  }
);

// Given: cria usuário administrador via API para autenticação
Given("que existe um usuario administrador criado via API", async ({ page, request, $testInfo }) => {
  const email = criarEmailUnico("admin");
  const senha = "teste123";

  page.__usuarioAdministrador = await criarUsuarioViaApi(request, {
    nome: "usuario administrador",
    email,
    senha,
    administrador: true,
  });

  // Garante que a página tem um contexto para o screenshot
  await abrirPaginaLogin(page);
  await screenshotAndAttach(page, $testInfo, "given-admin-pagina-login.png");
});

// When: autentica com o usuário administrador criado
When(
  "autentico com esse usuario administrador",
  async ({ page, $testInfo }) => {
    const usuarioAdministrador = page.__usuarioAdministrador;
    await realizarLogin(page, {
      email: usuarioAdministrador.email,
      senha: usuarioAdministrador.senha,
    });
    await screenshotAndAttach(
      page,
      $testInfo,
      "when-admin-login.png"
    );
  }
);
