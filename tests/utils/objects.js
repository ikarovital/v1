const objects = {
  cadastro: {
    nomeInput: '[data-testid="nome"]',
    emailInput: '[data-testid="email"]',
    senhaInput: '[data-testid="password"]',
    termosCheckbox: '[data-testid="checkbox"]',
    cadastrarButton: '[data-testid="cadastrar"]',
    tituloPagina: "h1",
    alertaErro: ".alert, [role='alert']",
  },
  sessao: {
    emailInput: '[data-testid="email"]',
    senhaInput: '[data-testid="password"]',
    entrarButton: '[data-testid="entrar"]',
    logoutButton: '[data-testid="logout"]',
    loginHeading: "h1",
    homeHeading: "h1",
  },
};

module.exports = { objects };
