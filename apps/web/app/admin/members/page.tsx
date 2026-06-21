export default function AdminMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Members</h1>
        <div className="flex gap-2">
          <input placeholder="Search members..." className="rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <select className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>All Roles</option>
            <option>Member</option>
            <option>Agency</option>
            <option>Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: "Sarah Johnson", username: "sarah_j", role: "Member", location: "Los Angeles, CA", status: "Active", joined: "Jan 2025" },
              { name: "Mike Chen", username: "mike_c", role: "Member", location: "San Diego, CA", status: "Active", joined: "Feb 2025" },
              { name: "Elite Promotions", username: "elite_promo", role: "Agency", location: "Los Angeles, CA", status: "Active", joined: "Dec 2024" },
              { name: "Jessica Williams", username: "jess_w", role: "Member", location: "Phoenix, AZ", status: "Suspended", joined: "Mar 2025" },
            ].map((m, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-400">@{m.username}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    m.role === "Admin" ? "bg-purple-100 text-purple-600" :
                    m.role === "Agency" ? "bg-blue-100 text-blue-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>{m.role}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{m.location}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    m.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}>{m.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{m.joined}</td>
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
