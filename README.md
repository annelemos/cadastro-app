# Cadastro App

Este é meu primeiro projeto full stack completo, feito para portfólio. É uma aplicação de cadastro de usuários com uma API REST própria, conectada a um banco PostgreSQL.

Comecei esse projeto com pouco conhecimento em backend, então ele também serviu como meu processo de aprendizado. Fui construindo camada por camada: primeiro o servidor, depois o banco, depois a API, e só no final o frontend e o estilo.

**Deploy:** (em breve, ainda estou configurando)

## O que o projeto faz:

- Cadastrar um usuário (nome, email e senha)
- Listar todos os usuários cadastrados
- Editar um usuário existente
- Remover um usuário
- A senha nunca é salva em texto puro — uso hash com bcrypt
- Validação básica pra não deixar cadastrar com campo vazio

## Stack

Backend: Node.js, Express, PostgreSQL, pg, bcrypt, dotenv
Frontend: HTML, CSS puro (Flexbox) e JavaScript com fetch
Testei tudo manualmente com Thunder Client antes de integrar o frontend.

## Como o projeto está organizado

Separei o backend em três camadas — models, controllers e routes. Na prática:

- `models/userModel.js` conversa com o banco (as queries SQL ficam todas aqui)
- `controllers/userController.js` recebe a requisição, valida os dados, gera o hash da senha e decide o que responder
- `routes/userRoutes.js` liga cada rota (ex: `POST /usuarios`) à função certa do controller

```
cadastro-app/
├── src/
│   ├── config/database.js
│   ├── controllers/userController.js
│   ├── models/userModel.js
│   └── routes/userRoutes.js
├── public/
│   ├── index.html
│   ├── css/style.css
│   └── js/script.js
├── server.js
└── package.json
```

Achei que valia a pena separar assim porque, se um dia eu precisar trocar alguma coisa em como o dado é salvo, não preciso mexer na parte que trata a requisição — e vice-versa.

## Rotas da API

| Método | Rota | O que faz |
|---|---|---|
| POST | /api/usuarios | cria um usuário novo |
| GET | /api/usuarios | lista todos |
| PUT | /api/usuarios/:id | atualiza um usuário |
| DELETE | /api/usuarios/:id | remove um usuário |

Exemplo de cadastro:

```
POST /api/usuarios
{
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "senha": "senha123"
}
```

Resposta:
```
{ "mensagem": "Usuário criado com sucesso" }
```

## Sobre a parte de segurança

Duas coisas que fiz questão de implementar, mesmo sendo um projeto de estudo:

**Senha com hash** — uso bcrypt com salt rounds 10. Isso significa que, mesmo que alguém tivesse acesso direto ao banco, não conseguiria ver a senha original de ninguém, só o hash.

**Queries parametrizadas** — em nenhum lugar do código eu concateno dados do usuário direto numa string SQL. Sempre uso os placeholders do próprio driver `pg`, para evitar SQL Injection.

## Rodando localmente

Precisa ter Node e PostgreSQL instalados.

```bash
git clone https://github.com/annelemos/cadastro-app.git
cd cadastro-app
npm install
```

Cria um arquivo `.env` na raiz com:
```
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=cadastro_app
DB_PASSWORD=sua_senha
DB_PORT=5432
```

Cria o banco e a tabela (pode rodar isso no pgAdmin ou psql):
```sql
CREATE DATABASE cadastro_app;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    senha VARCHAR(255)
);
```

E roda:
```bash
npm run dev
```

Abre em `http://localhost:3000`.

## O que ainda quero melhorar

Esse projeto não está "pronto" no sentido de esgotado — tem várias coisas que sei que faltam pra ser uma aplicação realmente pronta para produção:

- Login com autenticação (JWT)
- Validar o formato do email de verdade 
- Testes automatizados — ainda não escrevi nenhum
- Paginação na listagem, caso a tabela cresça muito

## Por que fiz esse projeto

Sou estudante do 3º período de Engenharia de Software e queria algo pra portfólio que fosse além de um CRUD genérico copiado de tutorial — por isso documentei bastante o processo e fui atrás de entender o "porquê" de cada decisão (por exemplo, por que separar em camadas, por que usar hash em vez de criptografia reversível, por que WHERE é obrigatório num UPDATE). Se você é recrutador ou dev revisando esse repo, fico à disposição pra conversar sobre qualquer parte do código.

---
Anne Lemos · [github.com/annelemos](https://github.com/annelemos)