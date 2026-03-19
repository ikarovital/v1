# language: pt

Funcionalidade: Autenticação e logout do usuário
  Como visitante da plataforma
  Quero autenticar e depois sair do sistema
  Para garantir que o fluxo de autenticação funciona

  Cenario: Login com sucesso
    Dado que acessei a pagina de login
    Quando informo credenciais validas e clico em entrar
    Entao devo ver a tela inicial da aplicacao

  Cenario: Logout de usuário logado
    Dado que o usuário está logado
    Quando solicito logout
    Entao devo ser redirecionado para a pagina de login

