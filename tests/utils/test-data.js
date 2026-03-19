function buildUniqueEmail(prefix = "teste") {
  const random = Date.now();
  return `${prefix}.${random}@usuario.com`;
}

const testData = {
  usuarioValido: {
    nome: "teste novo",
    senha: "teste123",
  },
  usuarioExistente: {
    nome: "usuario existente",
    email: "fulano@qa.com",
    senha: "teste123",
  },
  loginValido: {
    email: "fulano@qa.com",
    senha: "teste123",
  },
};

module.exports = { testData, buildUniqueEmail };
