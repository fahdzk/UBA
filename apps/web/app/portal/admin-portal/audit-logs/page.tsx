
"use client";
import { useState } from "react";
import { Search, FileText, Clock } from "lucide-react";

const MOCK_LOGS = [
  { id: "1", action: "CREATE", resource: "complaint", user: "John Smith", timestamp: "2026-06-14 10:30:00" },
  { id: "2", action: "UPDATE", resource: "user", user: "Admin", timestamp: "2026-06-14 09:15:00" },
  { id: "3", action: "DELETE", resource: "job", user: "Agency Admin", timestamp: "2026-06-13 16:45:00" },
  { id: "4", action: "PAYMENT_PROCESSED", resource: "stripe_webhook", user: "System", timestamp: "2026-06-13 14:20:00" },
];

const actionColors: Record<string, string> = {
  CREATE: "bg-green-100 text-green-700", UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700", PAYMENT_PROCESSED: "bg-purple-100 text-purple-700",
};

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_LOGS.filter((l) => !search || l.action.toLowerCase().includes(search.toLowerCase()) || l.resource.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
      <p className="text-gray-500 mt-1">Track all platform activity</p>
      <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border">
        <div className="relative"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
      </div>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-4 font-medium text-gray-500">Action</th>
            <th className="text-left p-4 font-medium text-gray-500">Resource</th>
            <th className="text-left p-4 font-medium text-gray-500">User</th>
            <th className="text-left p-4 font-medium text-gray-500">Timestamp</th>
          </tr></thead>
          <tbody className="divide-y">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${actionColors[log.action] || "bg-gray-100"}`}>{log.action}</span></td>
                <td className="p-4 text-gray-600">{log.resource}</td>
                <td className="p-4 text-gray-600">{log.user}</td>
                <td className="p-4 text-gray-500 flex items-center gap-1"><Clock size={14} />{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
