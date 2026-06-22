# Architektur-Übersicht

**Stand:** 2026-06-19 | **Version:** Prototyp v1

## Systemkontext (C4 Level 1)

```
┌─────────────┐     HTTPS      ┌──────────────────┐
│ Endkunde    │ ─────────────► │ kmubook (Next.js) │
│ (Browser)   │                │ Multi-Tenant      │
└─────────────┘                └────────┬─────────┘
                                        │
┌─────────────┐                         │ Prisma
│ Studio-Admin│ ────────────────────────┤
└─────────────┘                         ▼
                               ┌──────────────────┐
                               │ PostgreSQL        │
                               └──────────────────┘
        Extern: SMS-Provider, Stripe (Abo), Payrexx/Mollie (Twint, Phase 2)
```

## Container (C4 Level 2)

| Container | Technologie | Verantwortung |
|---|---|---|
| Public Site | Next.js App Router | Studio-Website, SEO, Buchung |
| Admin | Next.js (geschützt) | Kalender, Services, Einstellungen |
| API Routes | Next.js Route Handlers | REST-JSON für Booking + Admin |
| DB | PostgreSQL 15+ | Studios, Services, Termine, Payments |

## Content-Strategie

- **Dynamisch (DB):** Services, Preise, Team, Öffnungszeiten, Branding
- **Statisch (Code):** Marketing-Texte pro Lead in `web/src/lib/studio-content.ts`
- **Rechtliches:** HTML-Templates im Seed (`impressumHtml`, `datenschutzHtml`)

## Routing

| Pfad | Beschreibung |
|---|---|
| `/{slug}` | Home |
| `/{slug}/ueber-uns` | Über uns |
| `/{slug}/leistungen` | Preisliste |
| `/{slug}/kontakt` | Kontakt & Anfahrt |
| `/{slug}/buchung` | Booking Wizard |
| `/{slug}/book` | Redirect → `/buchung` |
| `/admin/*` | Backoffice |

## Nächste Architektur-Schritte

- Custom Domain via Middleware (Host → slug)
- Medien-Upload (S3/R2)
- Payrexx Webhook für Twint Live
