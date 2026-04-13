# Deploy to Vercel with a free database (Neon)

## 1. Neon — free PostgreSQL

1. Create an account at [https://neon.tech](https://neon.tech).
2. Create a project; open **Connection details**.
3. Copy the **connection string** (use the **pooled** URL if both are listed — best for serverless/Vercel).
4. Ensure it includes SSL, e.g. `?sslmode=require` at the end if Neon shows it.

## 2. GitHub + Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), **Import** the repository.
3. Leave **Build Command** as default (`npm run build` → runs Prisma + Next.js).

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

Add for **Production** (and Preview if you want):

| Name | Value |
|------|--------|
| `DATABASE_URL` | Your Neon connection string |
| `ADMIN_PASSWORD` | Password for `yoursite.vercel.app/admin` |
| `SESSION_SECRET` | Long random string (e.g. run `openssl rand -hex 32`) |

Redeploy after saving variables.

The build runs `prisma db push` so tables are created on Neon automatically on each deploy (schema changes apply there).

## 4. Seed resume content (once)

After the first successful deploy, from your PC:

```bash
# Windows PowerShell — paste your Neon URL
$env:DATABASE_URL="postgresql://....neon.tech/neondb?sslmode=require"
npx prisma db seed
```

Use the same URL as in Vercel. This fills profile, skills, projects, etc.

## 5. Local development

Copy `.env.example` to `.env` and set `DATABASE_URL` to local Postgres or Neon.

---

**Notes**

- Do not commit `.env` with production secrets.
- If the build fails on `db push`, check that `DATABASE_URL` is correct and Neon allows connections from the internet (default).
