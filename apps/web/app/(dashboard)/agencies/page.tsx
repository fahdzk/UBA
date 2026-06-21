"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AgencyCard } from "@/components/agencies/AgencyCard";

const MOCK_AGENCIES = [
  { name: "Elite Promotions", slug: "elite-promotions", city: "Los Angeles", state: "CA", ubaScore: 87, tier: "gold", avgRating: 4.5, totalRatings: 142, violationCount: 2, isCertified: true, isBlacklisted: false },
  { name: "BrandForce Agency", slug: "brandforce-agency", city: "New York", state: "NY", ubaScore: 72, tier: "silver", avgRating: 3.8, totalRatings: 89, violationCount: 5, isCertified: false, isBlacklisted: false },
  { name: "Apex Event Staff", slug: "apex-event-staff", city: "Chicago", state: "IL", ubaScore: 94, tier: "platinum", avgRating: 4.9, totalRatings: 203, violationCount: 0, isCertified: true, isBlacklisted: false },
  { name: "Street Team Pro", slug: "street-team-pro", city: "Miami", state: "FL", ubaScore: 45, tier: "yellow", avgRating: 2.9, totalRatings: 34, violationCount: 8, isCertified: false, isBlacklisted: false },
  { name: "Promo Masters", slug: "promo-masters", city: "Dallas", state: "TX", ubaScore: 61, tier: "silver", avgRating: 3.5, totalRatings: 67, violationCount: 3, isCertified: true, isBlacklisted: false },
  { name: "Red Flag Agency", slug: "red-flag-agency", city: "Phoenix", state: "AZ", ubaScore: 18, tier: "red", avgRating: 1.8, totalRatings: 15, violationCount: 12, isCertified: false, isBlacklisted: true },
];

export function AgencyDirectory() {
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("");

  const filtered = MOCK_AGENCIES.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedTier !== "all" && a.tier !== selectedTier) return false;
    if (selectedState && a.state !== selectedState) return false;
    return true;
  }).sort((a, b) => b.ubaScore - a.ubaScore);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Agency Directory</h1>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agencies..."
            className="w-full sm:w-64"
          />
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All Tiers</option>
            <option value="platinum">Platinum</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        {["all", "certified", "new"].map((f) => (
          <Badge key={f} variant={f === "all" ? "default" : "outline"} className="cursor-pointer capitalize">
            {f}
          </Badge>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16">
          <p className="text-sm font-medium text-slate-500">No agencies found</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((agency) => (
            <AgencyCard key={agency.slug} {...agency} />
          ))}
        </div>
      )}
    </div>
  );
}
