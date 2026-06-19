import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(req: Request, { params }: Params) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return NextResponse.json({ error: "Token erforderlich" }, { status: 400 });

  const appointment = await prisma.appointment.findFirst({
    where: { id, cancelToken: token, status: { in: ["booked", "confirmed"] } },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Termin nicht gefunden" }, { status: 404 });
  }

  await prisma.appointment.update({
    where: { id: appointment.id },
    data: { status: "cancelled" },
  });

  return NextResponse.json({ ok: true });
}
