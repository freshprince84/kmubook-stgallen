import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isStudioActive } from "@/lib/billing";
import { computeEndTime } from "@/lib/slots";
import { formatConfirmationSms, sendSms } from "@/lib/sms";

type Params = { params: Promise<{ slug: string }> };

const schema = z.object({
  serviceId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  customerName: z.string().min(2).max(100),
  customerPhone: z.string().min(6).max(30),
  customerEmail: z.string().email().optional().or(z.literal("")),
  depositRequested: z.boolean().optional(),
});

export async function POST(req: Request, { params }: Params) {
  const { slug } = await params;
  const studio = await prisma.studio.findUnique({ where: { slug } });
  if (!studio) return NextResponse.json({ error: "Studio nicht gefunden" }, { status: 404 });

  if (!isStudioActive(studio)) {
    return NextResponse.json(
      { error: "Online-Buchung derzeit nicht verfügbar. Bitte telefonisch buchen." },
      { status: 403 },
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe", details: parsed.error.flatten() }, { status: 400 });
  }

  const service = await prisma.service.findFirst({
    where: { id: parsed.data.serviceId, studioId: studio.id, isActive: true },
  });
  if (!service) return NextResponse.json({ error: "Service nicht gefunden" }, { status: 404 });

  const endTime = computeEndTime(parsed.data.startTime, service.duration);
  const appointmentDate = new Date(`${parsed.data.date}T12:00:00`);

  const conflict = await prisma.appointment.findFirst({
    where: {
      studioId: studio.id,
      date: appointmentDate,
      status: { in: ["booked", "confirmed"] },
      startTime: parsed.data.startTime,
    },
  });
  if (conflict) {
    return NextResponse.json({ error: "Dieser Termin ist nicht mehr verfügbar" }, { status: 409 });
  }

  const appointment = await prisma.appointment.create({
    data: {
      studioId: studio.id,
      serviceId: service.id,
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      customerEmail: parsed.data.customerEmail || null,
      date: appointmentDate,
      startTime: parsed.data.startTime,
      endTime,
      status: "confirmed",
      depositPaid: Boolean(parsed.data.depositRequested && studio.depositEnabled),
    },
  });

  if (parsed.data.depositRequested && studio.depositEnabled && studio.depositAmount) {
    await prisma.payment.create({
      data: {
        studioId: studio.id,
        appointmentId: appointment.id,
        amount: studio.depositAmount,
        provider: "mock",
        method: "twint",
        status: "paid",
      },
    });
  }

  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const cancelUrl = `${appUrl}/${slug}/cancel/${appointment.cancelToken}`;
  const dateLabel = parsed.data.date.split("-").reverse().join(".");

  await sendSms({
    studioId: studio.id,
    toPhone: parsed.data.customerPhone,
    message: formatConfirmationSms(studio.name, dateLabel, parsed.data.startTime, cancelUrl),
    type: "confirmation",
  });

  return NextResponse.json({
    id: appointment.id,
    date: parsed.data.date,
    startTime: parsed.data.startTime,
    endTime,
    cancelToken: appointment.cancelToken,
  });
}
