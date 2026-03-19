const { test, createBdd } = require("playwright-bdd");
const {
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("../utils/sessao-flow");

const { When, Then } = createBdd(test);

When("solicito logout", async ({ page, $testInfo }) => {
  await realizarLogout(page);
  await page.screenshot({
    path: $testInfo.outputPath("logout-acionado.png"),
    fullPage: true,
  });
});

Then(
  "devo ser redirecionado para a pagina de login",
  async ({ page, $testInfo }) => {
    await validarRedirecionamentoParaLogin(page);
    await page.screenshot({
      path: $testInfo.outputPath("then-logout-redirecionado.png"),
      fullPage: true,
    });
  }
);
