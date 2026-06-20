import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await getSessionFromRequest(req as import("next/server").NextRequest);
  if (!session) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe nicht konfiguriert" }, { status: 503 });
  }

  const stripe = getStripe()!;
  const studio = await prisma.studio.findUniqueOrThrow({ where: { id: session.studioId } });
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";

  let customerId = studio.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: studio.email ?? undefined,
      name: studio.name,
      metadata: { studioId: studio.id },
    });
    customerId = customer.id;
    await prisma.studio.update({
      where: { id: studio.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const checkout = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID_STARTER!, quantity: 1 }],
    success_url: `${appUrl}/admin/settings?billing=success`,
    cancel_url: `${appUrl}/admin/settings?billing=cancel`,
    metadata: { studioId: studio.id },
  });

  return NextResponse.json({ url: checkout.url });
}
