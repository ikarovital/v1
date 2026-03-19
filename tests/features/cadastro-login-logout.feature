# language: pt

Funcionalidade: Cadastro e logout de usuario
  Como visitante da plataforma
  Quero cadastrar um novo usuario e sair do sistema
  Para garantir que o fluxo principal de acesso funcione

  Cenario: Cadastro com sucesso
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos e clico em cadastrar
    Entao devo ver a mensagem de boas-vindas com o nome do usuario

  Cenario: Cadastro com email ja existente
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo dados de um usuario ja cadastrado e clico em cadastrar
    Entao devo ver a mensagem de erro de email ja utilizado

  Cenario: Cadastro sem aceitar termos
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos sem aceitar os termos e clico em cadastrar
    Entao devo permanecer na pagina de cadastro

  Cenario: Login e logout com sucesso
    Dado que acessei a pagina de login
    Quando informo credenciais validas e clico em entrar
    Entao devo ver a tela inicial da aplicacao
    Quando solicito logout
    Entao devo ser redirecionado para a pagina de login
