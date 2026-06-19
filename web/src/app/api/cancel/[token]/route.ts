import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ token: string }> };

export async function POST(_req: Request, { params }: Params) {
  const { token } = await params;

  const appointment = await prisma.appointment.findFirst({
    where: { cancelToken: token, status: { in: ["booked", "confirmed"] } },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Termin nicht gefunden oder bereits abgesagt" }, { status: 404 });
  }

  await prisma.appointment.update({
    where: { id: appointment.id },
    data: { status: "cancelled" },
  });

  return NextResponse.json({ ok: true });
}
