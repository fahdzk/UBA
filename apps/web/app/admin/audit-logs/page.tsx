export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Audit Logs</h1>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Actor</th>
              <th className="px-4 py-3 text-left">Target</th>
              <th className="px-4 py-3 text-left">IP</th>
              <th className="px-4 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { action: "violation.filed", actor: "sarah_j", target: "Promo Masters", ip: "192.168.1.1", time: "2 hours ago" },
              { action: "user.created", actor: "mike_c", target: "—", ip: "10.0.0.5", time: "5 hours ago" },
              { action: "agency.rated", actor: "jess_w", target: "Elite Promotions", ip: "172.16.0.1", time: "1 day ago" },
              { action: "legal_case.opened", actor: "admin", target: "UBA-2026-00042", ip: "10.0.0.1", time: "1 day ago" },
              { action: "membership.cancelled", actor: "user_123", target: "—", ip: "192.168.0.5", time: "2 days ago" },
            ].map((log, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs text-slate-900">{log.action}</td>
                <td className="px-4 py-3 text-slate-600">{log.actor}</td>
                <td className="px-4 py-3 text-slate-600">{log.target}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.ip}</td>
                <td className="px-4 py-3 text-slate-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
