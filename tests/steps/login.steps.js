const { test, createBdd } = require("playwright-bdd");
const { buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
} = require("../utils/sessao-flow");
const { abrirPaginaCadastro, preencherCadastro, validarCadastroAposEnvio } = require("../utils/cadastro-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");
const { registerCreatedUser } = require("../utils/users.store");

const { Given, When, Then } = createBdd(test);
let usuarioLogin;

// Given: cria um usuário via cadastro na UI e retorna para a tela de login
Given("que acessei a pagina de login", async ({ page, $testInfo }) => {
  const email = buildUniqueEmail("login");
  const senha = "teste123";

  usuarioLogin = { email, senha };

  // // Setup: cadastra usuário comum via UI e permanece autenticado
  await abrirPaginaCadastro(page);
  await preencherCadastro(page, {
    nome: "usuario login",
    email,
    senha,
    aceitarTermos: true, // marca checkbox (admin checkbox no cadastro)
  });

  // Não assumimos que o usuário ficará logado automaticamente após cadastro.
  // Validamos apenas que o cadastro foi aceito e então executamos o login normalmente.
  await validarCadastroAposEnvio(page);
  registerCreatedUser(
    {
      nome: "usuario login",
      email: usuarioLogin.email,
      senha: usuarioLogin.senha,
      administrador: true,
    },
    "login-setup"
  );
  await screenshotAndAttach(page, $testInfo, "given-usuario-criado-via-ui.png");

  await abrirPaginaLogin(page);
  await screenshotAndAttach(page, $testInfo, "acesso-pagina-login.png");
});

When("informo credenciais validas e clico em entrar", async ({ page, $testInfo }) => {
  await realizarLogin(page, {
    email: usuarioLogin.email,
    senha: usuarioLogin.senha,
  });
  await screenshotAndAttach(page, $testInfo, "apos-login.png");
});

Then("devo ver a tela inicial da aplicacao", async ({ page, $testInfo }) => {
  await validarLoginComSucesso(page);
  await screenshotAndAttach(page, $testInfo, "then-login-sucesso.png");
});
