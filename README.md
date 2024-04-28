# API de Gerenciamento de Usuários

Esta API foi desenvolvida para gerenciar usuários, permitindo operações como criar, listar, atualizar, excluir, recuperar senha e autenticar usuários.

## Funcionalidades

- **Cadastro de Usuário:** Permite criar novos usuários com email, nome e senha.
- **Listagem de Usuários:** Lista todos os usuários cadastrados no sistema.
- **Busca de Usuário por ID:** Permite encontrar um usuário específico pelo seu ID.
- **Atualização de Usuário:** Permite atualizar as informações de um usuário existente.
- **Exclusão de Usuário:** Permite excluir um usuário existente do sistema.
- **Recuperação de Senha:** Permite solicitar a recuperação da senha por email.
- **Alteração de Senha:** Permite alterar a senha do usuário após a validação do token de recuperação.
- **Autenticação de Usuário:** Permite autenticar usuários através de email e senha.

## Configuração do Ambiente

Antes de iniciar o servidor, é necessário configurar algumas variáveis de ambiente. Você pode fazer isso criando um arquivo `.env` na raiz do projeto e definindo as seguintes variáveis:

- `DB_PASSWORD`: Senha do banco de dados MySQL.
- `JWT_SECRET`: Chave secreta para a geração de tokens JWT.

Certifique-se de ter o Node.js e o MySQL instalados em sua máquina.

## Instalação e Uso

1. Clone este repositório para o seu ambiente local.
2. Instale as dependências do projeto executando o comando `npm install`.
3. Inicie o servidor com o comando `node index.js`.
4. A API estará disponível em `http://localhost:8686`.

## Rotas Disponíveis

- **POST /user:** Cria um novo usuário.
- **GET /user:** Lista todos os usuários.
- **GET /user/:id:** Busca um usuário pelo ID.
- **PUT /user/:id:** Atualiza um usuário pelo ID.
- **DELETE /user/:id:** Exclui um usuário pelo ID.
- **POST /recover-password:** Solicita a recuperação de senha por email.
- **POST /change-password:** Altera a senha do usuário após a validação do token.
- **POST /login:** Autentica um usuário através de email e senha.

## Middlewares

- **AdminAuth:** Middleware para autenticação de administradores. Utiliza tokens JWT com o papel (role) do usuário.

## Estrutura do Projeto

- **index.js:** Arquivo principal que inicia o servidor.
- **connection.js:** Configuração da conexão com o banco de dados MySQL.
- **routes/routes.js:** Definição das rotas da API.
- **middleware/AdminAuth.js:** Middleware para autenticação de administradores.
- **controllers/UserController.js:** Controladores das operações relacionadas aos usuários.
- **models/User.js:** Modelo de usuário com métodos para operações no banco de dados.
- **models/PasswordToken.js:** Modelo para operações relacionadas aos tokens de recuperação de senha.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Bcrypt (para hash de senhas)
- Knex.js (SQL Query Builder)
