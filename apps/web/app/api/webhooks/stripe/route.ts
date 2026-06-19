
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { handleStripeWebhook } = await import("@uba/billing");
    await handleStripeWebhook(req);
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json({ error: err.message || "Webhook failed" }, { status: 400 });
  }
}
