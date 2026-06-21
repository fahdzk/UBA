"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgencyScoreBar } from "@/components/agencies/AgencyScoreBar";
import { AgencyRatingForm } from "@/components/agencies/AgencyRatingForm";
import { AgencyRatingBadge } from "@/components/agencies/AgencyRatingBadge";
import { Star, MapPin, Shield, AlertTriangle, Briefcase, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Reviews", "Violations", "Jobs"] as const;

export default function AgencyDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState<string>("Overview");

  const agency = {
    name: "Elite Promotions",
    slug: params.slug,
    city: "Los Angeles",
    state: "CA",
    ubaScore: 87,
    tier: "gold",
    avgRating: 4.5,
    totalRatings: 142,
    violationCount: 2,
    activeViolations: 0,
    isCertified: true,
    description: "Premium brand ambassador staffing agency serving the West Coast since 2018.",
    website: "https://elitepromo.example.com",
    email: "contact@elitepromo.example.com",
    phone: "+1 (310) 555-0142",
    scores: { payFairness: 82, paymentSpeed: 78, hnaCompliance: 95, workerTreatment: 88, contractIntegrity: 90 },
  };

  const reviews = [
    { id: "1", author: "jane_doe", position: "Brand Ambassador", rating: 5, text: "Great agency. Paid on time and communicated well.", rate: 32, date: "2026-05-15" },
    { id: "2", author: "mike_promos", position: "Demo Specialist", rating: 4, text: "Good experience overall. Would work with them again.", rate: 28, date: "2026-04-22" },
    { id: "3", author: "sarah_events", position: "Event Staff", rating: 5, text: "Professional team, clear briefs, fair pay.", rate: 35, date: "2026-03-10" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
              <span className="font-heading text-2xl font-bold">{agency.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-slate-900">{agency.name}</h1>
                {agency.isCertified && (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <Shield className="mr-1 h-3 w-3" /> Certified
                  </Badge>
                )}
              </div>
              <p className="flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3 w-3" /> {agency.city}, {agency.state}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn("font-heading text-4xl font-bold", agency.ubaScore >= 75 ? "text-emerald-600" : agency.ubaScore >= 50 ? "text-amber-600" : "text-brand-red")}>
              {agency.ubaScore}
            </p>
            <p className="text-xs text-slate-400">UBA Score</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1.5">
            <AgencyRatingBadge rating={agency.avgRating} />
            <span className="text-sm font-medium text-slate-700">{agency.avgRating}</span>
            <span className="text-xs text-slate-400">({agency.totalRatings} reviews)</span>
          </div>
          {agency.activeViolations > 0 && (
            <div className="flex items-center gap-1 text-brand-red">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">{agency.activeViolations} active violations</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 pb-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Score Breakdown</h2>
            <div className="mt-4 space-y-4">
              <AgencyScoreBar label="Pay Fairness" value={agency.scores.payFairness} />
              <AgencyScoreBar label="Payment Speed" value={agency.scores.paymentSpeed} />
              <AgencyScoreBar label="HNA Compliance" value={agency.scores.hnaCompliance} />
              <AgencyScoreBar label="Worker Treatment" value={agency.scores.workerTreatment} />
              <AgencyScoreBar label="Contract Integrity" value={agency.scores.contractIntegrity} />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">About</h2>
            <p className="mt-3 text-sm text-slate-600">{agency.description}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-slate-500">Website: <span className="text-navy-600">{agency.website}</span></p>
              <p className="text-sm text-slate-500">Email: <span className="text-navy-600">{agency.email}</span></p>
              <p className="text-sm text-slate-500">Phone: {agency.phone}</p>
            </div>
            <Button className="mt-6 bg-brand-red hover:bg-brand-red-hover">Rate This Agency</Button>
          </div>
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <AgencyRatingForm agencyId={agency.slug} agencyName={agency.name} />
          </div>
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">@{r.author}</p>
                  <p className="text-xs text-slate-400">{r.position} &middot; {r.date}</p>
                </div>
                <div className="text-right">
                  <AgencyRatingBadge rating={r.rating} size="sm" />
                  <p className="mt-1 text-xs text-slate-500">${r.rate}/hr</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Violations" && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-emerald-400" />
            <p className="mt-3 text-sm font-medium text-slate-700">No active violations</p>
            <p className="mt-1 text-xs text-slate-400">{agency.violationCount} historical violations (all resolved)</p>
          </div>
        </div>
      )}

      {activeTab === "Jobs" && (
        <div className="space-y-3">
          {[
            { title: "Brand Ambassador - Tech Conference", position: "brand_ambassador", rate: 35, date: "2026-07-15", spots: 8, city: "Los Angeles", state: "CA" },
            { title: "Product Demo Specialist", position: "product_specialist", rate: 30, date: "2026-07-22", spots: 4, city: "San Diego", state: "CA" },
          ].map((job, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div>
                <p className="font-medium text-slate-900">{job.title}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.position.replace("_", " ")}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {job.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.city}, {job.state}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">${job.rate}/hr</p>
                <p className="text-xs text-slate-400">{job.spots} spots</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
