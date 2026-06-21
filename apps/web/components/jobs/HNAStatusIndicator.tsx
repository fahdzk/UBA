import { Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface HNAStatusIndicatorProps {
  decisionByDate: string;
  notificationsSent: boolean;
}

export function HNAStatusIndicator({ decisionByDate, notificationsSent }: HNAStatusIndicatorProps) {
  const decision = new Date(decisionByDate);
  const now = new Date();
  const isPast = decision < now;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
        notificationsSent
          ? "bg-emerald-50 text-emerald-700"
          : isPast
          ? "bg-red-50 text-brand-red"
          : "bg-amber-50 text-amber-700"
      )}
    >
      <Shield className="h-3 w-3" />
      {notificationsSent ? "HNA Complete" : `Decision by ${decision.toLocaleDateString()}`}
    </div>
  );
}
