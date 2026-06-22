# Dokumentation — kmubook-stgallen

**Stand:** 2026-06-19  
**Repo:** [github.com/freshprince84/kmubook-stgallen](https://github.com/freshprince84/kmubook-stgallen)

Zentrale Übersicht aller Projekt-Dokumente. Hierarchie gemäss `.cursor/rules/immer.mdc`:

| Stufe | Datei | Zweck |
|---|---|---|
| 1 | `.cursor/rules/immer.mdc` | Grundregeln für Agents |
| 2 | `README.md`, `SPEC.md` | Vision, Markt, technische Spec |
| 3 | `docs/` | Implementierung, Pläne, Reports |

---

## Wo wird entwickelt?

| Umgebung | Was | Status |
|---|---|---|
| **Cursor Cloud Agent** | Remote-Linux-VM (`cursor`, Ubuntu). Code schreiben, Build, Git Push. Kein Produktionsserver. | Aktiv |
| **Dein PC (lokal)** | `git clone` → `npm run dev` → `localhost:3000`. Deine Maschine, deine DB (Docker). | Vom User gestartet |
| **GitHub** | Source of Truth: Branches, PRs, Issues | Aktiv |
| **Produktion (Hetzner o.ä.)** | SPEC geplant, **noch nicht deployed** | ❌ Nicht live |

**Wichtig:** Es gibt aktuell **keinen öffentlichen Produktionsserver**. Alles Laufende ist Entwicklung (Cloud-VM oder dein localhost).

---

## Dokumenten-Register

### Stufe 2 — Überblick

| Dokument | Inhalt | Qualität |
|---|---|---|
| [README.md](../README.md) | Konkurrenz, Markt, Kundenakquise, Fördergelder | Gut (Business) |
| [SPEC.md](../SPEC.md) | Vision, User Stories, Datenmodell, MVP-Scope, Risiken | Mittel (Spec, aber veraltet teilweise) |

### Stufe 3 — Planung & Umsetzung (`docs/`)

| Dokument | Branch | Status | Inhalt |
|---|---|---|---|
| [architecture/overview.md](architecture/overview.md) | prototype-design | ✅ | C4, Routing, Content-Strategie |
| [architecture/adr/](architecture/adr/) | prototype-design | ✅ | ADR-001–003 |
| [requirements/functional.md](requirements/functional.md) | prototype-design | ✅ | REQ-IDs + Traceability |
| [design/design-system.md](design/design-system.md) | prototype-design | ✅ | Tokens, Komponenten |
| [operations/environments.md](operations/environments.md) | prototype-design | ✅ | Lokal / Cloud / Prod |
| [implementation_plans/mvp-v1.md](implementation_plans/mvp-v1.md) | `cursor/booking-mvp-2514` | ✅ Umgesetzt | MVP-Scope |
| [implementation_plans/prototype-top5.md](implementation_plans/prototype-top5.md) | prototype-top5-plan | ✅ Plan | Website-Ersatz, 5 Leads |
| [implementation_reports/mvp-v1.md](implementation_reports/mvp-v1.md) | booking-mvp | ✅ | MVP Report |
| [pricing-gtm.md](pricing-gtm.md) | main | ✅ | Preise, Sales-Flow |
| [LOCAL_DEV.md](LOCAL_DEV.md) | main | ✅ | Lokales Setup |
| [CLOUD_DEV.md](CLOUD_DEV.md) | main | ✅ | **Cloud + Port-Forwarding** |

| Dokument | Inhalt |
|---|---|
| [web/README.md](../web/README.md) | Schnellstart Web-App |

### Pull Requests

| PR | Branch | Inhalt |
|---|---|---|
| #1 | `cursor/booking-mvp-2514` | MVP-Implementierung |
| #3 | `cursor/prototype-design-2514` | Prototyp-Implementierung |

---

## Lücken vs. professioneller Software-Planung (State of the Art)

Aktuell fehlen für eine vollständige, umsetzbare Planungsbasis:

| Standard-Dokument | Status | Priorität |
|---|---|---|
| Dokumentations-Index | ✅ Diese Datei | — |
| ADRs (Architecture Decision Records) | ✅ 3 ADRs | — |
| Anforderungskatalog mit IDs + Traceability | ✅ functional.md | — |
| Technisches Design (TDD) / API-Spec (OpenAPI) | ⚠️ overview only | Mittel |
| NFRs (Performance, Security, DSGVO) | ⚠️ teilweise | Mittel |
| Teststrategie + Akzeptanztests | ❌ | Mittel |
| Deployment-/Umgebungsmatrix | ✅ environments.md | — |
| Design-Spec (Figma/Tokens/Komponenten-Matrix) | ✅ design-system.md | — |
| Content-Migrations-Checklisten (pro Lead) | ⚠️ in Seed + prototype-top5 | Niedrig |
| Roadmap mit Meilensteinen + Definition of Done | ⚠️ verstreut | Niedrig |

**Fazit:** Planungsbasis für Prototyp v1 ist **ausreichend**. Offen: OpenAPI, NFR-Doc, Teststrategie.

---

## Empfohlene Dokumenten-Struktur (Ziel)

```
docs/
├── README.md                          ← dieser Index
├── LOCAL_DEV.md
├── pricing-gtm.md
├── architecture/
│   ├── overview.md                    ← Systemkontext, C4 Level 1–2
│   └── adr/                           ← Architecture Decision Records
├── requirements/
│   ├── functional.md                  ← REQ-001… mit Akzeptanzkriterien
│   └── non-functional.md              ← Performance, Security, DSGVO
├── design/
│   ├── design-system.md               ← Tokens, Komponenten, Templates
│   └── api/openapi.yaml               ← API-Vertrag
├── implementation_plans/
│   ├── mvp-v1.md
│   └── prototype-top5.md
├── implementation_reports/
│   └── mvp-v1.md
├── content/
│   └── leads/                         ← Pro Lead: Content-Inventory
│       ├── coiffeur-blum.md
│       └── …
└── operations/
    ├── environments.md                ← local / staging / prod
    └── deployment.md
```

---

## Nächster Schritt (Planung professionalisieren)

Vor Umsetzung Prototyp Phase A:

1. ADR-001 bis ADR-005 (Stack, Multi-Tenant, Twint-PSP, CMS-Ansatz, Hosting)
2. `requirements/functional.md` — REQ-IDs aus SPEC + prototype-top5
3. `design/design-system.md` — aus prototype-top5 §2 extrahieren + Wireframe-Beschreibungen
4. `operations/environments.md` — klar: Cloud Agent vs. lokal vs. Prod
