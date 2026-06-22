# ADR-003: Twint via PSP (Mock → Payrexx)

**Status:** Akzeptiert | **Datum:** 2026-06-19

## Kontext

Twint hat keine öffentliche Merchant-API. CH-KMU erwarten Twint für Anzahlungen.

## Entscheidung

1. **Prototyp:** UI + Mock-Payment (`Payment` mit `provider: mock`)
2. **Produktion:** Payrexx als Payment Facilitator (Alternative: Mollie)

## Begründung

- Payrexx: ein Vertrag, TWINT inkl., CH-KMU-fokussiert
- Mock ermöglicht Sales-Demos ohne PSP-Onboarding

## Konsequenzen

- Stripe bleibt nur für Studio-Abo (SaaS)
- Twint Live = Professional Tier CHF 79/Mt.
