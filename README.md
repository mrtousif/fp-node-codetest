
## FP Node Codetest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API server is available at <http://localhost:3000>

## Swagger Doc is available at <http://localhost:3000/docs>

## JSON data saved in stock.json file where you can update price and quantity according to your need

## Update the stock quality and price of one apparel code and size

```sh
curl --request PATCH \
  --url http://localhost:3000/products/TSH-001/XL \
  --header 'Content-Type: application/json' \
  --data '{
  "quantity": 15,
  "price": 60
}'
```

Response

```text
Stock updated successfully
```

## Simultaneously update the stock quality and price of several apparel codes and sizes

```sh
curl --request PATCH \
  --url http://localhost:3000/products \
  --header 'Content-Type: application/json' \
  --data '[
  {
    "quantity": 12,
    "price": 10,
    "code": "TSH-001",
    "size": "M"
  },
  {
    "quantity": 32,
    "price": 29.99,
    "code": "TSH-001",
    "size": "L"
  }
]'
```

Response

```text
Stock updated successfully
```

## Check If order satisfies fulfill the requirement

```sh
curl --request POST \
  --url http://localhost:3000/orders/check-fulfill \
  --header 'Content-Type: application/json' \
  --data '[
  {
    "productCode": "TSH-001",
    "quantity": 10,
    "size": "M"
  }
]'
```

Response

```json
{
  "totalCost": 100
}
```

## When order quantity is higher than available quantity, check If order satisfies fulfill the requirement.

It will show error message

```sh
curl --request POST \
  --url http://localhost:3000/orders/check-fulfill \
  --header 'Content-Type: application/json' \
  --data '[
  {
    "productCode": "TSH-001",
    "quantity": 100,
    "size": "M"
  }
]'
```

Response

```json
{
  "message": "Order cannot be fulfilled",
  "error": "Bad Request",
  "statusCode": 400
}
```

## When total order value is less than 20, check If order satisfies fulfill the requirement

It will show error message

```sh
curl --request POST \
  --url http://localhost:3000/orders/check-fulfill \
  --header 'Content-Type: application/json' \
  --data '[
  {
    "productCode": "TSH-001",
    "quantity": 1,
    "size": "M"
  }
]'
```

Response

```json
{
  "message": "Minimum order value should be 20. Order cannot be fulfilled",
  "error": "Bad Request",
  "statusCode": 400
}
```
