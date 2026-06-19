import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const services = await prisma.service.findMany({
    where: { studioId: session.studioId },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(services);
}

const createSchema = z.object({
  name: z.string().min(1),
  duration: z.number().int().min(15).max(480),
  price: z.number().min(0),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });

  const count = await prisma.service.count({ where: { studioId: session.studioId } });
  const service = await prisma.service.create({
    data: {
      studioId: session.studioId,
      name: parsed.data.name,
      duration: parsed.data.duration,
      price: parsed.data.price,
      description: parsed.data.description,
      isActive: parsed.data.isActive ?? true,
      sortOrder: count,
    },
  });
  return NextResponse.json(service, { status: 201 });
}
