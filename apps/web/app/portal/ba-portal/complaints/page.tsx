
import Link from "next/link";
import { Plus, MessageSquare, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const MOCK_COMPLAINTS = [
  { id: "1", title: "Unpaid wages for event work", category: "Payment Issues", status: "OPEN", date: "2026-06-14" },
  { id: "2", title: "Misleading job description", category: "Misconduct", status: "UNDER_REVIEW", date: "2026-06-10" },
  { id: "3", title: "Unsafe working conditions", category: "Safety", status: "RESOLVED", date: "2026-06-01" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "bg-yellow-100 text-yellow-700" },
  UNDER_REVIEW: { label: "Under Review", color: "bg-blue-100 text-blue-700" },
  INVESTIGATING: { label: "Investigating", color: "bg-purple-100 text-purple-700" },
  RESOLVED: { label: "Resolved", color: "bg-green-100 text-green-700" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
  ESCALATED: { label: "Escalated", color: "bg-orange-100 text-orange-700" },
};

export default function BAComplaintsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
          <p className="text-gray-500 mt-1">File and track your complaints</p>
        </div>
        <Link
          href="/portal/ba-portal/complaints/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90"
        >
          <Plus size={16} />
          File Complaint
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {MOCK_COMPLAINTS.map((complaint) => {
            const config = statusConfig[complaint.status] || statusConfig.OPEN;
            return (
              <Link key={complaint.id} href={`/portal/ba-portal/complaints/${complaint.id}`}>
                <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                  <div className={`${config.color} p-2 rounded-lg`}>
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{complaint.title}</h3>
                    <p className="text-sm text-gray-500">{complaint.category}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{complaint.date}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
