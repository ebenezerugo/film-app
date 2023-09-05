<h1 align="center">Film App</h1>

  <p align="center">A simple application that return film information built with NestJs.<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Installation

```bash
$ npm install
```

## Quick run

```bash
cd film-app/
cp env-example .env
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## development

```bash
cd backend-core-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080

## Database utils

Generate migration - Automatically generate migration files with schema already existing.

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable 
```

Create migration - Fresh migration file.

```bash
npm run migration:create -- src/database/migrations/CreateNameTable 
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker compose -p ci rm -svf
```
