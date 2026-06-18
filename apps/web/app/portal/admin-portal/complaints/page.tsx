
"use client";
import { useState } from "react";
import { MessageSquare, Filter } from "lucide-react";

const MOCK_COMPLAINTS = [
  { id: "1", title: "Unpaid wages for event work", category: "Payment Issues", status: "OPEN", priority: "HIGH", date: "2026-06-14" },
  { id: "2", title: "Misleading job description", category: "Misconduct", status: "UNDER_REVIEW", priority: "MEDIUM", date: "2026-06-10" },
  { id: "3", title: "Unsafe working conditions", category: "Safety", status: "ESCALATED", priority: "CRITICAL", date: "2026-06-08" },
  { id: "4", title: "Contract violation", category: "Contract", status: "RESOLVED", priority: "LOW", date: "2026-06-01" },
];

const statusColors: Record<string, string> = {
  OPEN: "bg-yellow-100 text-yellow-700", UNDER_REVIEW: "bg-blue-100 text-blue-700",
  INVESTIGATING: "bg-purple-100 text-purple-700", ESCALATED: "bg-orange-100 text-orange-700",
  RESOLVED: "bg-green-100 text-green-700", REJECTED: "bg-red-100 text-red-700",
};
const priorityColors: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-600", MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700", CRITICAL: "bg-red-100 text-red-700",
};

export default function AdminComplaintsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const filtered = statusFilter ? MOCK_COMPLAINTS.filter((c) => c.status === statusFilter) : MOCK_COMPLAINTS;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
      <p className="text-gray-500 mt-1">Review and manage user complaints</p>
      <div className="mt-6 flex gap-2 flex-wrap">
        {["", "OPEN", "UNDER_REVIEW", "INVESTIGATING", "ESCALATED", "RESOLVED"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${statusFilter === s ? "bg-[#032B66] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s || "All"}</button>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {filtered.map((c) => (
            <div key={c.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className={`${statusColors[c.status] || "bg-gray-100"} p-2 rounded-lg`}><MessageSquare size={18} /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{c.title}</h3>
                <p className="text-sm text-gray-500">{c.category}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[c.priority]}`}>{c.priority}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
              <span className="text-xs text-gray-400">{c.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
