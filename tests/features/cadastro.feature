# language: pt

Funcionalidade: Cadastro de novos usuários
  Como visitante da plataforma
  Quero cadastrar novos usuários comuns e administradores
  Para garantir que o cadastro funciona corretamente

  Cenario: Cadastro de usuário administrador com sucesso
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos como administrador e clico em cadastrar
    Entao devo ver a tela inicial apos cadastro

  Cenario: Cadastro de usuário sem administrador com sucesso
    Dado que acessei a pagina de cadastro de usuarios
    Quando informo nome, email e senha validos sem administrador e clico em cadastrar
    Entao devo ver a tela inicial apos cadastro

