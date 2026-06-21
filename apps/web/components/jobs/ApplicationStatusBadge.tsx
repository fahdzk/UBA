import { cn } from "@/lib/utils";

export function ApplicationStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-slate-100 text-slate-600",
    under_review: "bg-blue-50 text-blue-600",
    filled: "bg-emerald-50 text-emerald-600",
    cancelled: "bg-slate-100 text-slate-400",
    not_selected: "bg-red-50 text-brand-red",
  };

  return (
    <span className={cn("rounded-full px-3 py-0.5 text-xs font-semibold capitalize", styles[status] || styles.pending)}>
      {status.replace("_", " ")}
    </span>
  );
}
