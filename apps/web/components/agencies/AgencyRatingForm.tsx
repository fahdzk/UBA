"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AgencyRatingBadge } from "./AgencyRatingBadge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgencyRatingFormProps {
  agencyId: string;
  agencyName: string;
}

export function AgencyRatingForm({ agencyId, agencyName }: AgencyRatingFormProps) {
  const [ratings, setRatings] = useState({ overall: 0, payFairness: 0, paymentSpeed: 0, communication: 0, workerTreatment: 0 });
  const [review, setReview] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/agencies/${agencyId}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ratings, review, hourlyRate: parseFloat(hourlyRate) || undefined }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error("Rating submission failed:", err);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-heading text-lg font-semibold text-emerald-700">Rating submitted!</p>
        <p className="mt-1 text-sm text-emerald-600">Thank you for rating {agencyName}.</p>
      </div>
    );
  }

  const RatingRow = ({ label, value, field }: { label: string; value: number; field: keyof typeof ratings }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRatings((r) => ({ ...r, [field]: n }))}
            className="p-0.5"
          >
            <Star className={cn("h-5 w-5", n <= value ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-heading text-lg font-semibold text-slate-900">Rate {agencyName}</h3>
      <div className="space-y-3">
        <RatingRow label="Overall" value={ratings.overall} field="overall" />
        <RatingRow label="Pay Fairness" value={ratings.payFairness} field="payFairness" />
        <RatingRow label="Payment Speed" value={ratings.paymentSpeed} field="paymentSpeed" />
        <RatingRow label="Communication" value={ratings.communication} field="communication" />
        <RatingRow label="Worker Treatment" value={ratings.workerTreatment} field="workerTreatment" />
      </div>
      <div>
        <Label>Hourly Rate (optional)</Label>
        <Input value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="25.00" />
      </div>
      <div>
        <Label>Review (optional)</Label>
        <Textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your experience..." rows={3} />
      </div>
      <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-hover">Submit Rating</Button>
    </form>
  );
}
