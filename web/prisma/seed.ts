import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
import { DEFAULT_OPENING_HOURS } from "../src/lib/types";
import { TRIAL_DAYS } from "../src/lib/billing";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  const trialEndsAt = addDays(new Date(), TRIAL_DAYS);

  const studio = await prisma.studio.upsert({
    where: { slug: "coiffeur-blum" },
    update: {
      primaryColor: "#5eb3f6",
    },
    create: {
      name: "Coiffeur Blum",
      slug: "coiffeur-blum",
      address: "Marktgasse 20",
      city: "9000 St. Gallen",
      phone: "071 220 90 90",
      email: "hallo@coiffeurblum.ch",
      primaryColor: "#5eb3f6",
      openingHours: DEFAULT_OPENING_HOURS,
      trialEndsAt,
      subscriptionStatus: "trial",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@coiffeur-blum.ch" },
    update: {},
    create: {
      email: "admin@coiffeur-blum.ch",
      passwordHash: await hashPassword("demo1234"),
      studioId: studio.id,
      role: "owner",
    },
  });

  const services = [
    { name: "Haarschnitt Damen", duration: 60, price: 95, sortOrder: 0 },
    { name: "Haarschnitt Herren", duration: 30, price: 55, sortOrder: 1 },
    { name: "Färben", duration: 90, price: 120, sortOrder: 2 },
  ];

  for (const s of services) {
    const existing = await prisma.service.findFirst({
      where: { studioId: studio.id, name: s.name },
    });
    if (!existing) {
      await prisma.service.create({ data: { ...s, studioId: studio.id } });
    }
  }

  console.log("Seed OK: coiffeur-blum");
  console.log("  Admin: admin@coiffeur-blum.ch / demo1234");
  console.log("  Buchung: /coiffeur-blum/book");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
