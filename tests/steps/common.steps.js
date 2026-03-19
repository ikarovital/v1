const { test, createBdd } = require("playwright-bdd");
const { criarUsuarioViaApi, criarEmailUnico } = require("../utils/user.factory");
const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
} = require("../utils/auth.helper");
const { screenshotAndAttach } = require("../utils/screenshot-attach");

const { Given } = createBdd(test);

let usuarioLogado;

Given("que o usuário está logado", async ({ page, request, $testInfo }) => {
  const email = criarEmailUnico("login-comum");
  const senha = "teste123";

  usuarioLogado = await criarUsuarioViaApi(request, {
    nome: "usuario logado comum",
    email,
    senha,
    administrador: false,
  });

  await abrirPaginaLogin(page);
  await realizarLogin(page, { email: usuarioLogado.email, senha: usuarioLogado.senha });
  await validarLoginComSucesso(page);

  await screenshotAndAttach(page, $testInfo, "given-usuario-logado.png");
});

