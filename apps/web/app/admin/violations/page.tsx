export default function AdminViolationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Violations</h1>
        <div className="flex gap-2">
          <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Resolved</option>
            <option>Escalated</option>
          </select>
          <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>All Levels</option>
            <option>Level 1</option>
            <option>Level 2</option>
            <option>Level 3</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Agency</th>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Filed</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { type: "Wage Theft", agency: "Promo Masters", level: "Level 2", status: "Investigating", filed: "2 days ago" },
              { type: "HNA Violation", agency: "BrandForce Agency", level: "Level 1", status: "Open", filed: "5 days ago" },
              { type: "Late Payment", agency: "Apex Event Staff", level: "Level 1", status: "Resolved", filed: "2 weeks ago" },
              { type: "Retaliation", agency: "Quick Staff", level: "Level 3", status: "Escalated", filed: "3 days ago" },
            ].map((v, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{v.type}</td>
                <td className="px-4 py-3 text-slate-600">{v.agency}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.level === "Level 3" ? "bg-red-100 text-red-600" :
                    v.level === "Level 2" ? "bg-amber-100 text-amber-600" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{v.level}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.status === "Open" ? "bg-red-100 text-red-600" :
                    v.status === "Investigating" ? "bg-amber-100 text-amber-600" :
                    v.status === "Escalated" ? "bg-purple-100 text-purple-600" :
                    "bg-green-100 text-green-600"
                  }`}>{v.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{v.filed}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs text-navy-600 hover:underline">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
