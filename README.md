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

Swagger (when API is running):

- http://localhost:3000/docs

## Prisma (common commands)

From `api/`:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```
