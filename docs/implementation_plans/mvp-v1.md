# MVP v1 — Implementierungsplan

**Stand:** 2026-06-19 | **Branch:** `cursor/booking-mvp-2514`

## Ziel

Verkaufbares Multi-Tenant-Buchungstool für Coiffeure/Therapeuten in St. Gallen:
- Vorgelabelter Prototyp pro Studio (Slug, Name, Farbe)
- Öffentliche Buchung ohne Kunden-Login
- SMS-Bestätigung (Provider abstrahiert, Mock ohne API-Key)
- Admin: Services, Kalender, Einstellungen
- **30 Tage Trial**, danach Abo CHF 39/Mt. (Stripe vorbereitet)
- SMS: 50 inkl./Mt., Zusatz CHF 0.10/SMS

## Stack (Entscheidung)

| Komponente | Technologie | Begründung |
|---|---|---|
| App | Next.js 15 App Router + TypeScript | Full-Stack, schnell solo |
| DB | PostgreSQL + Prisma | Wie SPEC, relationales Modell |
| Auth | JWT (httpOnly Cookie) | Einfach, kein Extra-Service |
| Styling | Tailwind CSS | Schnell, modern |
| Zahlung | Stripe (Checkout + Webhook) | Standard SaaS |
| SMS | Abstraktion + Mock/HTTP-Provider | Ohne Key lauffähig |

## Scope MVP (Must Have)

1. Studio-Profil + Branding (`primaryColor`, `slug`)
2. Services CRUD
3. Slot-Engine (Öffnungszeiten JSON, Kollisionen)
4. Public Booking `/{slug}/book`
5. SMS bei Buchung
6. Admin Kalender + Dashboard
7. Trial-Expiry (Buchung blockiert wenn abgelaufen + nicht aktiv)
8. Seed: Demo-Studio `coiffeur-blum`

## Nicht in v1

- Twint Kunden-Zahlung (Phase 2)
- QR-Rechnung
- Reminder-Cron 24h/2h (Struktur vorbereitet, Cron separat)
- Self-Service Registrierung (Studios via Seed/Script)

## API (Auszug)

```
POST   /api/auth/login
GET    /api/studios/[slug]
GET    /api/studios/[slug]/services
GET    /api/studios/[slug]/availability?date=&serviceId=
POST   /api/studios/[slug]/appointments
DELETE /api/appointments/[id]/cancel?token=
GET    /api/admin/dashboard
CRUD   /api/admin/services
GET    /api/admin/appointments
POST   /api/webhooks/stripe
```

## Verzeichnisstruktur

```
web/
  src/app/           # Pages + API Routes
  src/lib/           # slots, auth, sms, billing
  prisma/schema.prisma
docs/
  implementation_plans/
  implementation_reports/
```
