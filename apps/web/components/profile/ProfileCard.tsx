import { User, MapPin, Calendar, Star, Award, Briefcase, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  displayName: string;
  username: string;
  firstName: string;
  lastName: string;
  positionType: string;
  tierLevel: number;
  city?: string;
  state?: string;
  bio?: string;
  yearsExperience?: number;
  skills?: string[];
  certifications?: string[];
  avatarUrl?: string;
  memberSince: string;
  totalEventsWorked: number;
  averageRating: number;
  isAvailable: boolean;
}

export function ProfileCard({
  displayName,
  username,
  positionType,
  tierLevel,
  city,
  state,
  bio,
  yearsExperience,
  skills,
  certifications,
  avatarUrl,
  memberSince,
  totalEventsWorked,
  averageRating,
  isAvailable,
}: ProfileCardProps) {
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="h-28 w-28 rounded-full object-cover" />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-navy-100 text-navy-600">
              <span className="font-heading text-3xl font-bold">{initials}</span>
            </div>
          )}
          <div className="mt-4 flex-1 sm:mt-0 sm:ml-6">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-heading text-2xl font-bold text-slate-900">{displayName}</h1>
                <p className="text-sm text-slate-500">@{username}</p>
              </div>
              <div className="flex gap-2">
                {isAvailable && (
                  <Badge className="bg-emerald-50 text-emerald-600">Available</Badge>
                )}
                <Badge variant="outline" className="capitalize">
                  <Briefcase className="mr-1 h-3 w-3" />
                  {positionType?.replace("_", " ") || "Member"}
                </Badge>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500 sm:justify-start">
              {(city || state) && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {[city, state].filter(Boolean).join(", ")}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Member since {new Date(memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
              {yearsExperience !== undefined && (
                <span className="flex items-center gap-1">
                  <Award className="h-3 w-3" /> {yearsExperience} years exp
                </span>
              )}
            </div>

            {bio && <p className="mt-4 text-sm text-slate-600">{bio}</p>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatBox label="Tier" value={tierLevel.toString()} icon={Shield} />
        <StatBox label="Events Worked" value={totalEventsWorked.toString()} icon={Briefcase} />
        <StatBox label="Avg Rating" value={averageRating ? averageRating.toFixed(1) : "—"} icon={Star} />
        <StatBox label="Skills" value={skills?.length?.toString() || "0"} icon={Award} />
      </div>

      {/* Skills & Certifications */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skills && skills.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        )}
        {certifications && certifications.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Certifications</h2>
            <ul className="mt-3 space-y-1">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="h-3.5 w-3.5 text-amber-500" /> {cert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <Icon className="mx-auto h-5 w-5 text-slate-400" />
      <p className="mt-2 font-heading text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
