
import { Briefcase, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const MOCK_CASES = [
  { id: "1", caseNumber: "CASE-ABC123", title: "Unpaid Wages - Nike Event", lawyer: "Attorney A", ba: "John Smith", status: "INTAKE", date: "2026-06-14" },
  { id: "2", caseNumber: "CASE-DEF456", title: "Contract Violation - Apple", lawyer: "Attorney B", ba: "Jane Doe", status: "ACTIVE", date: "2026-06-10" },
  { id: "3", caseNumber: "CASE-GHI789", title: "Harassment Claim", lawyer: "Attorney A", ba: "Mike Johnson", status: "DISCOVERY", date: "2026-06-01" },
];

const statusColors: Record<string, string> = {
  INTAKE: "bg-gray-100 text-gray-700", ACTIVE: "bg-blue-100 text-blue-700",
  DISCOVERY: "bg-purple-100 text-purple-700", NEGOTIATION: "bg-amber-100 text-amber-700",
  SETTLED: "bg-green-100 text-green-700", CLOSED: "bg-gray-100 text-gray-500",
  WON: "bg-green-100 text-green-700", LOST: "bg-red-100 text-red-700",
};

export default function AdminLegalCasesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Legal Cases</h1>
      <p className="text-gray-500 mt-1">Oversee all legal cases</p>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-4 font-medium text-gray-500">Case</th>
            <th className="text-left p-4 font-medium text-gray-500">Lawyer</th>
            <th className="text-left p-4 font-medium text-gray-500">BA</th>
            <th className="text-left p-4 font-medium text-gray-500">Status</th>
            <th className="text-left p-4 font-medium text-gray-500">Date</th>
          </tr></thead>
          <tbody className="divide-y">
            {MOCK_CASES.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-4"><div className="font-medium text-gray-900">{c.title}</div><div className="text-gray-500 text-xs">{c.caseNumber}</div></td>
                <td className="p-4 text-gray-600">{c.lawyer}</td>
                <td className="p-4 text-gray-600">{c.ba}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span></td>
                <td className="p-4 text-gray-500">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
