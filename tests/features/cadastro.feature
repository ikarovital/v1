# language: pt

Funcionalidade: Cadastro de novos usuários
  Como visitante da plataforma
  Quero cadastrar novos usuários e validar regras importantes
  Para garantir que o cadastro funciona corretamente

  Cenario: Cadastro com sucesso
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos e clico em cadastrar
    Entao devo ver a mensagem de boas-vindas com o nome do usuario
    E devo reaprovar o usuario cadastrado realizando logout com sucesso

  Cenario: Cadastro com perfil administrador
    Dado que existe um usuario administrador criado via API
    Quando autentico com esse usuario administrador
    Entao devo ver a tela inicial da aplicacao
    Quando solicito logout
    Entao devo ser redirecionado para a pagina de login

  Cenario: Cadastro com email ja existente
    Dado que acessei a pagina de cadastro de usuarios
    E existe um usuario cadastrado
    Quando informo o email do usuario cadastrado e clico em cadastrar
    Entao devo ver a mensagem de erro de email ja utilizado

  Cenario: Cadastro sem aceitar termos
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos sem aceitar os termos e clico em cadastrar
    Entao devo permanecer na pagina de cadastro

