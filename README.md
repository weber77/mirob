## Description
backend for miro.

## Installation

```bash
$ npm install
```

## Running the app

### get mysql ready

run a mysql db with docker compose

```bash
$ docker compose up -d
```

duplicate the `.env.example` file change name to `.env` and update the values

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=my-secret-pw
DB_NAME=miro_db
```



### run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

