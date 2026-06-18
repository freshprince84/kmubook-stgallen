# KMU Booking Tool — SPEC.md
**Projekt:** Schweizer Online-Buchungstool für Coiffeure & Therapeuten  
**Stand:** Juni 2026 | **Status:** Planung / MVP-Start  
**Owner:** Patrick Ammann | **Stack:** React + Node.js + PostgreSQL

---

## 1. VISION & WHY

### Warum dieses Tool?
- **Pain Point:** Schweizer Coiffeure und Therapeuten verlieren Geld durch No-Shows, koordinieren Termine manuell und haben keine Online-Buchung
- **Marktlücke:** Kein Tool kombiniert Twint + QR-Rechnung + CH-SMS + einfache Bedienung
- **Moat:** Lokalisierung schlägt internationale Konkurrenz (Calendly, SimplyBook, KLARA)

### Ziel
- Solo-Developer MVP: 2–4 Monate bis erste zahlende Kunden
- Pricing: CHF 49–79/Monat
- Ziel: 15–25 Kunden in 6 Monaten = CHF 1.200–2.000 MRR

---

## 2. USER STORIES

### 2.1 Als Dienstleister (Admin)
| # | Story | Akzeptanzkriterien |
|---|-------|-------------------|
| US-01 | Ich kann mein Studio/Name eintragen | Name, Adresse, Telefon, Öffnungszeiten |
| US-02 | Ich kann meine Dienstleistungen definieren | Name, Dauer (15/30/60/90 min), Preis |
| US-03 | Ich kann Verfügbarkeit setzen | Wochentage, Uhrzeiten pro Service |
| US-04 | Ich erhalte SMS-Erinnerungen an Kunden | Automatisch 24h + 2h vor Termin |
| US-05 | Kunden können Twint-Anzahlung leisten | Für Ersttermin oder auf Wunsch |
| US-06 | Ich kann gebuchte Termine sehen | Kalender-View, alle forthcoming appointments |
| US-07 | Ich erhalte QR-Rechnung für meine Einnahmen | Monatliche Übersicht, exportierbar |

### 2.2 Als Kunde (Endbenutzer)
| # | Story | Akzeptanzkriterien |
|---|-------|-------------------|
| US-08 | Ich kann verfügbare Termine sehen | Kalender + Zeit-Slots pro Tag |
| US-09 | Ich kann einen Termin buchen | Service wählen, Zeit wählen, Name + Tel |
| US-10 | Ich erhalte Bestätigung per SMS | "Termin bestätigt: [Datum] [Zeit] bei [Studio]" |
| US-11 | Ich erhalte Erinnerung per SMS | 24h + 2h vor Termin |
| US-12 | Ich kann ohne Account buchen | Kein Login nötig für Kunden |
| US-13 | Ich kann Termin absagen | SMS-Link oder URL zur Stornierung |

---

## 3. MVP FEATURES (Phase 1 — Monat 1–2)

### Must Have
1. **Studio-Profil** — Name, Adresse, Öffnungszeiten, Kontakt
2. **Services** — CRUD, Dauer, Preis pro Service
3. **Verfügbarkeits-Kalender** — Wochenbasiert, Slot-Generation
4. **Buchungs-Widget** — Embeddable oder eigene Domain
5. **Bestätigungs-SMS** — CH-Nummer (z.B. von Twilio CH oder местный Anbieter)
6. **Erinnerungs-SMS** — Automatisch 24h + 2h vorher
7. **Admin-Kalender** — Tages-/Wochenansicht aller Buchungen
8. **Minimal-Backoffice** — Dashboard mit Buchungen, Kunden

### Nice to Have (Phase 2)
- Twint-Integration für Anzahlungen
- QR-Rechnung für Einnahmen
- Google Calendar Sync
- local.ch-Export

### Out of Scope (vorerst)
- Payments ohne Twint
- iOS/Android App
- Multi-Standort
- Employee Management
- Online-Payment ohne Twint

---

## 4. TECHNISCHES DESIGN

### 4.1 Stack
| Komponente | Technologie | Begründung |
|---|---|---|
| **Frontend** | React 18 + TypeScript | Patrick kennt es, schnelle Prototypen |
| **Backend** | Node.js + Express oder Fastify | Passt zum Stack |
| **Datenbank** | PostgreSQL | Zuverlässig, gut für relationale Daten |
| **SMS** |local CH SMS Gateway (z.B. SMS Pirates, AnyMundi) oder Twilio mit CH-Nummer | CH-SMS mit lokaler Nummer |
| **Twint** | Twint API / SIX Pay | Anzahlungen |
| **QR-Rechnung** | qr-spp, einheimische CH Lib | Schweizer Zahlungsstandard |
| **Hosting** | Hetzner Cloud (€4/Monat) oder VPS | Günstig, CH-nah |
| **Domain** | .ch-Domain | Lokale Präsenz |
| **CI/CD** | GitHub Actions + CapRover oder PM2 | Einfach, kostenlos |

### 4.2 Datenmodell (Draft)

```
Studios
├── id (UUID)
├── name
├── slug (URL-freundlich)
├── address, city, phone, email
├── timezone (Europe/Zurich)
├── openingHours (JSON: { monday: [{from:'09:00',to:'18:00'}], ... })
├── twintMerchantId (optional)
└── createdAt, updatedAt

Services
├── id
├── studioId → Studios
├── name
├── duration (minutes)
├── price (CHF)
├── description (optional)
├── isActive
└── sortOrder

Appointments
├── id
├── studioId → Studios
├── serviceId → Services
├── customerName
├── customerPhone
├── customerEmail (optional)
├── date (Date)
├── startTime (TIME)
├── endTime (calculated: start + duration)
├── status (booked | confirmed | cancelled | completed)
├── twintPaymentStatus (pending | paid | refunded | null)
├── twintPaymentId (optional)
├── reminder24hSent (boolean)
├── reminder2hSent (boolean)
├── createdAt
└── updatedAt

Users (Admin-Login)
├── id
├── studioId → Studios
├── email
├── passwordHash
├── role (admin | owner)
└── createdAt
```

### 4.3 API Endpoints (Draft)

```
Auth
POST   /api/auth/login
POST   /api/auth/register

Studios
GET    /api/studios/:slug
PUT    /api/studios/:id        (auth required)

Services
GET    /api/studios/:slug/services
POST   /api/studios/:slug/services   (auth required)
PUT    /api/services/:id              (auth required)
DELETE /api/services/:id              (auth required)

Availability
GET    /api/studios/:slug/availability?date=YYYY-MM-DD
       → Gibt verfügbare Slots für den Tag zurück

Appointments (Public)
POST   /api/studios/:slug/appointments        (kein Auth nötig)
GET    /api/studios/:slug/appointments/:id     (SMS-Code oder Link)
DELETE /api/studios/:slug/appointments/:id/cancel

Appointments (Admin)
GET    /api/studios/:id/appointments          (auth required)
       ?from=YYYY-MM-DD&to=YYYY-MM-DD&status=booked
PATCH  /api/appointments/:id                   (auth required)
       { status: 'confirmed' | 'cancelled' | 'completed' }

Dashboard
GET    /api/studios/:id/dashboard             (auth required)
       → today's appointments, upcoming count, revenue (month)
```

### 4.4 SMS-Integration (Detail)

**Anbieter:** SMS Pirates CH (oder ähnlich CH-Anbieter)
- CH-Nummer als Absender (funktioniert besser als +41...)
- Preis: ca. CHF 0.08–0.12 pro SMS
- API: REST, einfach zu integrieren

**Flow:**
1. Kunde bucht → SMS an Kunde: "Bestätigung: [Datum] [Zeit] bei [Studio]. Buchungscode: [CODE]"
2. 24h vorher → Erinnerungs-SMS
3. 2h vorher → Zweite Erinnerungs-SMS
4. Admin-Benachrichtigung bei neuer Buchung (optional)

### 4.5 Twint-Integration (Phase 2)

**Option A: SIX Pay (Twint Business)**
- Offizieller Twint-Acceptance
- Kosten: Transaktionsgebühr ~1.5–2%
- Komplexität: Mittel (Zertifizierung nötig)

**Option B: Passarel / Qonto / Reveal**
- Banking mit Twint-Integration
- Einfacher als SIX, aber weniger Kontrolle

**Empfehlung Phase 1:** Kein Twint — erst Kunden gewinnen, dann Twint als Upgrade anbieten.

### 4.6 Frontend-Screens (MVP)

```
Public (Kunde):
├── /[studio-slug]           → Landing + Buchungs-CTA
├── /[studio-slug]/book      → Service wählen → Slot wählen → Daten eingeben → Bestätigung
└── /[studio-slug]/cancel/[id] → Termin absagen

Admin:
├── /admin/login             → Login
├── /admin/dashboard         → Heute, diese Woche, KPIs
├── /admin/calendar          → Kalender mit allen Terminen
├── /admin/appointments      → Liste aller Termine, Filter nach Datum/Status
├── /admin/services          → Services verwalten
└── /admin/settings          → Studio-Einstellungen, Öffnungszeiten, SMS-Config
```

---

## 5. WETTBEWERBS-ANALYSE

| Tool | Preis | Twint | QR-Rechnung | CH-SMS | Einfachheit |
|------|-------|-------|-------------|--------|-------------|
| **Calendly** | ab CHF 13 | ❌ | ❌ | ⚠️ | ✅✅ |
| **SimplyBook** | ab CHF 29 | ❌ | ❌ | ⚠️ | ✅ |
| **KLARA** | CHF 35 | ❌ | ✅ | ❌ | ✅ |
| **Cal.com** | Self-hosted | ❌ | ❌ | ❌ | ✅✅ |
| **Patrick's Tool** | CHF 49-79 | ✅(P2) | ✅(P2) | ✅ | ✅✅ |

**Differenzierung:** Einfachheit wie Calendly, aber für Service-Business (nicht Meetings), mit Schweizer Lokalisierung.

---

## 6. PRICING

| Plan | Preis | Features |
|------|-------|----------|
| **Starter** | CHF 49/Monat | 1 Studio, 10 Services, SMS-Erinnerungen, Basic Kalender |
| **Professional** | CHF 79/Monat | Alles + Twint-Anzahlungen, QR-Rechnungen, mehr Services |
| **Gruppen** | auf Anfrage | Multi-Standort, Team-Features |

**Early Adopter:** CHF 39/Monat für erste 10 Kunden (6 Monate Garantie)

---

## 7. TIME-TO-MARKET

### Monat 1: Core MVP
- [x] Repo + README
- [ ] Auth (Admin-Login)
- [ ] Studio-Profil CRUD
- [ ] Service CRUD
- [ ] Verfügbarkeits-Engine
- [ ] Buchungs-Widget (öffentlich)
- [ ] SMS-Bestätigung
- [ ] Admin-Dashboard
- [ ] Deployment + Domain

### Monat 2: Feedback & Polish
- [ ] 1–2 Beta-Kunden (gratis)
- [ ] SMS-Erinnerungen
- [ ] Booking-Flow testen
- [ ] Bugs fixen
- [ ] Erste Zahlung integrieren (Twint oder manuell via QR-Rechnung)

### Monat 3–4: Erste Kunden
- [ ] 5 erste zahlende Kunden
- [ ] Twint-Integration
- [ ] QR-Rechnung

---

## 8. RISIKEN & GEGENMASSNAHMEN

| Risiko | Wahrscheinlichkeit | Gegenmassnahme |
|--------|-------------------|----------------|
| SMS-Anbieter funktioniert nicht CH-weit | Mittel | Backup-Anbieter (2 SMS-Anbieter) |
| Zu wenig Kunden-Buchungen | Mittel | Intensives Onboarding, persönlicher Support |
| Patrick verliert Motivation | Mittel | Kleine Meilensteine, erste Kunden schnell |
| Twint-Integration komplex | Hoch | Phase 2, erst ohne Payment starten |
| Konkurrent übernimmt Markt | Niedrig | Lokale Präsenz + Support als Moat |

---

## 9. NÄCHSTE SCHRITTE

1. ✅ Repo erstellt (https://github.com/freshprince84/kmubook-stgallen)
2. ⬜ README.md aktualisieren mit SPEC.md Inhalten
3. ⬜ Projektstruktur aufsetzen (React + Node + PostgreSQL)
4. ⬜ Auth-System
5. ⬜ 1–2 Beta-Kunden für Feedback

---

*Letzte Änderung: 2026-06-18*
