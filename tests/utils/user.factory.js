const { buildUniqueEmail } = require("./test-data");

/**
 * Cria usuários via API (ServeRest) para garantir determinismo em cenários.
 */
async function criarUsuarioViaApi(request, { nome, email, senha, administrador = false }) {
  const administradorValue =
    typeof administrador === "string" ? administrador : administrador ? "true" : "false";

  await request.post("https://serverest.dev/usuarios", {
    data: {
      nome,
      email,
      password: senha,
      administrador: administradorValue,
    },
  });

  return { nome, email, senha, administrador: administradorValue };
}

function criarEmailUnico(prefix = "teste") {
  return buildUniqueEmail(prefix);
}

module.exports = {
  criarUsuarioViaApi,
  criarEmailUnico,
};

