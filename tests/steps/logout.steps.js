const { test, createBdd } = require("playwright-bdd");
const {
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("../utils/sessao-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");

const { When, Then } = createBdd(test);

When("solicito logout", async ({ page, $testInfo }) => {
  await realizarLogout(page);
  await screenshotAndAttach(page, $testInfo, "logout-acionado.png");
});

Then(
  "devo ser redirecionado para a pagina de login",
  async ({ page, $testInfo }) => {
    await validarRedirecionamentoParaLogin(page);
    await screenshotAndAttach(page, $testInfo, "then-logout-redirecionado.png");
  }
);
