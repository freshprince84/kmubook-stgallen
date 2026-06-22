# Lokale Entwicklung

## Voraussetzungen

- Node.js 20+
- Docker Desktop (für PostgreSQL)

## Erstes Setup (einmalig)

```bash
# 1. Branch holen
git checkout cursor/booking-mvp-2514

# 2. PostgreSQL starten
docker compose up -d

# 3. App einrichten
cd web
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
```

**Alternativ vom Repo-Root:**

```bash
npm run setup
```

## Dev-Server starten (bei jedem Arbeiten)

```bash
# vom Repo-Root
npm run dev

# oder
cd web && npm run dev
```

→ http://localhost:3000/coiffeur-blum/book

**`ERR_CONNECTION_REFUSED`** bedeutet: Dev-Server läuft nicht. `npm run dev` ausführen.

## Demo-Zugänge

| Was | URL / Login |
|---|---|
| Buchung | http://localhost:3000/coiffeur-blum/book |
| Admin | http://localhost:3000/admin/login |
| Login | admin@coiffeur-blum.ch / demo1234 |

## Neuen Lead-Prototyp

```bash
npm run studio:new -- "Coiffure Teresa" coiffure-teresa "071 222 88 34"
```

## SMS-Reminder (Cron)

Stündlich aufrufen (z.B. cron-job.org oder System-Cron):

```bash
curl -X POST http://localhost:3000/api/cron/reminders \
  -H "Authorization: Bearer DEIN_CRON_SECRET"
```

`CRON_SECRET` in `web/.env` setzen.

## Production Build

```bash
npm run build
```
