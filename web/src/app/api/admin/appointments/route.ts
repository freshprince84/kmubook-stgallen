import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: {
    studioId: string;
    date?: { gte: Date; lte: Date };
  } = { studioId: session.studioId };

  if (from && to) {
    where.date = { gte: new Date(`${from}T00:00:00`), lte: new Date(`${to}T23:59:59`) };
  }

  const appointments = await prisma.appointment.findMany({
    where,
    include: { service: true },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json(appointments);
}
