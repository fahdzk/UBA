"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepUsernameProps {
  data: { username: string };
  update: (partial: Record<string, unknown>) => void;
  onNext: () => void;
}

export function StepUsername({ data, update, onNext }: StepUsernameProps) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const checkUsername = useCallback(
    async (username: string) => {
      if (username.length < 3) {
        setAvailable(null);
        return;
      }
      if (!/^[a-z0-9_]+$/.test(username)) {
        setError("Only lowercase letters, numbers, and underscores");
        setAvailable(false);
        return;
      }
      setError("");
      setChecking(true);
      try {
        const res = await fetch(`/api/users/username-check?username=${encodeURIComponent(username)}`);
        const json = await res.json();
        setAvailable(json.available);
      } catch {
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    },
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    update({ username: val });
    checkUsername(val);
  };

  const canNext = available === true && data.username.length >= 3;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900">Choose your username</h2>
        <p className="mt-1 text-sm text-slate-500">
          This is how other members will find you. 3-30 characters, lowercase only.
        </p>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
        <div className="relative">
          <Input
            value={data.username}
            onChange={handleChange}
            placeholder="your_username"
            className={cn(
              "pr-10",
              available === true && "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10",
              available === false && "border-brand-red focus:border-brand-red focus:ring-brand-red/10"
            )}
          />
          {checking && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" />
          )}
          {available === true && !checking && (
            <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
          )}
          {available === false && !checking && (
            <X className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-red" />
          )}
        </div>
        {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
        {available === false && !error && data.username.length >= 3 && (
          <p className="mt-1 text-xs text-brand-red">Username is taken</p>
        )}
        {available === true && (
          <p className="mt-1 text-xs text-emerald-600">Username is available!</p>
        )}
      </div>
      <div className="flex justify-end pt-2">
        <Button onClick={onNext} disabled={!canNext} className="bg-brand-red hover:bg-brand-red-hover">
          Continue
        </Button>
      </div>
    </div>
  );
}
