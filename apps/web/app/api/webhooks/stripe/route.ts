
import { NextRequest, NextResponse } from "next/server";
import { handleStripeWebhook } from "@uba/billing";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await handleStripeWebhook(req);
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: err.message || "Webhook failed" }, { status: 400 });
  }
}
