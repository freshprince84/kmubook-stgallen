import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
import { TRIAL_DAYS } from "../src/lib/billing";
import { addDays } from "date-fns";
import { STUDIOS, studioData } from "./seeds/studios";

const prisma = new PrismaClient();

async function seedStudio(s: (typeof STUDIOS)[number]) {
  const trialEndsAt = addDays(new Date(), TRIAL_DAYS);
  const legal = studioData(s);

  const studio = await prisma.studio.upsert({
    where: { slug: s.slug },
    update: {
      name: s.name,
      address: s.address,
      city: s.city,
      phone: s.phone,
      email: s.email,
      primaryColor: s.primaryColor,
      secondaryColor: s.secondaryColor,
      templateVariant: s.templateVariant,
      tagline: s.tagline,
      description: s.description,
      openingHours: s.openingHours,
      depositEnabled: s.depositEnabled ?? false,
      depositAmount: s.depositAmount,
      socialInstagram: s.socialInstagram,
      socialFacebook: s.socialFacebook,
      socialMaps: s.socialMaps,
      impressumHtml: legal.impressumHtml,
      datenschutzHtml: legal.datenschutzHtml,
    },
    create: {
      name: s.name,
      slug: s.slug,
      address: s.address,
      city: s.city,
      phone: s.phone,
      email: s.email,
      primaryColor: s.primaryColor,
      secondaryColor: s.secondaryColor,
      templateVariant: s.templateVariant,
      tagline: s.tagline,
      description: s.description,
      openingHours: s.openingHours,
      depositEnabled: s.depositEnabled ?? false,
      depositAmount: s.depositAmount,
      socialInstagram: s.socialInstagram,
      socialFacebook: s.socialFacebook,
      socialMaps: s.socialMaps,
      impressumHtml: legal.impressumHtml,
      datenschutzHtml: legal.datenschutzHtml,
      trialEndsAt,
      subscriptionStatus: "trial",
    },
  });

  await prisma.user.upsert({
    where: { email: s.adminEmail },
    update: { studioId: studio.id },
    create: {
      email: s.adminEmail,
      passwordHash: await hashPassword("demo1234"),
      studioId: studio.id,
      role: "owner",
    },
  });

  await prisma.teamMember.deleteMany({ where: { studioId: studio.id } });
  await prisma.service.deleteMany({ where: { studioId: studio.id } });
  await prisma.serviceCategory.deleteMany({ where: { studioId: studio.id } });

  const categoryMap = new Map<string, string>();
  for (let i = 0; i < s.categories.length; i++) {
    const cat = await prisma.serviceCategory.create({
      data: { studioId: studio.id, name: s.categories[i], sortOrder: i },
    });
    categoryMap.set(s.categories[i], cat.id);
  }

  for (const svc of s.services) {
    await prisma.service.create({
      data: {
        studioId: studio.id,
        name: svc.name,
        duration: svc.duration,
        price: svc.price,
        description: svc.description,
        bookableOnline: svc.bookableOnline ?? true,
        sortOrder: svc.sortOrder,
        categoryId: svc.category ? categoryMap.get(svc.category) : undefined,
      },
    });
  }

  for (const member of s.team) {
    await prisma.teamMember.create({
      data: {
        studioId: studio.id,
        name: member.name,
        role: member.role,
        bio: member.bio,
        sortOrder: member.sortOrder,
      },
    });
  }

  return studio;
}

async function main() {
  for (const s of STUDIOS) {
    const studio = await seedStudio(s);
    console.log(`Seed OK: ${studio.slug} → /${studio.slug}`);
  }
  console.log("\nAdmin-Logins: admin@<slug>.ch / demo1234");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
