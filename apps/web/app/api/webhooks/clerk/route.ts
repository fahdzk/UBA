import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { createAuditLog } from "@/lib/audit";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET missing");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  switch (event.type) {
    case "user.created": {
      const { id, email_addresses, first_name, last_name } = event.data;
      const email = email_addresses[0]?.email_address ?? "";

      await supabase.from("profiles").insert({
        clerk_user_id: id,
        email,
        first_name: first_name ?? "",
        last_name: last_name ?? "",
        display_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        username: `user_${id.slice(-8)}`,
        email_verified: email_addresses[0]?.verification?.status === "verified",
        onboarding_complete: false,
      });

      await createAuditLog({ action: "user.created", actorId: id });
      break;
    }

    case "user.updated": {
      const { id, email_addresses, first_name, last_name } = event.data;
      await supabase
        .from("profiles")
        .update({
          email: email_addresses[0]?.email_address,
          first_name: first_name ?? "",
          last_name: last_name ?? "",
          email_verified: email_addresses[0]?.verification?.status === "verified",
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_user_id", id);
      break;
    }

    case "user.deleted": {
      const { id } = event.data;
      await supabase
        .from("profiles")
        .update({
          is_active: false,
          email: `deleted_${id}@deleted.uba`,
        })
        .eq("clerk_user_id", id);
      await createAuditLog({
        action: "user.created",
        actorId: id ?? "deleted",
      });
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
