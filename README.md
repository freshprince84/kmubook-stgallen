# KMU Buchungs-Tool St. Gallen — Tiefgehende Analyse
**Patrick Ammann | Stand: Juni 2026 | solo, React/Node.js, kein Budget, Vibe Coder**

---

## 1. KONKURRENZ-ANALYSE

### 1.1 Die Konkurrenten im Überblick

| Tool | Preis (Monat) | Positioning | Stärken | Schwächen |
|---|---|---|---|---|
| **Calendly** | Free – $16/User (~CHF 14) | B2B-Meetings, global | Marktführer, Integrationen, Branding | Kein Payment, kein echtes Service-Business, kein SMS |
| **SimplyBook.me** | Free – €59.90 (~CHF 59) | Service-Businesses | Payment, SMS, viele Features | UI komplex, europäisch aber nicht CH-spezifisch |
| **Cal.com** | Free (self-hosted) / $15/User (~CHF 13) | Entwickler, Self-Host | Open Source, kostenlos self-host | Kein Payment integriert, keine CH-Lokalisierung |
| **KLARA (Schweizer Post)** | CHF 35/Monat (Booking-Modul) | Schweizer KMU | Swiss Post, CH-Support, Rechnungswesen integriert | Booking nur als Add-on, kein Kernfokus, teuer |
| **local.ch** | Gratis (Basis-Eintrag) | Schweizer Branchenbuch | Riesige Reichweite, CH-Markt | Keine echte Buchung, nur "Reservation" als Feature-Link |
| **Acuity Scheduling** | $20–$36 (~CHF 18–32) | US-Markt, Creative | Gutes Onboarding, Payments | Keine CH-Lokalisierung, kein Twint/SMS CH |
| **Bookit (CH)** | Unbekannt, Nischenanbieter | Schweizer Markt | CH-spezifisch? | Kleine Reichweite, wenig Marketing |
| **Toolora** | Unbekannt | DACH-Markt? | Angeblich günstig | Kein erkennbarer CH-Fokus, keine Reviews |
| **tutti** | Gratis (Kleinanzeigen) | CH-Kleinanzeigen | Kein Buchungstool | Nicht relevant für Dienstleister |

### 1.2 Was die Konkurrenten NICHT haben (Gap-Analyse)

**Was KEINER richtig macht für Schweizer KMUs:**

1. **Twint-Zahlung** — Kein einziges Tool integriert Twint nativ. In der Schweiz nutzen >60% der Bevölkerung Twint. Das ist ein massiver Pain Point.

2. **Schweizer Rechnungsstellung / QR-Rechnung** — Service-KMUs (Coiffeure, Therapeuten) arbeiten mit der Schweizer QR-Rechnung. Kein Buchungstool integriert das.

3. **SMS-Erinnerungen mit CH-Nummern** — SimplyBook.me und Calendly können SMS, aber nicht CH-Nummern korrekt oder zu vernünftigen Preisen.

4. **Gelbe Seiten / local.ch-Integration** — Kein Tool synchronisiert automatisch mit local.ch-Einträgen oder aktualisiert Öffnungszeiten.

5. **Einfachheit für Nicht-Techniker** — Calendly ist einfach, aber für Service-Business ungeeignet. SimplyBook.me ist feature-reich, aber komplex. Die Lücke: ein Tool, das SO EINFACH wie Calendly ist, aber für Service-Termine (nicht Meetings) gebaut ist.

6. **Kein White-Label für KMU** — Die wenigsten Tools erlauben vollständiges Custom-Branding ohne Aufpreis.

7. **Kein CH-Kundenservice** — Internationale Tools haben keinen Schweizer Support. Ein lokaler Anbieter kann das bieten.

8. **Kein Twint für Anzahlungen / Stornogebühren** — Coiffeure und Therapeuten verlieren viel Geld durch No-Shows. Ein Tool mit Twint-Anzahlung wäre Gold wert.

### 1.3 Konkurrenz-Strategie

**Calendly, SimplyBook.me, Cal.com greifen nicht direkt an, weil:**
- Calendly = Meetings (Arzt, Berater, Coach), NICHT Service-Termine
- SimplyBook.me = gut, aber komplex + keine CH-Zahlung
- KLARA = Buchhaltungs-Tool mit Booking als Feature, nicht umgekehrt

**Patrick's Vorteil:** Ein Buchungstool, das NUR Buchung macht, aber das perfekt. Mit Twint, QR-Rechnung, SMS-Erinnerungen, CH-Support und einfacher Bedienung.

---

## 2. SCHWEIZER FÖRDERGELDER FÜR DIGITALISIERUNG

### 2.1 Übersicht (Kanton St. Gallen)

#### A) INOS — Ostschweizer Netzwerk für Innovation (PRIMÄR RELEVANT)
- **Was:** Innovationsberatung, bis zu **25 Stunden kostenlos** für St. Galler KMU
- **Zielgruppe:** KMU mit innovativem Potenzial (alle Branchen)
- **Wert:** CHF 1.500–3.000 (25h à CHF 60-120 Beratung)
- **Zugang:** Über Startfeld St. Gallen oder direkt via [inos.swiss](https://inos.swiss)
- **Bedingungen:** Innovationsprojekt, regionaLe Ausstrahlung, nicht nur Standard-Digitalisierung
- **Status:** AKTIV und einfach zugänglich

#### B) Kantons St. Gallen — 8 neue Fördermassnahmen (ab 2024)
Der Kanton hat 2024 ein Paket von 8 Massnahmen zur Innovationsförderung beschlossen:
- InnoPortal (digitales Förderportal) — noch im Aufbau
- Die Massnahmen zielen auf Geschäftsmodell-Innovation, nicht reine Tool-Beschaffung
- **Relevanz für Patrick:** Mittel — er kann als Berater/Entwickler für KMUs auftreten, die Fördermittel beziehen

#### C) IT-Bildungsoffensive (ITBO) — Kanton St. Gallen
- Weiterbildungsangebote für KMU-Mitarbeitende in IT-Themen
- Relevant wenn Patrick selbst Weiterbildung braucht

#### D) Innosuisse
- Für F&E-Kooperationen mit Hochschulen
- **Für Patrick NICHT relevant** (er ist Solo-Entwickler, kein F&E-Projekt)

#### E) Interreg — Grenzüberschreitend
- Für Projekte CH-AT-DE-LI
- **Für Patrick NICHT relevant**

### 2.2 Bundesprogramme (auch für St. Galler KMU)

#### Digisport / Digitale Assistenz (abgelaufen)
- Einige Kantone hatten Digitale Gutscheine (ZH, BE, LU)
- **Kanton St. Gallen hat aktuell KEIN spezifisches Digitalisierungs-Gutschein-Programm**

#### Switzerland Global Enterprise (S-GE)
- Exportförderung — nicht relevant für lokale KMUs

### 2.3 Für KMUs < 10 Mitarbeitende

| Kriterium | Status |
|---|---|
| Spezielle Förderung für <10 MA? | NEIN — KMU = <250 MA, Förderung ist nicht nach Mitarbeiterzahl gestaffelt |
| INOS auch für Mikrounternehmen? | JA — kein Minimum, jedes KMU kann sich bewerben |
| Vorfinanzierung nötig? | JA — INOS-Coaching muss erst bezahlt, dann rückvergütet (bzw. kostenlos über Coach-Pool) |
| Steuerlich absetzbar? | JA — Digitalisierungs-Aufwand ist voll absetzbar |

### 2.4 Praktischer Tipp für Patrick

Patrick kann:
1. **Selbst INOS-Coaching beanspruchen** — er ist ein KMU (Solo-Unternehmen = auch ein KMU!). Kostenlos bis 25h Innovationsberatung. Themen: Geschäftsmodell, Pricing, Go-to-Market.
2. **Seinen Kunden INOS empfehlen** — wenn er ein KMU berät/einrichtet, kann er es auf INOS hinweisen (glaubwürdiger Partner).
3. **Die 8 Kanton-Massnahmen beobachten** — das InnoPortal kommt 2025/2026, könnte neue Fördermöglichkeiten bringen.

---

## 3. KONKRETE KUNDEN IN ST. GALLEN

### 3.1 Zielgruppe definieren

**Primär (MVP):**
- Coiffeure (Einzelunternehmen, Studios mit 1-5 Stühlen)
- Therapeuten (Physiotherapie, Massage, Ergotherapie)
- Kosmetikerinnen / Nagelstudios
- Personal Trainer / Fitnesstrainer mit Einzelterminen

**Sekundär (später):**
- Anwälte / Treuhänder (Beratungstermine)
- Zahnärzte / Ärzte (Terminmanagement)
- Hundestylisten, Reitställe, Tierärzte

### 3.2 Systematische Kundensuche

#### A) Google Maps Scraper (St. Gallen Stadt + Kanton)
```
Suchbegriffe für Scraper:
- "Coiffeur St. Gallen"
- "Physiotherapie St. Gallen"
- "Massage St. Gallen"
- "Kosmetik St. Gallen"
- "Fitnessstudio St. Gallen"
```
- Öffnungszeiten, Telefonnummern, Adressen extrahieren
- **Achtung:** Nur für eigene Akquise nutzen, nicht weiterverkaufen (DSGVO)

#### B) Gelbe Seiten (tel.search.ch / search.ch)
- Branchenbuch mit Filter nach Ort
- Direkt: Telefonnummer und Adresse
- Besser als Google Maps: strukturierte Daten

#### C) Facebook Marketplace / Facebook Seiten
- Lokale Coiffeur-/Therapeuten-Seiten finden
- Zeigt oft, ob sie bereits online buchbar sind

#### D) Branchenverbände direkt kontaktieren
- **Coiffeure:** Coiffeurverband St. Gallen (Coiffure Suisse) — KLARA hat exklusives Angebot über sie, ABER: Patrick kann ein besseres/billigeres Angebot machen
- **Physiotherapeuten:** physioswiss — grosse Verbände, könnten Kollektivvertrag anbieten

#### E) Google Maps vor Ort (physisch)
- "Walk & Call"-Methode: Durch die Stadt laufen, alle Coiffeure/Therapeuten notieren, dann anrufen
- Zeigt Engagement, schafft Vertrauen

### 3.3 Pain Points — Was ist es WIRKLICH wert?

**Die wahren Pain Points (erfahrungsbasiert):**

| Pain Point | Realer Schaden | Zahlungsbereitschaft |
|---|---|---|
| **No-Shows** (Kunde kommt nicht, ohne abzusagen) | 1-2x pro Woche = CHF 80-200 Verlust | CHF 50-150/Monat für Lösung |
| **Telefonische Terminvergabe** (zeitintensiv) | 30-60 Min/Tag für Terminmanagement | CHF 50-100/Monat für Ersparnis |
| **Doppelbelegung** (versehentlich doppelt gebucht) | Stress + Kundenverlust | CHF 50-80/Monat für Sicherheit |
| **Erinnerungs-SMS** (manuell senden) | Zeitverschwendung, wird vergessen | CHF 30-50/Monat für Automatisierung |
| **Kunden müssen anrufen** (Hemmschwelle) | Jüngere Kunden buchen nicht → Umsatzverlust | CHF 50-150/Monat für Online-Buchung |
| **Kein Überblick** (wer hat wann was gebucht?) | Stress, schlechte Auslastung | CHF 30-60/Monat für Kalender-Überblick |

**Gesamtwert für den Kunden: CHF 150-400/Monat**
Das ist die Summe der Schmerzen. Ein Tool, das alle löst, ist CHF 99-149/Monat wert.

### 3.4 Was bezahlen sie aktuell?

| Situation | Aktuelle Lösung | Kosten |
|---|---|---|
| Gar nichts | Telefon + Papierkalender | CHF 0 (aber hoher Zeitaufwand) |
| WhatsApp-Gruppe | WhatsApp für Terminabsprache | CHF 0 (Chaos, keine Übersicht) |
| Google Calendar | Kalender + manuell | CHF 0 (keine Kunden-UI) |
| SimplyBook.me | Internationales Tool | €29.90 (~CHF 29) |
| KLARA | Buchhaltung + Booking | CHF 35 (Booking-Add-on) |
| Papier + Telefon | Klassisch | CHF 0 (Zeitaufwand) |

**Fazit:** Viele nutzen noch gar nichts oder Papier. Die, die ein Tool nutzen, zahlen CHF 29-35/Monat. 
**Patrick's Chance:** Besser als Papier, einfacher als SimplyBook.me, günstiger als KLARA, CH-spezifisch = CHF 49-79/Monat.

### 3.5 Direkte Ansprache — Was sagt man am Telefon?

**Goldene Regeln:**
1. **Kurz sein** — max. 90 Sekunden
2. **Schmerz ansprechen, nicht Features**
3. **Kein Verkauf am Telefon** — Termin vereinbaren für Demo
4. **Lokal wirken** — "ich bin auch aus St. Gallen"

**Telefon-Script:**

```
"Kurzvorstellung (20 Sek):
'Hallo, hier ist [Name]. Ich bin lokaler Softwareentwickler aus St. Gallen 
und entwickle ein Online-Buchungstool speziell für Coiffeure und Therapeuten.'

Pain Point (40 Sek):
'Ich frage Sie kurz: Wie machen Sie aktuell Ihre Terminvergabe?
[Zuhören] ... Und wie oft passiert es, dass jemand nicht absagt und 
einfach nicht kommt? ... Und wie viel Zeit verbringen Sie damit, 
Termine per Telefon zu koordinieren?'

Nutzenversprechen (20 Sek):
'Wir entwickeln ein Tool, das genau das löst: Ihre Kunden können 
24/7 online buchen, bekommen automatisch SMS-Erinnerungen, 
und No-Shows werden seltener. Es ist auf Schweizer Kunden zugeschnitten —
mit Twint-Zahlung und QR-Rechnung.'

Call-to-Action (10 Sek):
'Ich würde Ihnen gerne in 15 Minuten zeigen, wie das funktioniert.
Wann passt es bei Ihnen — heute Nachmittag oder morgen Vormittag?'
"
```

**Wenn sie sagen "hab schon was":**
"Ich verstehe. Darf ich fragen, was Sie nutzen? ... Was gefällt Ihnen daran am besten? ... Was nervt Sie daran?"

**Wenn sie sagen "brauch ich nicht":**
"Wir haben auch eine gratis Version für 3 Monate — wenn es Ihnen nichts bringt, kündigen Sie einfach. Kein Risiko für Sie."

### 3.6 Wo findet man die ersten 10 Kunden?

1. **Eigene Kontakte** — Freunde, Familie, Bekannte mit kleinen Studios
2. **Facebook-Gruppen** — "St. Gallen und Umgebung", lokale Community-Gruppen
3. **Walk & Call** — 1 Tag durch St. Gallen laufen, 20 Studios besuchen/anrufen
4. **Coiffeurverband** — Kontakt aufnehmen, Gruppdeal anbieten
5. **local.ch-Einträge** — Studios ohne Online-Buchung identifizieren

---

## 4. VERGLEICH: BUCHUNGSTOOL vs. AI-CHATBOT vs. DASHBOARD/REPORTING

### 4.1 Drei Ideen verglichen

| Kriterium | Buchungstool | AI-Chatbot | Dashboard/Reporting |
|---|---|---|---|
| **Entwicklungsaufwand** | Mittel (2-4 Monate MVP) | Hoch (LLM-Integration, Prompt Engineering) | Niedrig (1-2 Monate) |
| **Wiederkehrende Einnahmen** | ✅ Ja (SaaS, monatlich) | ⚠️ Schwierig (einmalige Projekte oder teure Abo-Modelle) | ⚠️ Mittel (Reporting-Tool, aber wenig sticky) |
| **Skalierbarkeit** | ✅ Hoch (kein Limit, selbst gehostet oder Cloud) | ⚠️ Limitiert durch API-Kosten | ⚠️ Schwach (einmalige Lizenzen) |
| **Schweizer Mehrwert** | ✅ Hoch (Twint, QR-Rechnung, CH-SMS) | ⚠️ Mittel (generische LLMs) | ❌ Kaum |
| **Pain Point sichtbar?** | ✅ Sofort (kein Buchungstool = Stress) | ⚠️ Mittel (Chatbot ist "nice to have") | ⚠️ Kaum (Reporting ist Luxus, nicht Notwendigkeit) |
| **Zahlungsbereitschaft** | CHF 49-149/Monat | CHF 500-2000 einmalig oder CHF 100-300/Monat | CHF 29-79/Monat |
| **Konkurrenz** | Mittel (Calendly, SimplyBook, KLARA) | Hoch (ChatGPT, Claude, viele Anbieter) | Hoch (Power BI, Tableau, Looker) |
| **Patrick's Fit** | ✅ Optimal (React/Node.js, solo, vibe coder) | ⚠️ Schwierig (LLM-Kosten, Maintenance) | ❌ Schwach (generische Dashboards überall gratis) |
| **Time-to-Market** | 2-4 Monate | 3-6 Monate | 1-2 Monate |
| **Rechtskonformität CH** | ⚠️ DSGVO nötig | ⚠️ LLM-Datenschutz komplex | ⚠️ DSGVO |

### 4.2 Warum Buchungstool die BESTE Option ist

**1. Wiederkehrende Einnahmen (MRR)**
- SaaS-Modell = monatlich CHF 500-2000 sind realistisch mit 10-25 Kunden
- Buchungstool ist sticky — ein Coiffeur wechselt ungern, weil alle Kunden den Link kennen
- Dashboard/Reporting: wird monatlich bezahlt, aber niedrigere Margen
- AI-Chatbot: einmalige Projekte oder teure Abo-Modelle mit hohen LLM-Kosten

**2. Schweizer Mehrwert ist ECHT und verteidigbar**
- Twint-Integration: kein Konkurrent hat das nativ
- QR-Rechnung: Schweizer Besonderheit, die internationale Tools nicht können
- CH-Support: lokaler Anbieter schlägt internationales Tool
- Das ist Patrick's moat — nicht die Technologie, die Lokalisierung

**3. Pain Point ist SOFORT spürbar**
- Jeder Coiffeur/Therapeut beschwert sich über No-Shows und Telefon-Stress
- Der Schmerz ist greifbar, nicht abstrakt
- Dashboard/Reporting: "Wie viele Kunden habe ich diese Woche?" — das ist kein Schmerz

**4. Patrick's Skills passen perfekt**
- React/Node.js = modernes Full-Stack, kein Problem
- "Vibe coder" = schnelle Prototypen, iterate quickly
- Solo = keine Teamkoordination nötig
- Kein Budget = kein Problem, wenn er selbst hostet oder günstige Cloud nutzt

**5. Markteintrittbar mit 10-25 Kunden**
- 10 Kunden × CHF 79 = CHF 790/Monat (Startphase)
- 25 Kunden × CHF 79 = CHF 1.975/Monat (Ziel!)
- Das ist mit lokalem Vertrieb in St. Gallen erreichbar

### 4.3 Risiken des Buchungstools

| Risiko | Eintrittswahrscheinlichkeit | Gegenmassnahme |
|---|---|---|
| KLARA oder ähnliches wird billiger | Mittel | Differenzierung durch Features (Twint, UI), persönlicher Support |
| SimplyBook.me wird populärer in CH | Mittel | Lokale Präsenz, CH-Blog, SEO auf Deutsch |
| Kunden springen ab, wenn es Probleme gibt | Mittel | Stabiles MVP, guter Support, SLA |
| Preis zu tief für nachhaltiges Business | Niedrig | early adopter pricing, dann erhöhen |
| Patrick verliert Motivation | Mittel | Kleine Meilensteine, erste Kunden schnell gewinnen |

---

## 5. FAZIT & EMPFEHLUNG

### Buchungstool: ✅ KLAR EMPFOHLEN

**Warum:**
- Wiederkehrende Einnahmen = echtes Business, nicht Freelance
- Schweizer Mehrwert = moat gegen internationale Konkurrenz
- Pain Point klar = Kunden sind bereit zu zahlen
- Patrick's Skills passen = kann solo MVP bauen
- 500-2.000 CHF/Monat = mit 7-25 Kunden erreichbar

### Nächste Schritte (konkret für Patrick)

**Phase 1 — MVP (Monat 1-2):**
- [ ] Twint-Integration recherchieren (API von Twint/SIX)
- [ ] Minimal MVP: Kalender + Buchungs-UI + SMS-Erinnerung
- [ ] 1-2 Kunden als Beta-Tester (kostenlos)
- [ ] Feedback einarbeiten

**Phase 2 — Erste Kunden (Monat 3-4):**
- [ ] Pricing: CHF 49/Monat (early adopter) oder CHF 79/Monat
- [ ] 5 erste zahlende Kunden gewinnen
- [ ] Testimonials sammeln
- [ ] local.ch-Integration prüfen

**Phase 3 — Skalierung (Monat 5-6):**
- [ ] 15-25 Kunden anpeilen
- [ ] QR-Rechnung integrieren
- [ ] Branchenverband-Ansprache (Coiffure Suisse)
- [ ] Automation: Onboarding ohne Patrick

### Fördermittel nutzen
- **INOS-Coaching:** Patrick selbst kann 25h kostenlose Beratung für Geschäftsmodell, Pricing, Go-to-Market beanspruchen
- **Nicht auf Fördergelder für Tool-Bau setzen** — die sind für KMUs, die Digitalisierung ZUKAUFEN, nicht für Entwickler

---

## ANHANG: PRICING-ÜBERSICHT KONKURRENZ

| Tool | Basispreis | Features | CH-spezifisch |
|---|---|---|---|
| Calendly | Free / $10-16/User | Meetings, keine Services | ❌ |
| SimplyBook.me | €8-60/Monat | Services, Payment, SMS | ⚠️ Teilweise |
| Cal.com | Free (self-hosted) / $15/User | Meetings, API | ❌ |
| KLARA | CHF 35/Monat (Booking) | Booking + Buchhaltung | ✅ Ja |
| Bookit (CH) | Unbekannt | Booking | ✅ Vermutlich |
| local.ch | Gratis | Branchenbuch + Reservation-Link | ✅ Ja (aber keine echte Buchung) |
| **Patrick's Tool** | **CHF 49-79/Monat** | **Booking + Twint + SMS-CH + QR-Rechnung** | **✅✅✅** |

---

*Erstellt: Juni 2026 | Recherche: Web-Suche, Web-Fetch | Stand: Alle Angaben ohne Gewähr — vor finalen Entscheiden selbst verifizieren.*

---

## 6. WEB-APP (MVP)

Die implementierte Anwendung liegt unter [`web/`](web/README.md).

- **Demo-Buchung:** `/coiffeur-blum/book`
- **Admin:** `admin@coiffeur-blum.ch` / `demo1234` (nach `npm run db:seed`)
- **Dokumentation:** [`docs/implementation_plans/mvp-v1.md`](docs/implementation_plans/mvp-v1.md) · Prototyp Top 5: [`docs/implementation_plans/prototype-top5.md`](docs/implementation_plans/prototype-top5.md)
- **Lokal starten:** [`docs/LOCAL_DEV.md`](docs/LOCAL_DEV.md)