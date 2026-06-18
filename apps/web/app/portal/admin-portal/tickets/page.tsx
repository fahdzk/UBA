
"use client";
import { useState } from "react";
import { Ticket, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const MOCK_TICKETS = [
  { id: "1", ticketNumber: "TKT-ABC123", subject: "Follow-up on unpaid wages", status: "OPEN", priority: "HIGH", createdBy: "John Smith", date: "2026-06-14" },
  { id: "2", ticketNumber: "TKT-DEF456", subject: "Job description dispute", status: "IN_PROGRESS", priority: "MEDIUM", createdBy: "Jane Doe", date: "2026-06-12" },
  { id: "3", ticketNumber: "TKT-GHI789", subject: "Safety concern escalation", status: "RESOLVED", priority: "CRITICAL", createdBy: "Mike Johnson", date: "2026-06-08" },
];

const statusColors: Record<string, string> = {
  OPEN: "bg-yellow-100 text-yellow-700", IN_PROGRESS: "bg-blue-100 text-blue-700",
  WAITING: "bg-purple-100 text-purple-700", RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
};

export default function AdminTicketsPage() {
  const [filter, setFilter] = useState("");
  const filtered = filter ? MOCK_TICKETS.filter((t) => t.status === filter) : MOCK_TICKETS;
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
      <p className="text-gray-500 mt-1">Manage support tickets</p>
      <div className="mt-6 flex gap-2 flex-wrap">
        {["", "OPEN", "IN_PROGRESS", "WAITING", "RESOLVED", "CLOSED"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-sm transition-colors ${filter === s ? "bg-[#032B66] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s || "All"}</button>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {filtered.map((t) => (
            <div key={t.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className={`${statusColors[t.status] || "bg-gray-100"} p-2 rounded-lg`}><Ticket size={18} /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{t.subject}</h3>
                <p className="text-sm text-gray-500">{t.ticketNumber} - {t.createdBy}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
              <span className="text-xs text-gray-400">{t.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
