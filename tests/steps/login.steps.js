const { test, createBdd } = require("playwright-bdd");
const { testData } = require("../utils/test-data");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
} = require("../utils/sessao-flow");

const { Given, When, Then } = createBdd(test);

Given("que acessei a pagina de login", async ({ page }, testInfo) => {
  await abrirPaginaLogin(page);
  await page.screenshot({
    path: testInfo.outputPath("acesso-pagina-login.png"),
    fullPage: true,
  });
});

When("informo credenciais validas e clico em entrar", async ({ page }, testInfo) => {
  await realizarLogin(page, {
    email: testData.loginValido.email,
    senha: testData.loginValido.senha,
  });
  await page.screenshot({
    path: testInfo.outputPath("apos-login.png"),
    fullPage: true,
  });
});

Then("devo ver a tela inicial da aplicacao", async ({ page }) => {
  await validarLoginComSucesso(page);
});
