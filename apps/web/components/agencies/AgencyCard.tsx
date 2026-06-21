import { Star, MapPin, Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgencyCardProps {
  name: string;
  slug: string;
  city?: string;
  state?: string;
  ubaScore: number;
  tier: string;
  avgRating: number;
  totalRatings: number;
  violationCount: number;
  isCertified: boolean;
  isBlacklisted: boolean;
}

const tierColors: Record<string, string> = {
  platinum: "bg-slate-100 text-slate-700",
  gold: "bg-amber-100 text-amber-700",
  silver: "bg-gray-100 text-gray-600",
  yellow: "bg-yellow-100 text-yellow-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  blacklisted: "bg-black text-white",
};

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  if (score >= 30) return "text-orange-600";
  return "text-brand-red";
}

export function AgencyCard({
  name,
  slug,
  city,
  state,
  ubaScore,
  tier,
  avgRating,
  totalRatings,
  violationCount,
  isCertified,
  isBlacklisted,
}: AgencyCardProps) {
  return (
    <a
      href={`/agencies/${slug}`}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
            <span className="font-heading text-lg font-bold">{name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-navy-600">
              {name}
            </h3>
            {(city || state) && (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3" />
                {[city, state].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </div>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", tierColors[tier] || tierColors.silver)}>
          {tier}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className={cn("font-heading text-3xl font-bold", scoreColor(ubaScore))}>{ubaScore}</p>
          <p className="text-xs text-slate-400">UBA Score</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-700">{avgRating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-slate-400">{totalRatings} reviews</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-3">
          {isCertified && (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <Shield className="h-3 w-3" /> Certified
            </span>
          )}
          {violationCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-brand-red">
              <AlertTriangle className="h-3 w-3" /> {violationCount} violations
            </span>
          )}
        </div>
        {isBlacklisted && <Badge variant="destructive">Blacklisted</Badge>}
      </div>
    </a>
  );
}
