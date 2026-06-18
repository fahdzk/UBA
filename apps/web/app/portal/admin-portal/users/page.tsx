
"use client";
import { useState } from "react";
import { Search, UserPlus, MoreVertical, Shield, ShieldCheck } from "lucide-react";

const MOCK_USERS = [
  { id: "1", name: "John Smith", email: "john@example.com", role: "BA", status: "ACTIVE", joined: "2026-06-01" },
  { id: "2", name: "Jane Doe", email: "jane@agency.com", role: "AGENCY_ADMIN", status: "ACTIVE", joined: "2026-05-15" },
  { id: "3", name: "Mike Johnson", email: "mike@law.com", role: "LAWYER", status: "ACTIVE", joined: "2026-05-20" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com", role: "BA", status: "SUSPENDED", joined: "2026-06-10" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const filtered = MOCK_USERS.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Users</h1><p className="text-gray-500 mt-1">Manage platform users</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90"><UserPlus size={16} /> Add User</button>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-6 flex gap-4">
        <div className="flex-1 relative"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none">
          <option value="">All Roles</option><option value="BA">BA</option><option value="AGENCY_ADMIN">Agency</option><option value="LAWYER">Lawyer</option><option value="ADMIN">Admin</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-4 font-medium text-gray-500">User</th>
            <th className="text-left p-4 font-medium text-gray-500">Role</th>
            <th className="text-left p-4 font-medium text-gray-500">Status</th>
            <th className="text-left p-4 font-medium text-gray-500">Joined</th>
            <th className="text-left p-4 font-medium text-gray-500">Actions</th>
          </tr></thead>
          <tbody className="divide-y">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4"><div className="font-medium text-gray-900">{user.name}</div><div className="text-gray-500 text-xs">{user.email}</div></td>
                <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{user.role}</span></td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full ${user.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.status}</span></td>
                <td className="p-4 text-gray-500">{user.joined}</td>
                <td className="p-4"><button className="p-1 hover:bg-gray-100 rounded"><MoreVertical size={16} className="text-gray-400" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
