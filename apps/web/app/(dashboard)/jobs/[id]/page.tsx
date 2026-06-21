"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobApplicationForm } from "@/components/jobs/JobApplicationForm";
import { HNAStatusIndicator } from "@/components/jobs/HNAStatusIndicator";
import { Briefcase, MapPin, Calendar, DollarSign, Clock, Users, Building2, Shield } from "lucide-react";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [showApply, setShowApply] = useState(false);

  const job = {
    id: params.id,
    title: "Brand Ambassador - Tech Conference",
    agencyName: "Elite Promotions",
    agencyScore: 87,
    positionType: "brand_ambassador",
    hourlyRate: 35,
    guaranteedHours: 4,
    eventDate: "2026-07-15",
    startTime: "08:00",
    endTime: "17:00",
    setupTime: "07:00",
    venueName: "LA Convention Center",
    address: "1201 S Figueroa St",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90015",
    spotsAvailable: 8,
    positionsFilled: 2,
    applicationDeadline: "2026-07-10T23:59:00Z",
    decisionByDate: "2026-07-12T23:59:00Z",
    hnaCompliant: true,
    hnaNotificationsSent: false,
    brandName: "TechCorp",
    description: "We're looking for professional brand ambassadors to staff our client's booth at a major tech conference. You'll be demonstrating new products, engaging with attendees, and representing the TechCorp brand. Must be punctual, personable, and comfortable with technology. Previous tech event experience is a plus but not required.",
    dressCode: "Business casual, black pants, branded polo shirt (provided)",
    requiredTier: 1,
    requiredCertifications: [],
    requiredSkills: ["Communication", "Customer Service"],
  };

  const deadline = new Date(job.applicationDeadline);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold text-slate-900">{job.title}</h1>
              {job.brandName && <Badge variant="outline">{job.brandName}</Badge>}
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <Building2 className="h-4 w-4" /> {job.agencyName} &middot; Score {job.agencyScore}
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading text-3xl font-bold text-emerald-600">${job.hourlyRate}/hr</p>
            <p className="text-xs text-slate-400">{job.guaranteedHours}hr guaranteed</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {job.eventDate}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.startTime} - {job.endTime}</span>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.city}, {job.state}</span>
          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {job.spotsAvailable - job.positionsFilled} spots left</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="capitalize">
            <Briefcase className="mr-1 h-3 w-3" /> {job.positionType.replace("_", " ")}
          </Badge>
          <HNAStatusIndicator decisionByDate={job.decisionByDate} notificationsSent={job.hnaNotificationsSent} />
          {hoursLeft > 0 && (
            <Badge variant={hoursLeft < 24 ? "destructive" : "outline"}>
              <Clock className="mr-1 h-3 w-3" /> {hoursLeft}h to apply
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <Button onClick={() => setShowApply(true)} className="bg-brand-red hover:bg-brand-red-hover">
            Apply for This Position
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.description}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Venue & Schedule</h2>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-slate-600"><strong>Venue:</strong> {job.venueName}</p>
              <p className="text-sm text-slate-600"><strong>Address:</strong> {job.address}, {job.city}, {job.state} {job.zipCode}</p>
              <p className="text-sm text-slate-600"><strong>Date:</strong> {job.eventDate}</p>
              <p className="text-sm text-slate-600"><strong>Time:</strong> {job.startTime} - {job.endTime} {job.setupTime && `(setup at ${job.setupTime})`}</p>
              {job.dressCode && <p className="text-sm text-slate-600"><strong>Dress Code:</strong> {job.dressCode}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">HNA Compliance</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">Application deadline set</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">Decision date set</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600">Minimum pay: ${job.hourlyRate}/hr</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Decision by: {new Date(job.decisionByDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900">Requirements</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>Minimum Tier: {job.requiredTier}</p>
              {job.requiredSkills.length > 0 && (
                <div>
                  <p className="mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.map((s) => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <JobApplicationForm
        jobId={job.id}
        jobTitle={job.title}
        open={showApply}
        onClose={() => setShowApply(false)}
      />
    </div>
  );
}
