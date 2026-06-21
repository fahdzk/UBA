"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/JobCard";

const MOCK_JOBS = [
  { id: "1", title: "Brand Ambassador - Tech Conference", agencyName: "Elite Promotions", agencyScore: 87, positionType: "brand_ambassador", hourlyRate: 35, eventDate: "2026-07-15", venue: "LA Convention Center", city: "Los Angeles", state: "CA", spotsAvailable: 8, positionsFilled: 2, applicationDeadline: "2026-07-10T23:59:00Z", decisionByDate: "2026-07-12T23:59:00Z", hnaCompliant: true, brandName: "TechCorp", description: "Staffing a major tech conference booth. Must be professional, punctual, and comfortable with tech products." },
  { id: "2", title: "Product Demo Specialist", agencyName: "Apex Event Staff", agencyScore: 94, positionType: "product_specialist", hourlyRate: 40, eventDate: "2026-07-18", venue: "Westfield Mall", city: "San Diego", state: "CA", spotsAvailable: 4, positionsFilled: 1, applicationDeadline: "2026-07-14T23:59:00Z", decisionByDate: "2026-07-16T23:59:00Z", hnaCompliant: true, brandName: "GadgetWorld", description: "Demonstrate new smartphone accessories to shoppers. Tech experience preferred." },
  { id: "3", title: "Event Staff - Music Festival", agencyName: "BrandForce Agency", agencyScore: 72, positionType: "event_staff", hourlyRate: 30, eventDate: "2026-07-25", venue: "Hollywood Bowl", city: "Los Angeles", state: "CA", spotsAvailable: 20, positionsFilled: 15, applicationDeadline: "2026-07-20T23:59:00Z", decisionByDate: "2026-07-22T23:59:00Z", hnaCompliant: true, brandName: "SoundWave", description: "General event support including setup, guest assistance, and teardown." },
  { id: "4", title: "Sampling Specialist - Grocery Chain", agencyName: "Promo Masters", agencyScore: 61, positionType: "sampling_specialist", hourlyRate: 28, eventDate: "2026-07-20", venue: "Whole Foods", city: "Santa Monica", state: "CA", spotsAvailable: 6, positionsFilled: 3, applicationDeadline: "2026-07-17T23:59:00Z", decisionByDate: "2026-07-18T23:59:00Z", hnaCompliant: false, brandName: "FreshBites", description: "Set up sampling station, engage customers, track product interest." },
  { id: "5", title: "Trade Show Rep - Auto Show", agencyName: "Elite Promotions", agencyScore: 87, positionType: "trade_show_rep", hourlyRate: 38, eventDate: "2026-08-05", venue: "LA Auto Show", city: "Los Angeles", state: "CA", spotsAvailable: 12, positionsFilled: 5, applicationDeadline: "2026-07-30T23:59:00Z", decisionByDate: "2026-08-02T23:59:00Z", hnaCompliant: true, brandName: "AutoDrive", description: "Represent client brand at auto show booth. Vehicle knowledge a plus." },
  { id: "6", title: "Street Team - Energy Drink Launch", agencyName: "Street Team Pro", agencyScore: 45, positionType: "street_team", hourlyRate: 25, eventDate: "2026-07-28", venue: "Venice Beach", city: "Los Angeles", state: "CA", spotsAvailable: 10, positionsFilled: 7, applicationDeadline: "2026-07-25T23:59:00Z", decisionByDate: "2026-07-26T23:59:00Z", hnaCompliant: false, brandName: "PowerSurge", description: "Distribute samples at high-traffic beach location. Must be energetic and outgoing." },
];

export default function JobBoard() {
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("");
  const [minPay, setMinPay] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filtered = MOCK_JOBS.filter((j) => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.agencyName.toLowerCase().includes(search.toLowerCase())) return false;
    if (positionFilter !== "all" && j.positionType !== positionFilter) return false;
    if (stateFilter && j.state !== stateFilter.toUpperCase()) return false;
    if (minPay && j.hourlyRate < parseFloat(minPay)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "pay") return b.hourlyRate - a.hourlyRate;
    if (sortBy === "deadline") return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
    return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Job Board</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs or agencies..."
          className="w-full sm:w-56"
        />
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All Positions</option>
          <option value="brand_ambassador">Brand Ambassador</option>
          <option value="product_specialist">Product Specialist</option>
          <option value="team_lead">Team Lead</option>
          <option value="demo_specialist">Demo Specialist</option>
          <option value="sampling_specialist">Sampling Specialist</option>
          <option value="event_staff">Event Staff</option>
          <option value="street_team">Street Team</option>
          <option value="trade_show_rep">Trade Show Rep</option>
          <option value="other">Other</option>
        </select>
        <Input
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value.toUpperCase())}
          placeholder="State"
          maxLength={2}
          className="w-20"
        />
        <Input
          type="number"
          value={minPay}
          onChange={(e) => setMinPay(e.target.value)}
          placeholder="Min $/hr"
          className="w-28"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="date">Newest First</option>
          <option value="pay">Highest Pay</option>
          <option value="deadline">Deadline Soon</option>
        </select>
      </div>

      {/* Results */}
      <p className="text-sm text-slate-500">{filtered.length} jobs found</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16">
          <p className="text-sm font-medium text-slate-500">No jobs match your criteria</p>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
