
import Link from "next/link";
import { Briefcase, Clock, CheckCircle, AlertTriangle, FileText } from "lucide-react";

const MOCK_CASES = [
  { id: "1", caseNumber: "CASE-ABC123", title: "Unpaid Wages - Nike Event", baName: "John Smith", status: "INTAKE", date: "2026-06-14" },
  { id: "2", caseNumber: "CASE-DEF456", title: "Contract Violation - Apple Store", baName: "Jane Doe", status: "ACTIVE", date: "2026-06-10" },
  { id: "3", caseNumber: "CASE-GHI789", title: "Harassment Claim - Retail", baName: "Mike Johnson", status: "DISCOVERY", date: "2026-06-01" },
  { id: "4", caseNumber: "CASE-JKL012", title: "Safety Violation - Event", baName: "Sarah Williams", status: "SETTLED", date: "2026-05-20" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  INTAKE: { label: "Intake", color: "bg-gray-100 text-gray-700" },
  ACTIVE: { label: "Active", color: "bg-blue-100 text-blue-700" },
  DISCOVERY: { label: "Discovery", color: "bg-purple-100 text-purple-700" },
  NEGOTIATION: { label: "Negotiation", color: "bg-amber-100 text-amber-700" },
  SETTLED: { label: "Settled", color: "bg-green-100 text-green-700" },
  CLOSED: { label: "Closed", color: "bg-gray-100 text-gray-500" },
  WON: { label: "Won", color: "bg-green-100 text-green-700" },
  LOST: { label: "Lost", color: "bg-red-100 text-red-700" },
};

export default function LawyerCasesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Cases</h1>
      <p className="text-gray-500 mt-1">Manage your legal cases</p>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {MOCK_CASES.map((c) => {
            const config = statusConfig[c.status] || statusConfig.INTAKE;
            return (
              <Link key={c.id} href={`/portal/lawyer-portal/cases/${c.id}`}>
                <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                  <div className={`${config.color} p-2 rounded-lg`}><Briefcase size={18} /></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{c.title}</h3>
                    <p className="text-sm text-gray-500">{c.caseNumber} - {c.baName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>{config.label}</span>
                    <p className="text-xs text-gray-400 mt-1">{c.date}</p>
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
