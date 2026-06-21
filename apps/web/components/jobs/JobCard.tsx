import { Briefcase, MapPin, Calendar, DollarSign, Clock, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface JobCardProps {
  id: string;
  title: string;
  agencyName: string;
  agencyScore: number;
  positionType: string;
  hourlyRate: number;
  eventDate: string;
  venue: string;
  city: string;
  state: string;
  spotsAvailable: number;
  positionsFilled: number;
  applicationDeadline: string;
  decisionByDate: string;
  hnaCompliant: boolean;
}

const positionIcons: Record<string, string> = {
  brand_ambassador: "🎤",
  product_specialist: "📱",
  team_lead: "👥",
  demo_specialist: "🎯",
  sampling_specialist: "🍕",
  street_team: "🚀",
  event_staff: "🎪",
  promotional_model: "✨",
  mascot: "🎭",
  trade_show_rep: "🏢",
  merchandiser: "🏪",
  retail_activation: "🏬",
  mobile_tour: "🚐",
  pop_up_retail: "🏪",
  field_marketing_rep: "📣",
  other: "💼",
};

export function JobCard({
  id,
  title,
  agencyName,
  agencyScore,
  positionType,
  hourlyRate,
  eventDate,
  city,
  state,
  spotsAvailable,
  applicationDeadline,
  hnaCompliant,
}: JobCardProps) {
  const deadline = new Date(applicationDeadline);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60)));
  const isUrgent = hoursLeft < 24;

  return (
    <a
      href={`/jobs/${id}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-lg">
            {positionIcons[positionType] || "💼"}
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-slate-900 group-hover:text-navy-600">
              {title}
            </h3>
            <p className="text-xs text-slate-500">
              {agencyName} &middot; Score {agencyScore}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading text-xl font-bold text-emerald-600">${hourlyRate}/hr</p>
          {hnaCompliant && (
            <Badge className="mt-1 bg-emerald-50 text-emerald-600">
              <Shield className="mr-1 h-2.5 w-2.5" /> HNA
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {eventDate}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {city}, {state}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" /> {spotsAvailable} spots
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <Badge variant="outline" className="capitalize">
          <Briefcase className="mr-1 h-3 w-3" />
          {positionType.replace("_", " ")}
        </Badge>
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isUrgent ? "text-brand-red" : "text-slate-500"
          )}
        >
          <Clock className="h-3 w-3" />
          {hoursLeft > 0 ? `${hoursLeft}h left to apply` : "Deadline passed"}
        </span>
      </div>
    </a>
  );
}
