import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { trialDaysLeft } from "@/lib/billing";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  const studio = await prisma.studio.findUniqueOrThrow({ where: { id: session.studioId } });
  const today = new Date();
  const todayStart = startOfDay(today);
  const todayEnd = endOfDay(today);
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const [todayAppointments, upcomingCount, monthAppointments, monthRevenue] = await Promise.all([
    prisma.appointment.findMany({
      where: {
        studioId: studio.id,
        date: { gte: todayStart, lte: todayEnd },
        status: { in: ["booked", "confirmed"] },
      },
      include: { service: true },
      orderBy: { startTime: "asc" },
    }),
    prisma.appointment.count({
      where: {
        studioId: studio.id,
        date: { gte: todayStart },
        status: { in: ["booked", "confirmed"] },
      },
    }),
    prisma.appointment.count({
      where: {
        studioId: studio.id,
        date: { gte: monthStart, lte: monthEnd },
        status: { in: ["booked", "confirmed", "completed"] },
      },
    }),
    prisma.appointment.findMany({
      where: {
        studioId: studio.id,
        date: { gte: monthStart, lte: monthEnd },
        status: { in: ["booked", "confirmed", "completed"] },
      },
      include: { service: true },
    }),
  ]);

  const revenue = monthRevenue.reduce((sum, a) => sum + a.service.price, 0);

  return NextResponse.json({
    studio: {
      name: studio.name,
      slug: studio.slug,
      subscriptionStatus: studio.subscriptionStatus,
      trialDaysLeft: trialDaysLeft(studio.trialEndsAt),
      smsUsed: studio.smsUsedThisMonth,
      smsQuota: studio.smsQuotaMonthly,
    },
    today: todayAppointments.map((a) => ({
      id: a.id,
      customerName: a.customerName,
      startTime: a.startTime,
      endTime: a.endTime,
      serviceName: a.service.name,
    })),
    upcomingCount,
    monthAppointments,
    monthRevenue: revenue,
  });
}
