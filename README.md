# Teste vocacional Unidesc

## Como começar

1. Instale o Node.js (lts ou 18.14.1)
2. Crie um fork da aplicação
3. Baixe e instale o repositorio baixado

```bash
  git clone https://github.com/<seu-usuario>/teste-vocacional-unidesc.git
```

### Instalação da aplicação

```bash
  npm install
```

### Rodando a aplicação

```bash
  npm run start:dev
```

### Rodando os testes

```bash
  npm run test
```

### conexao com o banco de dados

```bash
 docker run --name teste-vocacional -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d mongo
```

após a criação do container adicione a uri de conexão as variaveis de ambiente -> ex: mongodb://root:root@localhost:27017/?authMechanism=DEFAULT

caso voê altere alguma configuração verifique se isso altera a conexão
