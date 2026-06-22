import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const studio = await prisma.studio.findUniqueOrThrow({ where: { id: session.studioId } });
  return NextResponse.json(studio);
}

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  openingHours: z.record(z.string(), z.array(z.object({ from: z.string(), to: z.string() }))).optional(),
});

export async function PUT(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });

  const studio = await prisma.studio.update({
    where: { id: session.studioId },
    data: {
      ...parsed.data,
      email: parsed.data.email === "" ? null : parsed.data.email,
    },
  });
  return NextResponse.json(studio);
}
