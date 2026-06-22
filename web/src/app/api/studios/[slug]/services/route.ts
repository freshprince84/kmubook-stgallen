import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const studio = await prisma.studio.findUnique({ where: { slug } });
  if (!studio) return NextResponse.json({ error: "Studio nicht gefunden" }, { status: 404 });

  const services = await prisma.service.findMany({
    where: { studioId: studio.id, isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(services);
}
