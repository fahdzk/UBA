"use client";

import { Button } from "@/components/ui/button";
import { User, Building2, Scale, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepRoleProps {
  data: { role: string };
  update: (partial: Record<string, unknown>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const roles = [
  { value: "member", label: "Brand Ambassador", icon: User, desc: "Work events, rate agencies, file violations" },
  { value: "agency", label: "Agency", icon: Building2, desc: "Post jobs, manage applicants, build reputation" },
  { value: "legal_partner", label: "Legal Partner", icon: Scale, desc: "Provide legal support to members" },
  { value: "brand_partner", label: "Brand Partner", icon: Megaphone, desc: "Sponsor events and connect with ambassadors" },
];

export function StepRole({ data, update, onNext, onPrev }: StepRoleProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900">What&apos;s your role?</h2>
        <p className="mt-1 text-sm text-slate-500">Select the option that best describes you.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => update({ role: role.value })}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
              data.role === role.value
                ? "border-navy-600 bg-navy-50 ring-2 ring-navy-600/20"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <role.icon className={cn("mt-0.5 h-5 w-5", data.role === role.value ? "text-navy-600" : "text-slate-400")} />
            <div>
              <p className="text-sm font-semibold text-slate-900">{role.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext} className="bg-brand-red hover:bg-brand-red-hover">
          Continue
        </Button>
      </div>
    </div>
  );
}
