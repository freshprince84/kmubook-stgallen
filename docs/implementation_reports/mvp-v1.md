# MVP v1 — Implementierungsreport

**Datum:** 2026-06-19 | **Branch:** `cursor/booking-mvp-2514` | **Status:** Umgesetzt

## Umgesetzt

| Feature | Status |
|---|---|
| Next.js 15 App (`web/`) | ✅ |
| Prisma + PostgreSQL Schema | ✅ |
| Multi-Tenant Studios (Slug, Branding) | ✅ |
| Slot-Engine | ✅ |
| Public Booking `/{slug}/book` | ✅ |
| SMS-Bestätigung (Mock ohne API-Key) | ✅ |
| Storno per Token `/{slug}/cancel/[token]` | ✅ |
| Admin: Login, Dashboard, Kalender, Services, Settings | ✅ |
| 30-Tage-Trial + Abo-Logik | ✅ |
| Stripe Checkout (optional, per Env) | ✅ |
| Demo-Seed Coiffeur Blum | ✅ |
| Docker Compose PostgreSQL | ✅ |

## Build

```bash
cd web && npm run build  # erfolgreich
```

## Demo-Zugang (nach `db:seed`)

- Buchung: `/coiffeur-blum/book`
- Admin: `admin@coiffeur-blum.ch` / `demo1234`

## Offen (Phase 2)

- SMS-Reminder Cron 24h/2h
- Twint Kunden-Anzahlung
- Self-Service Studio-Registrierung
- Script zum Anlegen weiterer Lead-Prototypen

## Dateien

- Plan: `docs/implementation_plans/mvp-v1.md`
- Pricing: `docs/pricing-gtm.md`
- App: `web/README.md`
