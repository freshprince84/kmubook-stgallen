import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { isStudioActive } from "@/lib/billing";
import { getStudioContent } from "@/lib/studio-content";
import { getStudioTheme } from "@/lib/studio-theme";

export async function getStudioBySlug(slug: string) {
  const studio = await prisma.studio.findUnique({
    where: { slug },
    include: {
      categories: { orderBy: { sortOrder: "asc" } },
      services: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: { category: true },
      },
      teamMembers: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!studio) return null;

  return {
    ...studio,
    content: getStudioContent(slug),
    theme: getStudioTheme(studio.templateVariant, studio.primaryColor, studio.secondaryColor),
    active: isStudioActive(studio),
  };
}

export async function requireStudio(slug: string) {
  const studio = await getStudioBySlug(slug);
  if (!studio) notFound();
  return studio;
}

export type PublicStudio = NonNullable<Awaited<ReturnType<typeof getStudioBySlug>>>;
