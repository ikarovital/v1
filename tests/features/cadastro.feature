# language: pt

Funcionalidade: Cadastro e reaprovação de usuario
  Como visitante da plataforma
  Quero cadastrar um novo usuario e depois sair do sistema
  Para garantir que o fluxo principal de cadastro funcione

  Cenario: Cadastro com sucesso e logout
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos e clico em cadastrar
    Entao devo ver a mensagem de boas-vindas com o nome do usuario
    E devo reaprovar o usuario cadastrado realizando logout com sucesso

  Cenario: Cadastro com email ja existente
    Dado que acessei a pagina de cadastro de usuarios
    E existe um usuario cadastrado
    Quando informo o email do usuario cadastrado e clico em cadastrar
    Entao devo ver a mensagem de erro de email ja utilizado

  Cenario: Cadastro sem aceitar termos
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos sem aceitar os termos e clico em cadastrar
    Entao devo permanecer na pagina de cadastro

