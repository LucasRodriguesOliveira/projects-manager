# Project Manager
Projeto com o intuito de demonstrar a capacidade de desenvolver uma API seguindo as instruções do desafio técnico

## Instalação
Para realizar a instalação é necessário seguir os seguintes passos:

- Clonar o repositório
  - `git clone https://github.com/LucasRodriguesOliveira/projects-manager.git`
- adicionar á raiz do projeto um arquivo `.env` parecido com o `.env.example`, suprindo o apresentado no `.env.example`
- instalar as dependências
  - `yarn` ou `npm i`
  - Pode-se utilizar docker se preferir (`docker-compose up -d`)
- e iniciar o projeto  com `yarn start` (se utilizou docker, a própria config já resolve por você :) )

### Possíveis erros

No enunciado dizia que deveria utilizar uma api para busca dos dados de CEP, entretanto o texto não estava completo com qual API deveria ser utilizada (também estava incluso que poderia utilizar qualquer outra de preferência). Tomei a liberdade e utilizei a BrasilAPI

Em alguns pontos do enunciado, solicita que seja feito de forma X, como por exemplo, nomenclatura de rotas e de colunas de banco. Tomei a liberdade para montar de um jeito mais agradável na minha opinião, ex:
ao invés de `zip_code`, montei `zipCode`

ao invés de rotas como:
- `projects`

montei como:
- `project`

entre outros pequenos detalhes que são apenas preferências pessoais


O Projeto foi feito de forma simples, poderia ser incluído mais recursos tais como autenticação JWT, Testes Unitários e Integrados, CI/CD, entre outos, optei por manter como solicitado, apenas o MVP


Em caso de qualquer dúvida, entre em contato comigo por e-mail: `lucasroliveira98@gmail.com`


O Projeto de Front-end foi montado separado, vou atualizar posteriormente esse README com o repositório correto
