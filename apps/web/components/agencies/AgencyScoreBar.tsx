import { cn } from "@/lib/utils";

interface AgencyScoreBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export function AgencyScoreBar({ label, value, maxValue = 100 }: AgencyScoreBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);
  const color = pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : pct >= 30 ? "bg-orange-500" : "bg-brand-red";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full transition-all duration-500", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
