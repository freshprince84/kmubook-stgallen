import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseOpeningHours, generateSlots } from "@/lib/slots";

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Params) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");

  if (!dateStr || !serviceId) {
    return NextResponse.json({ error: "date und serviceId erforderlich" }, { status: 400 });
  }

  const studio = await prisma.studio.findUnique({ where: { slug } });
  if (!studio) return NextResponse.json({ error: "Studio nicht gefunden" }, { status: 404 });

  const service = await prisma.service.findFirst({
    where: { id: serviceId, studioId: studio.id, isActive: true },
  });
  if (!service) return NextResponse.json({ error: "Service nicht gefunden" }, { status: 404 });

  const date = new Date(`${dateStr}T12:00:00`);
  const dayStart = new Date(`${dateStr}T00:00:00`);
  const dayEnd = new Date(`${dateStr}T23:59:59`);

  const appointments = await prisma.appointment.findMany({
    where: {
      studioId: studio.id,
      date: { gte: dayStart, lte: dayEnd },
      status: { in: ["booked", "confirmed"] },
    },
    select: { startTime: true, endTime: true },
  });

  const hours = parseOpeningHours(studio.openingHours);
  const slots = generateSlots(date, service.duration, hours, appointments);

  return NextResponse.json({ date: dateStr, slots });
}
