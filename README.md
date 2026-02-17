# Zerkalo API

NestJS + Prisma backend for the Zerkalo Telegram bot.

## Environment variables

Copy `api/.env.example` to `api/.env` and fill in the values.

Minimum required:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `BOT_PROMPT_DOCUMENT_ID`

## Local development

From `api/`:

```bash
npm install
npx prisma migrate dev
npm run start:dev
```

## Production migrations

Do not use `prisma migrate dev` in production.

To apply existing migrations (from `api/prisma/migrations`) to the production database, run:

```bash
npx prisma migrate deploy
```

If you use Docker Compose, run it inside the API container (see the root README).

Swagger (when API is running):

- http://localhost:3000/docs

## Prisma (common commands)

From `api/`:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```
