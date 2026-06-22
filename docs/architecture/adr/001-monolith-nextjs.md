# ADR-001: Monolith mit Next.js 15

**Status:** Akzeptiert | **Datum:** 2026-06-19

## Kontext

Solo-Entwickler, B2B SaaS Multi-Tenant, schnelle Iteration für Sales-Prototypen.

## Entscheidung

Next.js 15 App Router als Full-Stack-Monolith (Frontend + API Routes + SSR).

## Begründung

- Eine Codebase, ein Deploy
- SSR/SEO für Studio-Websites
- TypeScript End-to-End mit Prisma

## Konsequenzen

- Skalierung zunächst vertikal
- Kein separates Mobile-API nötig für MVP
