import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "./env";

export type AuditAction =
  | "user.created"
  | "user.updated"
  | "user.suspended"
  | "membership.created"
  | "membership.cancelled"
  | "violation.filed"
  | "violation.resolved"
  | "legal_case.opened"
  | "legal_case.closed"
  | "agency.rated"
  | "agency.blacklisted"
  | "job.posted"
  | "job.filled"
  | "job.cancelled"
  | "application.submitted"
  | "application.notified"
  | "profile.photo_updated"
  | "admin.action";

export async function createAuditLog({
  action,
  actorId,
  targetId,
  targetType,
  metadata,
  ipAddress,
}: {
  action: AuditAction;
  actorId: string;
  targetId?: string;
  targetType?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serverEnv.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    await supabase.from("audit_logs").insert({
      action,
      actor_id: actorId,
      target_id: targetId,
      target_type: targetType,
      metadata: metadata ?? {},
      ip_address: ipAddress,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[AUDIT_LOG_FAILED]", err);
  }
}
