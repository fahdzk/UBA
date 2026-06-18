
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { stripe } from "@uba/billing";
import { StripeWebhookService } from "@uba/billing";
import { AuditService } from "@uba/security";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  await StripeWebhookService.handleEvent(event);

  await AuditService.log({
    userId: null,
    action: "PAYMENT_PROCESSED",
    resource: "stripe_webhook",
    metadata: { eventType: event.type, eventId: event.id },
  });

  return NextResponse.json({ received: true });
}
