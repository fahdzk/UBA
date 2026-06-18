
"use client";
import { useState } from "react";
import { FileText, CheckCircle, XCircle, Clock, Eye } from "lucide-react";

const MOCK_APPS = [
  { id: "1", applicant: "John Smith", jobTitle: "Brand Ambassador - Nike Store", status: "PENDING", date: "2026-06-15" },
  { id: "2", applicant: "Jane Doe", jobTitle: "Brand Ambassador - Nike Store", status: "SHORTLISTED", date: "2026-06-14" },
  { id: "3", applicant: "Mike Johnson", jobTitle: "Event Staff - Mercedes Benz", status: "ACCEPTED", date: "2026-06-12" },
  { id: "4", applicant: "Sarah Williams", jobTitle: "Event Staff - Mercedes Benz", status: "REJECTED", date: "2026-06-11" },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof FileText }> = {
  PENDING: { label: "Pending", color: "bg-gray-100 text-gray-700", icon: Clock },
  SHORTLISTED: { label: "Shortlisted", color: "bg-purple-100 text-purple-700", icon: Eye },
  ACCEPTED: { label: "Accepted", color: "bg-green-100 text-green-700", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function AgencyApplicationsPage() {
  const [filter, setFilter] = useState("");
  const apps = filter ? MOCK_APPS.filter((a) => a.status === filter) : MOCK_APPS;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
      <p className="text-gray-500 mt-1">Review and manage job applications</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {["", "PENDING", "SHORTLISTED", "ACCEPTED", "REJECTED"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${filter === s ? "bg-[#032B66] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s || "All"}</button>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {apps.map((app) => { const config = statusConfig[app.status] || statusConfig.PENDING; const StatusIcon = config.icon; return (
            <div key={app.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className={`${config.color} p-2 rounded-lg`}><StatusIcon size={18} /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">{app.applicant}</h3>
                <p className="text-sm text-gray-500">{app.jobTitle}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>{config.label}</span>
                <p className="text-xs text-gray-400 mt-1">{app.date}</p>
              </div>
            </div>
          ); })}
        </div>
      </div>
    </div>
  );
}
