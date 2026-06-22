import type { TemplateVariant } from "@prisma/client";
import type { OpeningHours } from "../../src/lib/types";
import { BLUM_HOURS, FLEXIBLE_HOURS, STANDARD_HOURS } from "./hours";

type ServiceSeed = {
  name: string;
  duration: number;
  price: number;
  category?: string;
  description?: string;
  bookableOnline?: boolean;
  sortOrder: number;
};

type StudioSeed = {
  slug: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  adminEmail: string;
  primaryColor: string;
  secondaryColor?: string;
  templateVariant: TemplateVariant;
  tagline: string;
  description: string;
  openingHours: OpeningHours;
  depositEnabled?: boolean;
  depositAmount?: number;
  socialInstagram?: string;
  socialFacebook?: string;
  socialMaps?: string;
  categories: string[];
  services: ServiceSeed[];
  team: { name: string; role?: string; bio?: string; sortOrder: number }[];
};

const IMPRESSUM = (name: string, address: string, city: string, phone: string, email: string) =>
  `<p><strong>${name}</strong><br/>${address}<br/>${city}<br/>Tel: ${phone}<br/>E-Mail: ${email}</p><p>Verantwortlich für den Inhalt: ${name}</p>`;

const DATENSCHUTZ = (name: string, email: string) =>
  `<p>Personenbezogene Daten werden zur Terminverwaltung und Kommunikation verarbeitet. Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).</p><p>Auskunft, Berichtigung oder Löschung: ${email}</p><p>Hosting: kmubook — Daten in der Schweiz/EU.</p>`;

export const STUDIOS: StudioSeed[] = [
  {
    slug: "coiffeur-blum",
    name: "Coiffeur Blum",
    address: "Marktgasse 20",
    city: "9000 St. Gallen",
    phone: "071 220 90 90",
    email: "hallo@coiffeurblum.ch",
    adminEmail: "admin@coiffeur-blum.ch",
    primaryColor: "#5eb3f6",
    secondaryColor: "#f5f0eb",
    templateVariant: "salon_luxe",
    tagline: "Coiffeur Blum in St. Gallen",
    description: "Liebe Kundinnen und Kunden — wir freuen uns auf euren Besuch!",
    openingHours: BLUM_HOURS,
    depositEnabled: false,
    socialInstagram: "https://www.instagram.com/coiffeur_blum",
    socialFacebook: "https://www.facebook.com/Coiffeur-Blum-107072620632764/",
    socialMaps: "https://goo.gl/maps/r8sHfCCfZVPV8bb76",
    categories: ["Damen", "Herren", "Farbe & Styling"],
    services: [
      { name: "Haarschnitt Damen", duration: 60, price: 95, category: "Damen", sortOrder: 0 },
      { name: "Haarschnitt Herren", duration: 30, price: 55, category: "Herren", sortOrder: 1 },
      { name: "Waschen & Föhnen", duration: 45, price: 65, category: "Damen", sortOrder: 2 },
      { name: "Ansatz färben", duration: 90, price: 85, category: "Farbe & Styling", sortOrder: 3 },
      { name: "Ganzes Haar färben", duration: 120, price: 120, category: "Farbe & Styling", sortOrder: 4 },
      { name: "Folienméches", duration: 120, price: 140, category: "Farbe & Styling", bookableOnline: false, sortOrder: 5 },
      { name: "Balayage", duration: 150, price: 160, category: "Farbe & Styling", bookableOnline: false, sortOrder: 6 },
      { name: "Augenbrauen zupfen", duration: 15, price: 15, category: "Damen", sortOrder: 7 },
    ],
    team: [
      { name: "Daniela Bazzi Luchetti", role: "Coiffeuse", sortOrder: 0 },
      { name: "Severina Brägger", role: "Coiffeuse", sortOrder: 1 },
      { name: "Salvatore", role: "Coiffeur", sortOrder: 2 },
      { name: "Lorena", role: "Coiffeuse", sortOrder: 3 },
    ],
  },
  {
    slug: "physio-9000",
    name: "Physio 9000",
    address: "Poststrasse 23",
    city: "9000 St. Gallen",
    phone: "071 222 68 05",
    email: "mail@physio9000.ch",
    adminEmail: "admin@physio-9000.ch",
    primaryColor: "#2d6a6a",
    secondaryColor: "#e8f4f0",
    templateVariant: "care_calm",
    tagline: "Physiotherapie & mehr",
    description: "Kompetent, zielorientiert, individuell — seit über 20 Jahren.",
    openingHours: FLEXIBLE_HOURS,
    depositEnabled: false,
    socialMaps: "https://maps.google.com/?q=Poststrasse+23+9000+St.Gallen",
    categories: ["Physiotherapie", "Massage"],
    services: [
      { name: "Ersttermin Physiotherapie 60 Min", duration: 60, price: 120, category: "Physiotherapie", sortOrder: 0 },
      { name: "Folgetermin Physiotherapie 45 Min", duration: 45, price: 95, category: "Physiotherapie", sortOrder: 1 },
      { name: "Massage 30 Min (ohne Verordnung)", duration: 30, price: 70, category: "Massage", sortOrder: 2 },
      { name: "Massage 45 Min (ohne Verordnung)", duration: 45, price: 95, category: "Massage", sortOrder: 3 },
    ],
    team: [
      {
        name: "Manuela Nieuwenhout-Flückiger",
        role: "Dipl. Physiotherapeutin HF, Praxisinhaberin",
        bio: "Seit 23 Jahren engagiere ich mich als Physiotherapeutin für meine Patientinnen und Patienten — individuell und auf Ihre Bedürfnisse angepasst.",
        sortOrder: 0,
      },
    ],
  },
  {
    slug: "coiffure-teresa",
    name: "Coiffure Teresa",
    address: "Engelgasse 5",
    city: "9000 St. Gallen",
    phone: "071 222 88 34",
    email: "salon@coiffure-teresa.ch",
    adminEmail: "admin@coiffure-teresa.ch",
    primaryColor: "#8b4a6b",
    secondaryColor: "#f9f0f4",
    templateVariant: "salon_luxe",
    tagline: "Der Salon mit Charme in St. Gallen",
    description: "Coiffure, Nail Design und Kosmetik — seit 2002.",
    openingHours: STANDARD_HOURS,
    depositEnabled: true,
    depositAmount: 30,
    categories: ["Coiffure", "Nail Art", "Kosmetik"],
    services: [
      { name: "Haarschnitt Damen", duration: 60, price: 98, category: "Coiffure", sortOrder: 0 },
      { name: "Haarschnitt Herren", duration: 30, price: 52, category: "Coiffure", sortOrder: 1 },
      { name: "Farbberatung", duration: 30, price: 0, category: "Coiffure", description: "Kostenlose Beratung", sortOrder: 2 },
      { name: "Nagelmodellage Neu", duration: 90, price: 85, category: "Nail Art", sortOrder: 3 },
      { name: "Nagel Auffüllen", duration: 60, price: 65, category: "Nail Art", sortOrder: 4 },
      { name: "Gesichtspflege", duration: 60, price: 95, category: "Kosmetik", sortOrder: 5 },
      { name: "Manicüre", duration: 45, price: 55, category: "Kosmetik", sortOrder: 6 },
    ],
    team: [
      { name: "Teresa", role: "Saloninhaberin", sortOrder: 0 },
      { name: "Team Coiffure Teresa", role: "Coiffure & Kosmetik", sortOrder: 1 },
    ],
  },
  {
    slug: "hair-creativ-daniel",
    name: "Hair Creativ Daniel",
    address: "Brühlgasse 23",
    city: "9000 St. Gallen",
    phone: "071 222 64 04",
    email: "daniel@haircreativdaniel.ch",
    adminEmail: "admin@hair-creativ-daniel.ch",
    primaryColor: "#3d4f5f",
    secondaryColor: "#eef1f4",
    templateVariant: "salon_luxe",
    tagline: "Damen- und Herrencoiffeur in St. Gallen",
    description: "Professionelle Schnitte, Farben und Styling in der Brühlgasse.",
    openingHours: STANDARD_HOURS,
    depositEnabled: true,
    depositAmount: 20,
    categories: ["Damen", "Herren", "Kinder", "Farbe"],
    services: [
      { name: "Waschen, Schneiden, Föhnen (kurz)", duration: 60, price: 73, category: "Damen", sortOrder: 0 },
      { name: "Waschen, Schneiden, Föhnen (mittel)", duration: 75, price: 83, category: "Damen", sortOrder: 1 },
      { name: "Waschen, Schneiden, Föhnen (lang)", duration: 90, price: 93, category: "Damen", sortOrder: 2 },
      { name: "Waschen, Schneiden, Föhnen Herren", duration: 30, price: 52, category: "Herren", sortOrder: 3 },
      { name: "Maschinenschnitt Herren", duration: 20, price: 32, category: "Herren", sortOrder: 4 },
      { name: "Kinder bis 12", duration: 30, price: 35, category: "Kinder", sortOrder: 5 },
      { name: "Ansatz färben", duration: 90, price: 85, category: "Farbe", sortOrder: 6 },
      { name: "Balayage (Beratung)", duration: 30, price: 0, category: "Farbe", description: "Beratungstermin", sortOrder: 7 },
      { name: "Folienméches", duration: 120, price: 120, category: "Farbe", bookableOnline: false, sortOrder: 8 },
    ],
    team: [{ name: "Daniel", role: "Coiffeur & Inhaber", sortOrder: 0 }],
  },
  {
    slug: "gold-hairstyling",
    name: "Gold Hairstyling",
    address: "Multergasse 7",
    city: "9000 St. Gallen",
    phone: "071 223 21 62",
    email: "gold.hairstyling@outlook.com",
    adminEmail: "admin@gold-hairstyling.ch",
    primaryColor: "#b8860b",
    secondaryColor: "#faf6ee",
    templateVariant: "salon_solo",
    tagline: "Ihr persönlicher Salon",
    description: "Gold Hairstyling by Jelena Marijanović — Multergasse 7.",
    openingHours: STANDARD_HOURS,
    depositEnabled: true,
    depositAmount: 25,
    categories: ["Damen", "Herren", "Kinder"],
    services: [
      { name: "Waschen & Föhnen kurz", duration: 45, price: 35, category: "Damen", sortOrder: 0 },
      { name: "Waschen, Schneiden, Föhnen kurz", duration: 60, price: 53, category: "Damen", sortOrder: 1 },
      { name: "Waschen, Schneiden, Föhnen lang", duration: 90, price: 73, category: "Damen", sortOrder: 2 },
      { name: "Balayage lang", duration: 150, price: 145, category: "Damen", bookableOnline: false, sortOrder: 3 },
      { name: "Waschen, Schneiden, Föhnen Herren", duration: 30, price: 32, category: "Herren", sortOrder: 4 },
      { name: "Kinder bis 12 Mädchen", duration: 30, price: 20, category: "Kinder", sortOrder: 5 },
      { name: "Kinder bis 12 Jungs", duration: 25, price: 17, category: "Kinder", sortOrder: 6 },
    ],
    team: [
      {
        name: "Jelena Marijanović",
        role: "Solo-Stylistin & Inhaberin",
        bio: "Persönliche Betreuung vom Schnitt bis zur Farbe — mit Leidenschaft und Erfahrung.",
        sortOrder: 0,
      },
    ],
  },
];

export function studioData(s: StudioSeed) {
  return {
    impressumHtml: IMPRESSUM(s.name, s.address, s.city, s.phone, s.email),
    datenschutzHtml: DATENSCHUTZ(s.name, s.email),
  };
}
