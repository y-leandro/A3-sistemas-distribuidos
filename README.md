# A3 de Sistemas Distribuidos e Mobile 

Sistema desenvolvido para a disciplina de Sistemas Distribuídos e Mobile, com o objetivo de implementar uma aplicação completa utilizando arquitetura cliente-servidor, separando front-end e back-end.

### LVxerox 

O LVxerox é uma aplicação voltada para gerenciamento de serviços de gráfica/xerox, permitindo controle de pedidos, organização de informações e integração entre interface mobile/web e servidor.
##

### O sistema foi dividido em:

[BACK-END DO PROJETO](https://github.com/y-leandro/A3-SistemasDistribuidos-Backend) 
###### API responsável pelas regras de negócio, persistência de dados e comunicação com o banco.

##

[FRONT-END DO PROJETO](https://github.com/venuslima/A3-SistemasDistribuidos-Frontend)
###### Interface do usuário responsável pela interação com o sistema.

##

## Tecnologias Utilizadas
### Back-end

- Java

- Maven (mvn) — Gerenciador de dependências

- H2 Database — Banco de dados relacional em memória

### Front-end

- HTML

- CSS

- JavaScript (integração com a API)

##


## Inicialização do Projeto
### Executando o Back-end (Java + Maven + H2)

Clone o repositório:

```bash
git clone https://github.com/y-leandro/A3-SistemasDistribuidos-Backend
```

Acesse a pasta do projeto:

```bash
cd A3-SistemasDistribuidos-Backend
```

Execute a aplicação com Maven:

```bash
mvn spring-boot:run
```

Ou gere o arquivo .jar:

```bash
mvn clean install
java -jar target/nome-do-arquivo.jar
```

O servidor iniciará em: 

```http://localhost:8080```

###### O banco de dados H2 é iniciado automaticamente junto com a aplicação.

###### Caso esteja habilitado, o console do H2 pode ser acessado em: ```http://localhost:8080/h2-console```

### Executando o Front-end

Clone o repositório:

```bash
git clone https://github.com/venuslima/A3-SistemasDistribuidos-Frontend
```

Acesse a pasta do projeto:

```bash
cd A3-SistemasDistribuidos-Frontend
```

##### Abra o arquivo ```index.html``` no navegador.

##### Ou utilize a extensão ```Live Server``` no VS Code para executar localmente.

## Contribuidores 🧑‍💻

- [Leandro de Medeiros Filho](https://github.com/y-leandro)

- [Venus Lima](https://github.com/venuslima)
