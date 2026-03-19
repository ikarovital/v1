const { test, createBdd } = require("playwright-bdd");
const { buildUniqueEmail } = require("../utils/test-data");
const { abrirPaginaCadastro, preencherCadastro, validarCadastroAposEnvio } = require("../utils/cadastro-flow");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
} = require("../utils/sessao-flow");
const { screenshotAndAttach } = require("../utils/screenshot-attach");
const { registerCreatedUser } = require("../utils/users.store");

const { Given } = createBdd(test);

let usuarioLogado;

Given("que o usuário está logado", async ({ page, $testInfo }) => {
  const email = buildUniqueEmail("login-comum");
  const senha = "teste123";

  usuarioLogado = { nome: "usuario logado comum", email, senha };

  // // Given: cadastra usuário comum via UI e permanece autenticado
  await abrirPaginaCadastro(page);
  await preencherCadastro(page, {
    nome: usuarioLogado.nome,
    email: usuarioLogado.email,
    senha: usuarioLogado.senha,
    aceitarTermos: true,
  });

  await validarCadastroAposEnvio(page);
  registerCreatedUser(
    {
      nome: usuarioLogado.nome,
      email: usuarioLogado.email,
      senha: usuarioLogado.senha,
      administrador: true,
    },
    "common-login-setup"
  );

  // Se não logou automaticamente, fazemos login manual.
  const logoutVisible = await page.getByTestId("logout").isVisible().catch(() => false);
  if (!logoutVisible) {
    await abrirPaginaLogin(page);
    await realizarLogin(page, {
      email: usuarioLogado.email,
      senha: usuarioLogado.senha,
    });
    await validarLoginComSucesso(page);
  }

  await screenshotAndAttach(page, $testInfo, "given-usuario-logado.png");
});

