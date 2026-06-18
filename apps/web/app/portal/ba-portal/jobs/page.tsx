
"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, Clock, Filter } from "lucide-react";
import Link from "next/link";

// Mock job data - in production, fetch from /api/jobs
const MOCK_JOBS = [
  { id: "1", title: "Brand Ambassador - Nike Store", company: "Staffing Co", location: "New York, NY", rate: "$25/hr", type: "PART_TIME", posted: "2 days ago" },
  { id: "2", title: "Event Staff - Mercedes Benz", company: "Elite Staffing", location: "Los Angeles, CA", rate: "$30/hr", type: "EVENT", posted: "3 days ago" },
  { id: "3", title: "Retail Ambassador - Apple", company: "Apple Stores", location: "San Francisco, CA", rate: "$28/hr", type: "FULL_TIME", posted: "1 week ago" },
  { id: "4", title: "Demo Specialist - Samsung", company: "PromoWorkers", location: "Chicago, IL", rate: "$22/hr", type: "CONTRACT", posted: "4 days ago" },
  { id: "5", title: "Brand Rep - Coca Cola", company: "Marketing Pros", location: "Miami, FL", rate: "$26/hr", type: "PART_TIME", posted: "5 days ago" },
  { id: "6", title: "Trade Show Staff - Adobe", company: "EventForce", location: "Austin, TX", rate: "$35/hr", type: "EVENT", posted: "1 day ago" },
];

export default function BAJobsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const filtered = MOCK_JOBS.filter((job) => {
    if (search && !job.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (jobType && job.type !== jobType) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
          <p className="text-gray-500 mt-1">Find your next brand ambassador opportunity</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or company..."
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
              />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
              />
            </div>
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium text-gray-500 mb-1">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
            >
              <option value="">All Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="EVENT">Event</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((job) => (
          <Link key={job.id} href={`/portal/ba-portal/jobs/${job.id}`}>
            <div className="bg-white rounded-xl p-5 shadow-sm border hover:border-[#032B66] transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  job.type === "FULL_TIME" ? "bg-green-100 text-green-700" :
                  job.type === "PART_TIME" ? "bg-blue-100 text-blue-700" :
                  job.type === "EVENT" ? "bg-purple-100 text-purple-700" :
                  "bg-orange-100 text-orange-700"
                }`}>
                  {job.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {job.posted}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="font-semibold text-[#032B66]">{job.rate}</span>
                <span className="text-sm text-[#032B66] font-medium">Apply &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Briefcase size={48} className="mx-auto mb-4 opacity-30" />
          <p>No jobs match your criteria. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
