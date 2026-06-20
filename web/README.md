# KMU Buchungs-Tool — Web App

Next.js Full-Stack App für Online-Buchungen.

## Schnellstart

Siehe **[docs/LOCAL_DEV.md](../docs/LOCAL_DEV.md)** für die vollständige Anleitung.

```bash
docker compose up -d
cd web && cp .env.example .env && npm install
npx prisma db push && npm run db:seed
npm run dev   # ← Pflicht, sonst ERR_CONNECTION_REFUSED
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
