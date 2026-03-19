const { test } = require("@playwright/test");
const { buildUniqueEmail } = require("../utils/test-data");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("../utils/sessao-flow");

async function snapshot(page, testInfo, name) {
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: true,
  });
}

test.describe("Login e logout", () => {
  test("Login e logout com sucesso", async ({ page, request }, testInfo) => {
    const loginEmail = buildUniqueEmail("spec-login");
    const loginSenha = "teste123";

    await request.post("https://serverest.dev/usuarios", {
      data: {
        nome: "usuario spec login",
        email: loginEmail,
        password: loginSenha,
        administrador: "false",
      },
    });

    await abrirPaginaLogin(page);
    await snapshot(page, testInfo, "spec-login-aberto.png");

    await realizarLogin(page, { email: loginEmail, senha: loginSenha });
    await validarLoginComSucesso(page);
    await snapshot(page, testInfo, "spec-login-validado.png");

    await realizarLogout(page);
    await validarRedirecionamentoParaLogin(page);
    await snapshot(page, testInfo, "spec-logout-validado.png");
  });
});

