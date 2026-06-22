import type { StudioContent } from "./content-types";

const CONTENT: Record<string, StudioContent> = {
  "coiffeur-blum": {
    about: [
      {
        type: "hero",
        headline: "Liebe Kundinnen und Kunden",
        subline:
          "Wir freuen uns auf euren Besuch! Seit über 15 Jahren arbeiten wir im Team zusammen und geben unser Bestes, damit jede Kundin und jeder Kunde unseren Salon zufrieden und mit einem Lächeln verlässt.",
      },
      {
        type: "text",
        title: "Über uns",
        body: "Coiffeur Blum in der St. Galler Marktgasse — persönlich, professionell und mit viel Liebe zum Detail.",
      },
    ],
    contactNote: "Terminvereinbarungen auch telefonisch unter 071 220 90 90.",
  },
  "physio-9000": {
    about: [
      {
        type: "hero",
        headline: "Herzlich Willkommen in der Physio 9000",
        subline: "mit gesundem Menschenverstand — kompetent, zielorientiert, individuell.",
      },
      {
        type: "text",
        title: "Über uns",
        body: "Mit mehr als 20 Jahren Berufserfahrung behandeln und begleiten wir Sie kompetent und individuell. Bei uns erwartet Sie eine kleine aber feine Praxis, ohne Massenabfertigung.",
      },
      {
        type: "features",
        title: "Angebot",
        items: [
          "Manuelle Therapie nach Maitland",
          "Triggerpunkt-Behandlung und Dry Needling",
          "Lymphdrainage",
          "Klassische und Sportmassage",
          "Taping (Kinesio, stabilisierend, Lympho)",
          "Narbentherapie",
          "McKenzie-Konzept",
          "Elektro- und Ultraschalltherapie",
          "Individuelles Trainingsprogramm",
        ],
      },
      {
        type: "text",
        title: "Preise & Krankenkasse",
        body: "Damit die Behandlungskosten von Ihrer Krankenkasse übernommen werden, braucht es eine ärztliche Verordnung. Selbstzahler-Behandlungen sind nach Vereinbarung möglich.",
      },
    ],
    anfahrt:
      "Zentral am Hauptbahnhof St. Gallen. Parkplätze in der Parkgarage Rathaus oder Webersbleiche (Manor). Rollstuhlparkplätze in den Parkgaragen und an der Poststrasse. Barrierefreier Zugang im 3. Stock.",
    contactNote: "Öffnungszeiten flexibel — bitte kontaktieren Sie uns zur Terminvereinbarung.",
  },
  "coiffure-teresa": {
    about: [
      {
        type: "hero",
        headline: "Der Salon mit Charme in St. Gallen",
        subline: "Seit 2002 — zeitgemäss, kundenorientiert und perfektionistisch.",
      },
      {
        type: "quote",
        text: "Der charmanteste Salon für Ihre Haare und Nägel in St. Gallen",
        source: "Tagesanzeiger",
      },
      {
        type: "pillars",
        title: "Unsere Säulen",
        items: [
          {
            title: "Coiffure",
            body: "Trendige Haarschnitte, moderne Farbtechniken, Hochsteckfrisuren und Keratin-Behandlungen mit L'Oréal Produkten.",
            items: ["Haarverlängerungen", "Hochzeitsfrisuren", "Individuelle Beratung"],
          },
          {
            title: "Nail Art",
            body: "Pioniere im Nail Design in St. Gallen — Acryl- und Gelnägel mit Premiumprodukten aus der Schweiz.",
            items: ["Nagelverlängerungen", "Nagelmodellierung", "Kurzfristige Termine"],
          },
          {
            title: "Kosmetik",
            body: "Ganzheitliche Gesichtspflege und wohltuende Manicüren & Pedicüren.",
            items: ["Regenerierende Manicüren", "Gesichtspflege", "Pedicüren"],
          },
        ],
      },
      {
        type: "text",
        title: "Über uns",
        body: "Bei Coiffure Teresa verbindet uns die grosse Leidenschaft für Perfektion. Familiärer Umgang, kontinuierliches Lernen und Kreativität prägen unseren Salon im Herzen von St. Gallen.",
      },
    ],
    contactNote: "Termin buchen: 071 222 88 34",
  },
  "hair-creativ-daniel": {
    about: [
      {
        type: "hero",
        headline: "Hair Creativ Daniel",
        subline: "Damen- und Herrencoiffeur in St. Gallen — modern, persönlich, fair.",
      },
      {
        type: "text",
        title: "Über uns",
        body: "In der Brühlgasse verwöhnen wir Sie mit professionellen Schnitten, Farben und Styling — alles unter einem Dach, inklusive Online-Terminbuchung.",
      },
      {
        type: "text",
        title: "Angebot",
        body: "Von klassischen Haarschnitten über Balayage und Méches bis zu Extensions und Keratin-Behandlungen — transparente Preise für Damen, Herren, Kinder und Studenten.",
      },
    ],
    contactNote: "Komplexe Farbtermine buchen Sie am besten zuerst einen Beratungstermin.",
  },
  "gold-hairstyling": {
    about: [
      {
        type: "hero",
        headline: "Gold Hairstyling",
        subline: "Persönlicher Salon von Jelena Marijanović — Ihr Haar in besten Händen.",
      },
      {
        type: "text",
        title: "Über mich",
        body: "Als Solo-Stylistin betreue ich Sie individuell und mit voller Aufmerksamkeit. Vom schnellen Refresh bis zur kompletten Farbveränderung — alles aus einer Hand.",
      },
    ],
    contactNote: "Öffnungszeiten nach Vereinbarung — buchen Sie online Ihren Wunschtermin.",
  },
};

export function getStudioContent(slug: string): StudioContent {
  return (
    CONTENT[slug] ?? {
      about: [{ type: "text", body: "Willkommen in unserem Studio." }],
    }
  );
}
