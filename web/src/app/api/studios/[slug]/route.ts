import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isStudioActive } from "@/lib/billing";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const studio = await prisma.studio.findUnique({ where: { slug } });
  if (!studio) return NextResponse.json({ error: "Studio nicht gefunden" }, { status: 404 });

  return NextResponse.json({
    id: studio.id,
    name: studio.name,
    slug: studio.slug,
    address: studio.address,
    city: studio.city,
    phone: studio.phone,
    primaryColor: studio.primaryColor,
    logoUrl: studio.logoUrl,
    active: isStudioActive(studio),
    trialEndsAt: studio.trialEndsAt,
    subscriptionStatus: studio.subscriptionStatus,
  });
}
