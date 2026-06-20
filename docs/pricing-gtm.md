# Pricing & Go-to-Market

**Stand:** 2026-06-19

## Preismodell

| Plan | Preis | Inhalt |
|---|---|---|
| **Starter (Trial)** | 30 Tage gratis | Volle Funktion |
| **Starter** | CHF 39/Monat | 1 Studio, Buchungen, 50 SMS/Mt. |
| **SMS-Zusatz** | CHF 0.10/SMS | Über Limit |
| **Professional** | CHF 79/Monat | Phase 2: Twint, 200 SMS, QR |

Optional einmalig: **CHF 0–200 Setup** („Wir richten alles ein“).

## Sales-Flow

1. Lead aus Kundenliste → Studio in DB anlegen (Name, Services, Öffnungszeiten)
2. Link senden: `https://app.domain.ch/{slug}/book`
3. 30 Tage Trial (`trialEndsAt`)
4. Tag 31: Paywall — Stripe Checkout oder Buchungslink deaktiviert

## Technische Umsetzung

- `Studio.subscriptionStatus`: `trial` | `active` | `past_due` | `cancelled`
- `Studio.smsUsedThisMonth` + Reset am Monatsanfang (Cron)
- `Studio.trialEndsAt`: Default +30 Tage bei Anlage
