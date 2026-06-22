import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe nicht konfiguriert" }, { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Signatur fehlt" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Ungültige Signatur" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { studioId?: string }; subscription?: string };
    const studioId = session.metadata?.studioId;
    if (studioId) {
      await prisma.studio.update({
        where: { id: studioId },
        data: {
          subscriptionStatus: "active",
          stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
        },
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as { id: string };
    await prisma.studio.updateMany({
      where: { stripeSubscriptionId: sub.id },
      data: { subscriptionStatus: "cancelled" },
    });
  }

  return NextResponse.json({ received: true });
}
