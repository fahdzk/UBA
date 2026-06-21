"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface StepCompleteProps {
  data: { username: string; role: string; positionType: string; city: string; state: string };
  onPrev: () => void;
  onFinish: () => Promise<void>;
}

export function StepComplete({ data, onPrev, onFinish }: StepCompleteProps) {
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    await onFinish();
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900">You&apos;re all set!</h2>
        <p className="mt-1 text-sm text-slate-500">Review your profile and join UBA.</p>
      </div>

      <div className="space-y-3 rounded-lg bg-slate-50 p-4">
        <div className="flex justify-between">
          <span className="text-sm text-slate-500">Username</span>
          <span className="text-sm font-medium text-slate-900">@{data.username}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500">Role</span>
          <span className="text-sm font-medium text-slate-900 capitalize">{data.role.replace("_", " ")}</span>
        </div>
        {data.positionType && (
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Position</span>
            <span className="text-sm font-medium text-slate-900 capitalize">{data.positionType.replace("_", " ")}</span>
          </div>
        )}
        {(data.city || data.state) && (
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Location</span>
            <span className="text-sm font-medium text-slate-900">
              {[data.city, data.state].filter(Boolean).join(", ")}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={onPrev} disabled={loading}>
          Back
        </Button>
        <Button onClick={handleFinish} disabled={loading} className="bg-brand-red hover:bg-brand-red-hover">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Check className="mr-2 h-4 w-4" />
          )}
          Join UBA
        </Button>
      </div>
    </div>
  );
}
