# KMU Buchungs-Tool — Web App

Next.js Full-Stack App für Online-Buchungen.

## Schnellstart

```bash
# PostgreSQL starten (im Repo-Root)
docker compose up -d

cd web
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

## Demo-Zugang

| | |
|---|---|
| **Buchung** | http://localhost:3000/coiffeur-blum/book |
| **Admin** | admin@coiffeur-blum.ch / demo1234 |

## Dokumentation

- [MVP Plan](../docs/implementation_plans/mvp-v1.md)
- [Pricing & GTM](../docs/pricing-gtm.md)
- [SPEC.md](../SPEC.md)
