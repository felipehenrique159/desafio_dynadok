# Desafio Dynadok - API de Gerenciamento de Clientes

## Sobre a aplicação

Esta aplicação é uma API REST para cadastro, consulta, atualização e remoção de clientes, utilizando MongoDB, Redis para cache e RabbitMQ para mensageria. O projeto inclui um worker que consome mensagens da fila de clientes.

---

**Observação:**
As variáveis de ambiente necessárias para rodar localmente estão no arquivo `.env.example` dentro da pasta `api`.

---

## Instruções para rodar a aplicação com Docker

Execute o comando abaixo na raiz do projeto para subir todos os containers (API, MongoDB, Redis, RabbitMQ e Worker):

1. ```sh
   docker-compose up --build
   ```

---

## Usando a API (sem Docker)

1. Na pasta `api`, crie uma cópia do arquivo **.env.example** com o nome **.env** e ajuste as variáveis se necessário.
2. Instale as dependências:

   ```sh
   npm install
   ```
3. Inicie a aplicação:

   ```sh
   npm run dev
   ```

   Isso irá executar o **nodemon** e subir a aplicação em modo de desenvolvimento.

---

## 📄 Documentação da API (Swagger)

A documentação interativa da API está disponível via Swagger.

### Como acessar

Após subir a aplicação (localmente ou via Docker), acesse:

```
http://localhost:3001/api/docs
```

Lá você pode visualizar todos os endpoints, parâmetros, exemplos de requisição e resposta, além de testar as rotas diretamente pelo navegador.

### Como funciona

- A documentação é gerada automaticamente a partir dos comentários no código das rotas usando o [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) e exibida com o [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express).
- Sempre que você atualizar ou criar novas rotas, basta documentá-las com os comentários no padrão Swagger/OpenAPI.

---

## Endereço da aplicação

- API disponível em: [http://localhost:3001](http://localhost:3001)

---

## Rotas principais da aplicação

### POST `/api/clients`

- Cria um novo cliente.

**Exemplo de requisição:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999"
}
```

**Exemplo de resposta:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "id": "665f3c2b2b7e4e001e8e8e8e",
  "createdAt": "2024-06-16T18:00:00.000Z",
  "updatedAt": "2024-06-16T18:00:00.000Z"
}
```

---

### GET `/api/clients`

- Lista todos os clientes cadastrados.

---

### GET `/api/clients/{id}`

- Busca um cliente pelo ID.

---

### PUT `/api/clients/{id}`

- Atualiza os dados de um cliente.

---

### DELETE `/api/clients/{id}`

- Remove um cliente pelo ID.

---

## Arquitetura e Tecnologias

- **Express** (API REST)
- **Typescript**
- **MongoDB** (persistência)
- **Redis** (cache)
- **RabbitMQ** (mensageria)
- **Swagger** (documentação)
- **Docker** (containerização)

---

## Worker RabbitMQ

O projeto inclui um worker (pasta `worker_rabbitmq`) que consome mensagens da fila `clients` do RabbitMQ e processa eventos de criação, atualização, consulta e remoção de clientes.

## Como rodar o Worker RabbitMQ localmente (sem Docker)

1. Certifique-se de que o RabbitMQ está rodando em sua máquina (pode ser via Docker ou instalado localmente).

   - Exemplo com Docker:
     ```sh
     docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
     ```
   - O painel de administração ficará disponível em [http://localhost:15672](http://localhost:15672) (usuário/senha padrão: guest/guest).
2. Na pasta `worker_rabbitmq`, crie um arquivo `.env`  ou copie de `.env.example` com o conteúdo:

   ```
   RABBITMQ_URL=amqp://localhost
   ```
3. Instale as dependências do worker:

   ```sh
   cd worker_rabbitmq
   npm install
   ```
4. Compile o TypeScript:

   ```sh
   npm run build
   ```
5. Inicie o worker:

   ```sh
   npm start
   ```

> O worker irá consumir e processar as mensagens da fila de clientes do RabbitMQ normalmente.
