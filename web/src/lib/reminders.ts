import { addHours, addMinutes, format, subMinutes } from "date-fns";
import { prisma } from "./db";
import { isStudioActive } from "./billing";
import { sendSms } from "./sms";

function appointmentStartsAt(date: Date, startTime: string): Date {
  const day = format(date, "yyyy-MM-dd");
  return new Date(`${day}T${startTime}:00`);
}

function inWindow(target: Date, hoursAhead: number, toleranceMinutes = 15): boolean {
  const now = new Date();
  const windowStart = subMinutes(addHours(now, hoursAhead), toleranceMinutes);
  const windowEnd = addMinutes(addHours(now, hoursAhead), toleranceMinutes);
  return target >= windowStart && target <= windowEnd;
}

export async function processReminders(): Promise<{ sent24h: number; sent2h: number }> {
  const now = new Date();
  const appointments = await prisma.appointment.findMany({
    where: {
      status: { in: ["booked", "confirmed"] },
      date: { gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) },
    },
    include: { studio: true },
  });

  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  let sent24h = 0;
  let sent2h = 0;

  for (const apt of appointments) {
    if (!isStudioActive(apt.studio)) continue;

    const startsAt = appointmentStartsAt(apt.date, apt.startTime);
    const cancelUrl = `${appUrl}/${apt.studio.slug}/cancel/${apt.cancelToken}`;

    if (!apt.reminder24hSent && inWindow(startsAt, 24)) {
      await sendSms({
        studioId: apt.studioId,
        toPhone: apt.customerPhone,
        message: `Erinnerung: Morgen ${apt.startTime} Uhr bei ${apt.studio.name}. Absagen: ${cancelUrl}`,
        type: "reminder_24h",
      });
      await prisma.appointment.update({
        where: { id: apt.id },
        data: { reminder24hSent: true },
      });
      sent24h++;
    }

    if (!apt.reminder2hSent && inWindow(startsAt, 2)) {
      await sendSms({
        studioId: apt.studioId,
        toPhone: apt.customerPhone,
        message: `Erinnerung: Heute ${apt.startTime} Uhr bei ${apt.studio.name}. Absagen: ${cancelUrl}`,
        type: "reminder_2h",
      });
      await prisma.appointment.update({
        where: { id: apt.id },
        data: { reminder2hSent: true },
      });
      sent2h++;
    }
  }

  return { sent24h, sent2h };
}
