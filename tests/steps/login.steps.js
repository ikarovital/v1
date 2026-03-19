const { test, createBdd } = require("playwright-bdd");
const { buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
} = require("../utils/sessao-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");

const { Given, When, Then } = createBdd(test);
let usuarioLogin;

Given("que acessei a pagina de login", async ({ page, request, $testInfo }) => {
  const email = buildUniqueEmail("login");
  const senha = "teste123";

  await request.post("https://serverest.dev/usuarios", {
    data: {
      nome: "usuario login",
      email,
      password: senha,
      administrador: "false",
    },
  });

  usuarioLogin = { email, senha };
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
