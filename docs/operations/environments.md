# Umgebungen

**Stand:** 2026-06-19

| Umgebung | Host | Zweck | Datenbank |
|---|---|---|---|
| **Lokal (User PC)** | `localhost:3000` | Entwicklung & Demo | Docker PostgreSQL |
| **Cursor Cloud VM** | Remote Linux | Agent-Entwicklung, Build, Git Push | PostgreSQL lokal (falls installiert) |
| **GitHub** | — | Source of Truth | — |
| **Staging** | ❌ noch nicht | Pre-Prod Tests | — |
| **Produktion** | ❌ noch nicht (SPEC: Hetzner) | Live-Kunden | Managed PostgreSQL |

## Regeln

- Dev-Server nur vom User starten (lokal) — ausser explizit in Cloud
- Kein PROD-Deploy ohne User-Erlaubnis
- Builds nicht parallel auf derselben Maschine

## Demo-URLs (lokal nach Seed)

| Studio | URL |
|---|---|
| Coiffeur Blum | http://localhost:3000/coiffeur-blum |
| Physio 9000 | http://localhost:3000/physio-9000 |
| Coiffure Teresa | http://localhost:3000/coiffure-teresa |
| Hair Creativ Daniel | http://localhost:3000/hair-creativ-daniel |
| Gold Hairstyling | http://localhost:3000/gold-hairstyling |

Admin: `admin@<slug>.ch` / `demo1234`
