#!/usr/bin/env npx tsx
/**
 * Neuen Lead-Prototyp anlegen (Sales)
 * Usage: npx tsx scripts/create-studio.ts "Coiffure Teresa" coiffure-teresa "071 222 88 34"
 */
import { PrismaClient } from "@prisma/client";
import { addDays } from "date-fns";
import { hashPassword } from "../src/lib/auth";
import { DEFAULT_OPENING_HOURS } from "../src/lib/types";
import { TRIAL_DAYS } from "../src/lib/billing";

const prisma = new PrismaClient();

async function main() {
  const [name, slug, phone, email] = process.argv.slice(2);
  if (!name || !slug) {
    console.error("Usage: create-studio.ts <name> <slug> [phone] [email]");
    process.exit(1);
  }

  const adminEmail = email ?? `admin@${slug}.ch`;
  const password = "demo1234";

  const studio = await prisma.studio.create({
    data: {
      name,
      slug,
      phone: phone ?? null,
      email: adminEmail,
      openingHours: DEFAULT_OPENING_HOURS,
      trialEndsAt: addDays(new Date(), TRIAL_DAYS),
      subscriptionStatus: "trial",
    },
  });

  await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash: await hashPassword(password),
      studioId: studio.id,
      role: "owner",
    },
  });

  await prisma.service.createMany({
    data: [
      { studioId: studio.id, name: "Termin 30 Min", duration: 30, price: 50, sortOrder: 0 },
      { studioId: studio.id, name: "Termin 60 Min", duration: 60, price: 90, sortOrder: 1 },
    ],
  });

  console.log(`Studio erstellt: /${slug}/book`);
  console.log(`Admin: ${adminEmail} / ${password}`);
}

main().finally(() => prisma.$disconnect());
