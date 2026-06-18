
"use client";
import { useState } from "react";
import { Search, Building2, CheckCircle, XCircle, Star } from "lucide-react";

const MOCK_AGENCIES = [
  { id: "1", companyName: "Staffing Co", slug: "staffing-co", verified: true, rating: 4.5, activeJobs: 5, date: "2026-05-01" },
  { id: "2", companyName: "Elite Staffing", slug: "elite-staffing", verified: true, rating: 4.8, activeJobs: 3, date: "2026-05-15" },
  { id: "3", companyName: "Quick Staff", slug: "quick-staff", verified: false, rating: 3.2, activeJobs: 1, date: "2026-06-10" },
];

export default function AdminAgenciesPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_AGENCIES.filter((a) => !search || a.companyName.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Agencies</h1>
      <p className="text-gray-500 mt-1">Manage registered agencies</p>
      <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border">
        <div className="relative"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search agencies..." className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
      </div>
      <div className="mt-6 bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-4 font-medium text-gray-500">Agency</th>
            <th className="text-left p-4 font-medium text-gray-500">Verified</th>
            <th className="text-left p-4 font-medium text-gray-500">Rating</th>
            <th className="text-left p-4 font-medium text-gray-500">Active Jobs</th>
            <th className="text-left p-4 font-medium text-gray-500">Joined</th>
          </tr></thead>
          <tbody className="divide-y">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="p-4"><div className="font-medium text-gray-900">{a.companyName}</div><div className="text-gray-500 text-xs">{a.slug}</div></td>
                <td className="p-4">{a.verified ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-400" />}</td>
                <td className="p-4"><span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" />{a.rating}</span></td>
                <td className="p-4">{a.activeJobs}</td>
                <td className="p-4 text-gray-500">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
