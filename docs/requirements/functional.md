# Funktionale Anforderungen

**Stand:** 2026-06-19

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| REQ-001 | Multi-Tenant Studio per Slug | Must | ✅ MVP |
| REQ-002 | Öffentliche Website (Home, Über uns, Leistungen, Kontakt) | Must | ✅ Prototyp |
| REQ-003 | Impressum & Datenschutz pro Studio | Must | ✅ Prototyp |
| REQ-004 | Online-Buchung ≤4 Schritte | Must | ✅ Prototyp |
| REQ-005 | SMS-Bestätigung bei Buchung | Must | ✅ MVP |
| REQ-006 | Admin: Services, Kalender, Settings | Must | ✅ MVP |
| REQ-007 | 30-Tage-Trial + Abo-Logik | Must | ✅ MVP |
| REQ-008 | Twint-Anzahlung UI (Mock) | Should | ✅ Prototyp |
| REQ-009 | Service-Kategorien | Should | ✅ Prototyp |
| REQ-010 | Team-Anzeige | Should | ✅ Prototyp |
| REQ-011 | Twint Live (Payrexx) | Could | ⬜ Phase 2 |
| REQ-012 | Custom Domain | Could | ⬜ Phase 2 |
| REQ-013 | CMS Seiten-Editor | Could | ⬜ Phase 2 |

## Akzeptanzkriterien REQ-004 (Buchung)

1. Service wählen aus buchbaren Services
2. Datum + Slot aus Verfügbarkeit
3. Name + Telefon erfassen
4. Optional Twint-Anzahlung wenn `depositEnabled`
5. Bestätigung + SMS

## Traceability

| Plan | Requirements |
|---|---|
| `mvp-v1.md` | REQ-001, 004–007 |
| `prototype-top5.md` | REQ-002, 003, 008–010 |
