# Gerenciador de Árvore Genealógica

![alt text](https://i.ibb.co/jfRXDgN/19bf4ed5-f17f-4c3b-b504-280efacde1b9.jpg)

## INTRODUÇÃO
Essa é uma API para gerenciar uma árvore genealógica. Há 3 tipos de endpoints: manipulação de pessoas, manipulação de relações entre pessoas e obtenção da árvore de ascendentes de determinada pessoa.

## USO
Clone o repositório:\
`git clone https://github.com/thalesmacedo1/genealogy-tree.git`

Acesse o diretório:\
`cd genealogy-tree`

### RODAR API
Para rodar a API:\
`docker compose up`

## ROTAS

Documentação completa das rotas com exemplos de requisição:
https://documenter.getpostman.com/view/8896044/Uz5FJw94

| REQUEST | URL               | Descrição                    |
| ------- | ----------------- | ---------------------------- |
| GET    | /                  | Obter lista de pessoas       |
| GET    | /person/:id        | Obter pessoa                 |
| POST   | /person            | Adicionar pessoa             |
| PUT    | /person/:id        | Atualizar pessoa             |
| DELETE | /person/:id        | Excluir pessoa               |
| POST   | /person/relation/:children/:parent | Adicionar relação |
| DELETE | /person/relation/:children/:parent | Excluir relação   |
| GET    | /person/tree/:id   | Obter árvore geneológica    |
