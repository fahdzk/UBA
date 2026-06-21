"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Users, Mic, Star, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepPositionProps {
  data: { positionType: string; city: string; state: string; yearsExperience: number; bio: string };
  update: (partial: Record<string, unknown>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const positions = [
  { value: "brand_ambassador", label: "Brand Ambassador", icon: Star },
  { value: "product_specialist", label: "Product Specialist", icon: Briefcase },
  { value: "team_lead", label: "Team Lead", icon: Users },
  { value: "demo_specialist", label: "Demo Specialist", icon: Mic },
  { value: "event_staff", label: "Event Staff", icon: Calendar },
  { value: "other", label: "Other", icon: Briefcase },
];

export function StepPosition({ data, update, onNext, onPrev }: StepPositionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900">Your details</h2>
        <p className="mt-1 text-sm text-slate-500">Tell us about your experience.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Position Type</label>
        <div className="grid grid-cols-2 gap-2">
          {positions.map((pos) => (
            <button
              key={pos.value}
              onClick={() => update({ positionType: pos.value })}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all",
                data.positionType === pos.value
                  ? "border-navy-600 bg-navy-50 text-navy-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              )}
            >
              <pos.icon className="h-4 w-4" />
              {pos.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">City</label>
          <Input
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="Los Angeles"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">State</label>
          <Input
            value={data.state}
            onChange={(e) => update({ state: e.target.value.toUpperCase() })}
            placeholder="CA"
            maxLength={2}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Years of Experience</label>
        <Input
          type="number"
          min={0}
          max={50}
          value={data.yearsExperience || ""}
          onChange={(e) => update({ yearsExperience: parseInt(e.target.value) || 0 })}
          placeholder="3"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Bio (optional)</label>
        <Textarea
          value={data.bio}
          onChange={(e) => update({ bio: e.target.value })}
          placeholder="Tell agencies about yourself..."
          maxLength={500}
          rows={3}
        />
        <p className="mt-1 text-xs text-slate-400">{data.bio.length}/500</p>
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
