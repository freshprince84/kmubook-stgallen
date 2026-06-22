# ADR-002: Hybrid Content Model

**Status:** Akzeptiert | **Datum:** 2026-06-19

## Kontext

5 Sales-Prototypen mit echten Texten, aber ohne vollwertiges CMS.

## Entscheidung

- **DB:** Services, Team, Branding, Öffnungszeiten
- **Code:** Marketing-Sections in `studio-content.ts` pro Slug
- **Seed:** Vollständige Studio-Daten in `prisma/seeds/studios.ts`

## Begründung

- Schnelle Demo-Qualität ohne CMS-Overhead
- Preise/Team im Admin editierbar
- Marketing-Texte stabil bis CMS Phase 2

## Konsequenzen

- Textänderungen erfordern Deploy (bis CMS)
- Klare Trennung: was ist DB vs. Code dokumentiert
