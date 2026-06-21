export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Members", value: "12,847", sub: "+142 this week", color: "text-navy-600" },
          { label: "Active Agencies", value: "2,431", sub: "+18 this month", color: "text-blue-600" },
          { label: "Open Violations", value: "47", sub: "12 escalated", color: "text-brand-red" },
          { label: "Legal Cases", value: "23", sub: "8 new this month", color: "text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</p>
            <p className={`mt-2 font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs text-slate-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Recent Violations</h2>
          <div className="mt-4 space-y-3">
            {[
              { type: "Wage Theft", agency: "Promo Masters", level: "Level 2", status: "Investigating", time: "2h ago" },
              { type: "HNA Violation", agency: "BrandForce Agency", level: "Level 1", status: "Open", time: "5h ago" },
              { type: "Late Payment", agency: "Apex Event Staff", level: "Level 1", status: "Resolved", time: "1d ago" },
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                <div>
                  <p className="font-medium text-slate-900">{v.type}</p>
                  <p className="text-xs text-slate-500">{v.agency}</p>
                </div>
                <div className="text-right">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.status === "Open" ? "bg-red-100 text-red-600" :
                    v.status === "Investigating" ? "bg-amber-100 text-amber-600" :
                    "bg-green-100 text-green-600"
                  }`}>{v.status}</span>
                  <p className="mt-0.5 text-xs text-slate-400">{v.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Agencies Flagged</h2>
          <div className="mt-4 space-y-3">
            {[
              { name: "Street Team Pro", score: 45, violations: 12, tier: "Orange" },
              { name: "Quick Staff", score: 38, violations: 8, tier: "Orange" },
              { name: "Promo Masters", score: 61, violations: 5, tier: "Silver" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                <div>
                  <p className="font-medium text-slate-900">{a.name}</p>
                  <p className="text-xs text-slate-500">{a.violations} violations</p>
                </div>
                <div className="text-right">
                  <span className="font-heading text-lg font-bold text-amber-600">{a.score}</span>
                  <p className="text-xs text-slate-400">{a.tier}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
