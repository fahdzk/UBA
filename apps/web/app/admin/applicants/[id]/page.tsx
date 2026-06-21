"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ApplicantDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  dateOfBirth: string;
  gender: string;
  applicationType: string;
  heightFeet: string;
  heightInches: string;
  weight: string;
  shirtSize: string;
  pantSize: string;
  shoeSize: string;
  ethnicity: string;
  languages: string[];
  visibleTattoos: boolean;
  visiblePiercings: boolean;
  smoker: boolean;
  howHeard: string;
  yearsExperience: string;
  eventTypes: string[];
  experienceDescription: string;
  agenciesWorked: string[];
  travelWillingness: string;
  validDriversLicense: boolean;
  ownVehicle: boolean;
  passportAvailable: boolean;
  canLift50lbs: boolean;
  weekendAvailability: boolean;
  overnightTravelOk: boolean;
  lastMinuteOk: boolean;
  tsaPreCheck: boolean;
  securityClearance: boolean;
  availableDays: string[];
  availableTimeWindows: string[];
  headshotUrl: string;
  fullBodyUrl: string;
  resumeUrl: string;
  introVideoUrl: string;
  status: string;
  adminNotes: string;
  starred: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  gigs: {
    eventName: string;
    agencyName: string;
    clientBrand: string;
    location: string;
    dateWorked: string;
    role: string;
    ratePaid: string;
    description: string;
  }[];
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  PENDING_REVIEW: "Pending Review",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  BLACKLISTED: "Blacklisted",
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SUBMITTED: "bg-blue-100 text-blue-700",
  PENDING_REVIEW: "bg-amber-100 text-amber-700",
  UNDER_REVIEW: "bg-purple-100 text-purple-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  BLACKLISTED: "bg-gray-800 text-gray-100",
};

export default function AdminApplicantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [applicant, setApplicant] = useState<ApplicantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await fetch(`/api/admin/applicants/${id}`);
        const data = await res.json();
        setApplicant(data);
        setNotes(data.adminNotes || "");
      } catch (e) {
        console.error("Failed to fetch applicant:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicant();
  }, [id]);

  const updateStatus = async (status: string) => {
    try {
      const res = await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      setApplicant(data);
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });
      const data = await res.json();
      setApplicant(data);
    } catch (e) {
      console.error("Failed to save notes:", e);
    } finally {
      setSaving(false);
    }
  };

  const toggleStar = async () => {
    if (!applicant) return;
    try {
      const res = await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starred: !applicant.starred }),
      });
      const data = await res.json();
      setApplicant(data);
    } catch (e) {
      console.error("Failed to toggle star:", e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading applicant...</div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Applicant not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/applicants" className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-3">
            {applicant.headshotUrl ? (
              <img src={applicant.headshotUrl} alt="" className="h-12 w-12 rounded-full object-cover border-2 border-slate-200" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-500">
                {applicant.firstName?.[0]}{applicant.lastName?.[0]}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-xl font-bold text-slate-900">
                  {applicant.firstName} {applicant.lastName}
                </h1>
                <button onClick={toggleStar} className="text-xl">
                  {applicant.starred ? "★" : "☆"}
                </button>
              </div>
              <p className="text-sm text-slate-500">{applicant.email} • {applicant.applicationType === "BRAND_AMBASSADOR" ? "Brand Ambassador" : "Product Specialist"}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={applicant.status}
            onChange={(e) => updateStatus(e.target.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium border-0 cursor-pointer ${STATUS_COLORS[applicant.status] || "bg-slate-100 text-slate-600"}`}
          >
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photos */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Photos & Media</h2>
            <div className="grid grid-cols-2 gap-4">
              {applicant.headshotUrl && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">Headshot</p>
                  <img src={applicant.headshotUrl} alt="Headshot" className="w-full rounded-lg object-cover border border-slate-200" />
                </div>
              )}
              {applicant.fullBodyUrl && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">Full Body</p>
                  <img src={applicant.fullBodyUrl} alt="Full Body" className="w-full rounded-lg object-cover border border-slate-200" />
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              {applicant.resumeUrl && (
                <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  📄 View Resume
                </a>
              )}
              {applicant.introVideoUrl && (
                <a href={applicant.introVideoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  🎬 View Intro Video
                </a>
              )}
            </div>
          </div>

          {/* Personal Info */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><span className="text-slate-500">Phone:</span> <span className="text-slate-900">{applicant.phone || "—"}</span></div>
              <div><span className="text-slate-500">Location:</span> <span className="text-slate-900">{applicant.city}, {applicant.state}, {applicant.country}</span></div>
              <div><span className="text-slate-500">DOB:</span> <span className="text-slate-900">{applicant.dateOfBirth ? new Date(applicant.dateOfBirth).toLocaleDateString() : "—"}</span></div>
              <div><span className="text-slate-500">Gender:</span> <span className="text-slate-900">{applicant.gender || "—"}</span></div>
              <div><span className="text-slate-500">Ethnicity:</span> <span className="text-slate-900">{applicant.ethnicity || "—"}</span></div>
              <div><span className="text-slate-500">Languages:</span> <span className="text-slate-900">{applicant.languages?.join(", ") || "—"}</span></div>
              <div><span className="text-slate-500">Tattoos:</span> <span className="text-slate-900">{applicant.visibleTattoos ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Piercings:</span> <span className="text-slate-900">{applicant.visiblePiercings ? "Yes" : "No"}</span></div>
              <div><span className="text-slate-500">Smoker:</span> <span className="text-slate-900">{applicant.smoker ? "Yes" : "No"}</span></div>
            </div>
          </div>

          {/* Physical Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Physical Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><span className="text-slate-500">Height:</span> <span className="text-slate-900">{applicant.heightFeet}&apos;{applicant.heightInches}&quot;</span></div>
              <div><span className="text-slate-500">Weight:</span> <span className="text-slate-900">{applicant.weight} lbs</span></div>
              <div><span className="text-slate-500">Shirt:</span> <span className="text-slate-900">{applicant.shirtSize}</span></div>
              <div><span className="text-slate-500">Pant:</span> <span className="text-slate-900">{applicant.pantSize}</span></div>
              <div><span className="text-slate-500">Shoe:</span> <span className="text-slate-900">{applicant.shoeSize}</span></div>
            </div>
          </div>

          {/* Experience */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Experience</h2>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-slate-500">Years:</span> <span className="text-slate-900">{applicant.yearsExperience}</span></div>
                <div><span className="text-slate-500">How Heard:</span> <span className="text-slate-900">{applicant.howHeard}</span></div>
              </div>
              {applicant.eventTypes?.length > 0 && (
                <div>
                  <span className="text-slate-500">Event Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {applicant.eventTypes.map((et) => (
                      <span key={et} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">{et}</span>
                    ))}
                  </div>
                </div>
              )}
              {applicant.agenciesWorked?.length > 0 && (
                <div>
                  <span className="text-slate-500">Agencies:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {applicant.agenciesWorked.map((a) => (
                      <span key={a} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{a}</span>
                    ))}
                  </div>
                </div>
              )}
              {applicant.experienceDescription && (
                <div>
                  <span className="text-slate-500">Description:</span>
                  <p className="text-slate-900 mt-1 whitespace-pre-wrap">{applicant.experienceDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Last 3 Gigs */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Last 3 Gigs</h2>
            <div className="space-y-4">
              {applicant.gigs?.map((gig, i) => (
                <div key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">{i + 1}</span>
                    <span className="font-medium text-slate-900">{gig.eventName || `Gig #${i + 1}`}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {gig.agencyName && <div><span className="text-slate-500">Agency:</span> {gig.agencyName}</div>}
                    {gig.clientBrand && <div><span className="text-slate-500">Brand:</span> {gig.clientBrand}</div>}
                    {gig.location && <div><span className="text-slate-500">Location:</span> {gig.location}</div>}
                    {gig.dateWorked && <div><span className="text-slate-500">Date:</span> {gig.dateWorked}</div>}
                    {gig.role && <div><span className="text-slate-500">Role:</span> {gig.role}</div>}
                    {gig.ratePaid && <div><span className="text-slate-500">Rate:</span> {gig.ratePaid}</div>}
                  </div>
                  {gig.description && <p className="text-sm text-slate-600 mt-2">{gig.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Availability & Travel</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500">Travel:</span> <span className="text-slate-900">{applicant.travelWillingness?.replace("_", " ") || "—"}</span></div>
              <div><span className="text-slate-500">Days:</span> <span className="text-slate-900">{applicant.availableDays?.join(", ") || "—"}</span></div>
              <div><span className="text-slate-500">Times:</span> <span className="text-slate-900">{applicant.availableTimeWindows?.join(", ") || "—"}</span></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {applicant.validDriversLicense && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Driver License</span>}
              {applicant.ownVehicle && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Own Vehicle</span>}
              {applicant.passportAvailable && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Passport</span>}
              {applicant.canLift50lbs && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Can Lift 50 lbs</span>}
              {applicant.weekendAvailability && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Weekends</span>}
              {applicant.overnightTravelOk && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Overnight</span>}
              {applicant.lastMinuteOk && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Last Minute</span>}
              {applicant.tsaPreCheck && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">TSA PreCheck</span>}
              {applicant.securityClearance && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">Security Clearance</span>}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button onClick={() => updateStatus("APPROVED")}
                className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-500 transition-colors">
                ✓ Approve
              </button>
              <button onClick={() => updateStatus("UNDER_REVIEW")}
                className="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-500 transition-colors">
                👁 Move to Under Review
              </button>
              <button onClick={() => updateStatus("REJECTED")}
                className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500 transition-colors">
                ✗ Reject
              </button>
              <button onClick={() => updateStatus("BLACKLISTED")}
                className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
                🚫 Blacklist
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Internal Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this applicant..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none min-h-[120px] resize-y"
            />
            <button onClick={saveNotes} disabled={saving}
              className="mt-2 w-full rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600 disabled:opacity-50 transition-colors">
              {saving ? "Saving..." : "Save Notes"}
            </button>
          </div>

          {/* Timestamps */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">Timeline</h2>
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-500">Created:</span> <span className="text-slate-900">{new Date(applicant.createdAt).toLocaleString()}</span></div>
              <div><span className="text-slate-500">Updated:</span> <span className="text-slate-900">{new Date(applicant.updatedAt).toLocaleString()}</span></div>
              {applicant.submittedAt && (
                <div><span className="text-slate-500">Submitted:</span> <span className="text-slate-900">{new Date(applicant.submittedAt).toLocaleString()}</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
