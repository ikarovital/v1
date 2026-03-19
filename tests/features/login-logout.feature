# language: pt

Funcionalidade: Login e logout de usuario
  Como visitante da plataforma
  Quero fazer login e depois sair do sistema
  Para garantir que o fluxo de autenticação funciona

  Cenario: Login e logout com sucesso
    Dado que acessei a pagina de login
    Quando informo credenciais validas e clico em entrar
    Entao devo ver a tela inicial da aplicacao
    Quando solicito logout
    Entao devo ser redirecionado para a pagina de login

