export default function AdminLegalCasesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Legal Cases</h1>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Case #</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Agency</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Attorney</th>
              <th className="px-4 py-3 text-left">Opened</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { caseNum: "UBA-2026-00042", type: "Wage Theft", agency: "Promo Masters", status: "In Progress", attorney: "Sarah Kim, Esq.", opened: "Jun 15" },
              { caseNum: "UBA-2026-00041", type: "HNA", agency: "BrandForce Agency", status: "Attorney Matched", attorney: "David Park, Esq.", opened: "Jun 12" },
              { caseNum: "UBA-2026-00040", type: "Retaliation", agency: "Quick Staff", status: "Intake", attorney: "—", opened: "Jun 10" },
              { caseNum: "UBA-2026-00039", type: "Wage Theft", agency: "Street Team Pro", status: "Resolved", attorney: "Maria Lopez, Esq.", opened: "May 28" },
            ].map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs font-medium text-navy-600">{c.caseNum}</td>
                <td className="px-4 py-3 text-slate-900">{c.type}</td>
                <td className="px-4 py-3 text-slate-600">{c.agency}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    c.status === "Resolved" ? "bg-green-100 text-green-600" :
                    c.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                    c.status === "Attorney Matched" ? "bg-purple-100 text-purple-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{c.attorney}</td>
                <td className="px-4 py-3 text-slate-500">{c.opened}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-navy-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
