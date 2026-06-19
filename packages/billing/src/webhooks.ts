// @uba/billing — Stripe webhook handler
import Stripe from "stripe";
import { prisma } from "@uba/database";
import { getPlanByStripePriceId } from "./plans";

/** Helper to create a JSON Response without depending on Next.js */
function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
  });
}

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return secret;
}

export async function handleStripeWebhook(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, getWebhookSecret());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return jsonResponse({ error: "Invalid signature" }, 400);
  }

  try {
    switch (event.type) {
      // ---- Subscription Events ----
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      // ---- Invoice Events ----
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoiceFailed(invoice);
        break;
      }

      // ---- Payment Events ----
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return jsonResponse({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook handler error: ${message}`);
    return jsonResponse({ error: "Handler failed" }, 500);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!existing) return;

  const statusMap: Record<string, string> = {
    active: "ACTIVE",
    canceled: "CANCELED",
    past_due: "PAST_DUE",
    unpaid: "UNPAID",
    trialing: "TRIALING",
    paused: "PAUSED",
    incomplete: "INCOMPLETE",
    incomplete_expired: "INCOMPLETE_EXPIRED",
  };

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: statusMap[subscription.status] as any || "INCOMPLETE",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      canceledAt: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
      endedAt: subscription.ended_at
        ? new Date(subscription.ended_at * 1000)
        : null,
      trialStart: subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null,
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      userId: existing.userId,
      action: "UPDATE" as any,
      resource: "subscriptions",
      resourceId: existing.id,
      newValues: { status: subscription.status },
      metadata: { stripeSubscriptionId: subscription.id },
    },
  });
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
    include: { membership: true },
  });

  if (!existing) return;

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: "CANCELED",
      endedAt: new Date(),
    },
  });

  // Update membership end date
  await prisma.membership.update({
    where: { id: existing.membershipId },
    data: {
      autoRenew: false,
      cancelledAt: new Date(),
    },
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
  });

  if (!subscription) return;

  await prisma.payment.upsert({
    where: {
      stripeInvoiceId: invoice.id,
    },
    update: {
      status: "SUCCEEDED",
      receiptUrl: invoice.hosted_invoice_url,
    },
    create: {
      userId: subscription.userId,
      subscriptionId: subscription.id,
      stripePaymentId: invoice.payment_intent as string,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "SUCCEEDED",
      description: invoice.description || "Subscription payment",
      receiptUrl: invoice.hosted_invoice_url,
    },
  });
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: invoice.subscription as string },
  });

  if (!subscription) return;

  await prisma.payment.create({
    data: {
      userId: subscription.userId,
      subscriptionId: subscription.id,
      stripePaymentId: invoice.payment_intent as string,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "FAILED",
      description: invoice.description || "Subscription payment",
      failureReason: "Payment failed — will retry",
    },
  });

  // Set grace period (7 days)
  await prisma.membership.update({
    where: { id: subscription.membershipId },
    data: {
      gracePeriodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Payment already handled via invoice.paid
  console.log(`Payment succeeded: ${paymentIntent.id}`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment failed: ${paymentIntent.id}`);
}


