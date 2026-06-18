
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Clock, DollarSign, Building, Check, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function BAJobDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [applied, setApplied] = useState(false);

  // Mock data - in production fetch from /api/jobs/[id]
  const job = {
    id,
    title: "Brand Ambassador - Nike Store",
    company: "Staffing Co",
    location: "New York, NY",
    rate: "$25/hr",
    type: "PART_TIME",
    description: "We are seeking an enthusiastic Brand Ambassador to represent Nike at our flagship NYC location. You will engage with customers, showcase products, and create memorable brand experiences.\n\nResponsibilities:\n- Greet and engage customers\n- Demonstrate product features\n- Maintain brand standards\n- Collect customer feedback",
    requirements: ["1+ years retail experience", "Excellent communication skills", "Flexible schedule", "Customer-facing role"],
    startDate: "Immediate",
    endDate: "Ongoing",
    posted: "2 days ago",
  };

  const handleApply = async () => {
    // TODO: Submit to /api/applications
    setApplied(true);
  };

  return (
    <div>
      <Link href="/portal/ba-portal/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#032B66] mb-6">
        <ArrowLeft size={16} />
        Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <Building size={16} />
                  {job.company}
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {job.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
              <span className="flex items-center gap-1"><DollarSign size={14} />{job.rate}</span>
              <span className="flex items-center gap-1"><Clock size={14} />Posted {job.posted}</span>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-3">Description</h2>
              <div className="text-sm text-gray-600 whitespace-pre-line">{job.description}</div>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-3">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4">Apply Now</h2>
            {applied ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check size={24} className="text-green-600" />
                </div>
                <p className="font-medium text-green-600">Application Submitted!</p>
                <p className="text-sm text-gray-500 mt-1">We&apos;ll notify you of updates.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Cover Letter</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
                      placeholder="Why are you a great fit..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Resume URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleApply}
                  className="w-full mt-4 py-2.5 bg-[#032B66] text-white rounded-lg font-medium hover:bg-[#032B66]/90"
                >
                  Submit Application
                </button>
              </>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-3">About {job.company}</h2>
            <p className="text-sm text-gray-500">
              Leading staffing agency specializing in brand ambassador and event staffing across major US markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
