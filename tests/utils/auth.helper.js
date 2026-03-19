const {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
  realizarLogout,
  validarRedirecionamentoParaLogin,
} = require("./sessao-flow");

/**
 * Helper de autenticação via UI (reutiliza a lógica já existente em sessao-flow).
 */
module.exports = {
  abrirPaginaLogin,
  realizarLogin,
  validarLoginComSucesso,
  realizarLogout,
  validarRedirecionamentoParaLogin,
};

