const { test, createBdd } = require("playwright-bdd");
const { buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
} = require("../utils/sessao-flow");

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
  await page.screenshot({
    path: $testInfo.outputPath("acesso-pagina-login.png"),
    fullPage: true,
  });
});

When("informo credenciais validas e clico em entrar", async ({ page, $testInfo }) => {
  await realizarLogin(page, {
    email: usuarioLogin.email,
    senha: usuarioLogin.senha,
  });
  await page.screenshot({
    path: $testInfo.outputPath("apos-login.png"),
    fullPage: true,
  });
});

Then("devo ver a tela inicial da aplicacao", async ({ page }) => {
  await validarLoginComSucesso(page);
});
