# LIBRARY BOOK

# Cadastro de Livro

## POST https://library-book-cg8c.onrender.com/book - Rota responsável pelo CADASTRO de livros.

#### Corpo da requisição:

##### Obs: por padrão available é true

##### Obs: description é opcional

```json
{
  "title": "Reformodinha",
  "author": "Caio Fábio",
	"description": "Nitrogen is a chemical element with info N and atomic number 7.
  It was first discovered and isolated by Scottish physician Daniel Rutherford in 1772"
}
```

#### Corpo da resposta - STATUS CODE 201 - CREATED:

```json
{
	"available": true,
	"description": "Nitrogen is a chemical element with info N and atomic number 7.
  It was first discovered and isolated by Scottish physician Daniel Rutherford in 1772",
	"author": "Caio Fábio",
	"title": "Reformodinha",
	"id": "10abe101-1db9-4fb5-8af6-afabd3a7141d"
}
```

### Possíveis erros

### OBS: Caso o nome de uma das chaves esteja incorreta ou então não seja passada.

FORMATO DA RESPOSTA - STATUS 400 - Bad Request

#### Corpo da requisição:

```json
{
  "title": "reformadinha"
}
```

#### Corpo da resposta - STATUS CODE 400 - Bad Request:

```json
{
  {
    "name": "ValidationError",
		"message": "author is a required field"
	}
}
```

## GET https://library-book-cg8c.onrender.com/book - Rota responsável pela listagem de todos os livros.

#### Requisição sem corpo

#### Corpo da resposta - STATUS CODE 200 - OK:

```json
{
  "prevPage": null,
  "nextPage": null,
  "count": 1,
  "data": [
    {
      "id": "7a71beb9-cdc3-4267-8f6a-e9eaa1251001",
      "title": "reformadinha",
      "author": "Caio Fábio",
      "description": "",
      "available": true,
      "info": {
        "borrowedBy": null,
        "startDate": null,
        "endDate": null
      }
    }
  ]
}
```

### Paginação

Para adicionar suporte à paginação, você pode usar os parâmetros page e perPage. Esses parâmetros permitirão que os
clientes solicitem uma página específica de resultados e especifiquem quantos resultados desejam por página.
Aqui está um exemplo de como isso pode ser implementado:

### page: Indica a página desejada (começando em 1).

### perPage: Especifica quantos itens deseja exibir por página.

# Exemplo de uso da paginação:

https://library-book-cg8c.onrender.com/book?page=1&perPage=10

### Ordenação

Para adicionar suporte à ordenação, você pode usar os parâmetros sort e order. Isso permitirá que os clientes ordenem os resultados com base em um campo específico em ordem ascendente ou descendente.

### sort: Indica o campo pelo qual você deseja ordenar os resultados (por exemplo, "title", "author", "available").

### order: Indica a ordem da ordenação, que pode ser "asc" (ascendente) ou "desc" (descendente).

# Exemplo de uso da Ordenação:

https://library-book-cg8c.onrender.com/book?sort=available&order=desc

## GET https://library-book-cg8c.onrender.com/book/search?keyword=caio - Rota responsável por fazer uma busca por author ou titulo do livro compativel com a busca.

#### requisição sem corpo.

#### Corpo da resposta - STATUS CODE 200 - OK:

```json
[
  {
    "id": "392278f1-10dc-4f0c-8811-aacb428f2671",
    "title": "reformadinha",
    "author": "Caio Fábio",
    "description": "",
    "available": false,
    "borrowedBy": "Heitor",
    "startDate": "2023-09-19",
    "endDate": "2023-09-25"
  }
]
```

## PATCH https://library-book-cg8c.onrender.com/book/rentBook/bookId - Rota responsável por fazer o aluguel do livro.

#### Corpo da requisição:

```json
{
  "borrowedBy": "Heitor",
  "startDate": "19/09/2023",
  "endDate": "25/09/2023"
}
```

#### Corpo da resposta - STATUS CODE 200 - OK:

```json
{
  "id": "7a71beb9-cdc3-4267-8f6a-e9eaa1251001",
  "title": "reformadinha",
  "author": "Caio Fábio",
  "description": "",
  "available": false,
  "borrowedBy": "Heitor",
  "startDate": "2023-09-19T00:00:00.000Z",
  "endDate": "2023-09-25T00:00:00.000Z"
}
```

### Possíveis erros

### Caso o id do Livro não exista

#### Corpo da resposta - STATUS CODE 404

```json
{
  "message": "Livro com ID 7a71beb9-cdc3-4267-8f6a-e9eaa1251022 não encontrado."
}
```

### Caso o Livro Já esteja alugado

#### Corpo da resposta - STATUS CODE 409

```json
{
  "message": "Livro não está disponível."
}
```

## PATCH https://library-book-cg8c.onrender.com/book/returnBook/bookId - Rota responsável por fazer a devolução do livro.

#### Requisição sem corpo

#### Corpo da resposta - STATUS CODE 200 - OK:

```json
{
  "message": "Livro devolvido com sucesso.",
  "book": {
    "id": "f282f4e9-206f-4879-ad47-9c5b35279d9c",
    "title": "reformadinha",
    "author": "Caio Fábio",
    "description": "",
    "available": true,
    "borrowedBy": "",
    "startDate": null,
    "endDate": null
  }
}
```

## DELETE https://library-book-cg8c.onrender.com/book/delete/bookId - Rota responsável por fazer a deleção de um livro.

#### Requisição sem corpo

#### Corpo da resposta - STATUS CODE 200 - OK:

```json
{
  "message": "Book deleted"
}
```
