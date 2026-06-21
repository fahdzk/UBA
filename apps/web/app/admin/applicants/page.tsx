"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  applicationType: string;
  status: string;
  travelWillingness: string;
  yearsExperience: string;
  headshotUrl: string;
  starred: boolean;
  submittedAt: string | null;
  createdAt: string;
  gigs: { eventName: string; agencyName: string }[];
}

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SUBMITTED: "bg-blue-100 text-blue-700",
  PENDING_REVIEW: "bg-amber-100 text-amber-700",
  UNDER_REVIEW: "bg-purple-100 text-purple-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  BLACKLISTED: "bg-gray-800 text-gray-100",
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  PENDING_REVIEW: "Pending",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  BLACKLISTED: "Blacklisted",
};

export default function AdminApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [travelFilter, setTravelFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchApplicants = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (typeFilter) params.set("type", typeFilter);
    if (travelFilter) params.set("travel", travelFilter);
    if (search) params.set("search", search);
    params.set("page", String(page));

    try {
      const res = await fetch(`/api/admin/applicants?${params}`);
      const data = await res.json();
      setApplicants(data.applications || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error("Failed to fetch applicants:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [statusFilter, typeFilter, travelFilter, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchApplicants();
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchApplicants();
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const toggleStar = async (id: string, starred: boolean) => {
    try {
      await fetch(`/api/admin/applicants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ starred: !starred }),
      });
      fetchApplicants();
    } catch (e) {
      console.error("Failed to toggle star:", e);
    }
  };

  const pages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">Applicants</h1>
          <p className="text-sm text-slate-500 mt-1">{total} total applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, city..."
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <button type="submit" className="rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-600">
            Search
          </button>
        </form>
        <div className="flex flex-wrap gap-2 mt-3">
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 outline-none">
            <option value="">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 outline-none">
            <option value="">All Types</option>
            <option value="BRAND_AMBASSADOR">Brand Ambassador</option>
            <option value="PRODUCT_SPECIALIST">Product Specialist</option>
          </select>
          <select value={travelFilter} onChange={(e) => { setTravelFilter(e.target.value); setPage(1); }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 outline-none">
            <option value="">All Travel</option>
            <option value="LOCAL_ONLY">Local Only</option>
            <option value="STATEWIDE">Statewide</option>
            <option value="NATIONWIDE">Nationwide</option>
            <option value="INTERNATIONAL">International</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : applicants.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No applicants found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-600 w-8"></th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Applicant</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600 hidden md:table-cell">Location</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600 hidden sm:table-cell">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600 hidden lg:table-cell">Experience</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600 hidden lg:table-cell">Submitted</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStar(a.id, a.starred)} className="text-lg">
                        {a.starred ? "★" : "☆"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {a.headshotUrl ? (
                          <img src={a.headshotUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-500">
                            {a.firstName?.[0]}{a.lastName?.[0]}
                          </div>
                        )}
                        <div>
                          <Link href={`/admin/applicants/${a.id}`} className="font-medium text-slate-900 hover:text-blue-600">
                            {a.firstName} {a.lastName}
                          </Link>
                          <p className="text-xs text-slate-500">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{a.city}, {a.state}</td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">
                      {a.applicationType === "BRAND_AMBASSADOR" ? "BA" : "PS"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{a.yearsExperience}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a.id, e.target.value)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[a.status] || "bg-slate-100 text-slate-600"}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">
                      {a.submittedAt ? new Date(a.submittedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/applicants/${a.id}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
            <p className="text-sm text-slate-500">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30">
                Previous
              </button>
              <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-30">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
