# Similarity API

A text similarity API with a developer dashboard. Send two pieces of text and get back a similarity score from 0 to 1. Users sign in with Google, create an API key in the dashboard and call the API from their own apps.

Built with **Next.js 13 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma** and the **OpenAI embeddings API**.

## How it works

1. Both texts are turned into vectors with OpenAI's `text-embedding-ada-002` model.
2. The API computes the **cosine similarity** between the two vectors.
3. Every request is checked against the caller's API key, logged, and rate-limited.

```bash
curl -X POST https://<your-domain>/api/v1/similarity \
  -H "Content-Type: application/json" \
  -d '{"authorization": "<your-api-key>", "text1": "First text", "text2": "Second text"}'
```

## Features

- **Authentication** with Google via NextAuth.js
- **API key management:** create and revoke keys from the dashboard
- **Usage dashboard** with a table of recent requests (MUI Data Grid)
- **Rate-limiting middleware** with Upstash Redis (sliding window per IP)
- **Documentation page** with code examples and copy-to-clipboard
- **Light and dark theme**
- **Input validation** with Zod

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 13 (App Router and API routes), React 18, TypeScript |
| UI | Tailwind CSS, Radix UI, class-variance-authority, MUI Data Grid, Framer Motion |
| Auth | NextAuth.js with Prisma adapter, Google provider |
| Data | Prisma ORM, MySQL |
| Infrastructure | Upstash Redis rate limiting, OpenAI API |
| Code quality | ESLint, Prettier, Husky, lint-staged |

## Project structure

```
src/app/            Pages: landing, login, dashboard, documentation
src/pages/api/      API routes: similarity, API key create and revoke, auth
src/components/     UI components and design-system primitives (components/ui)
src/helpers/        Cosine similarity, API key helpers, docs code samples
src/lib/            Auth, database, OpenAI client, API middlewares
prisma/             Database schema
```

## Getting started

```bash
git clone https://github.com/koylyakandriy/Similarity.git
cd Similarity
yarn
# create .env with the variables below
npx prisma db push
yarn dev
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | MySQL connection string |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `OPENAI_API_KEY` | OpenAI API key |
| `REDIS_URL`, `REDIS_SECRET` | Upstash Redis credentials for rate limiting |
