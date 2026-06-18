
"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewJobPage() {
  const [form, setForm] = useState({ title: "", description: "", location: "", city: "", state: "", jobType: "", rate: "", startDate: "", endDate: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); await new Promise((r) => setTimeout(r, 500)); setSubmitting(false); setSuccess(true); };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-xl font-bold text-gray-900">Job Posted!</h2>
        <p className="text-gray-500 mt-2">Your job listing is now live.</p>
        <Link href="/portal/agency-portal/jobs" className="inline-block mt-6 px-6 py-2 bg-[#032B66] text-white rounded-lg">View Jobs</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/portal/agency-portal/jobs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#032B66] mb-6"><ArrowLeft size={16} /> Back to Jobs</Link>
      <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none">
                <option value="">Select type</option><option value="FULL_TIME">Full Time</option><option value="PART_TIME">Part Time</option><option value="CONTRACT">Contract</option><option value="EVENT">Event</option>
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate</label>
              <input type="text" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} placeholder="$25/hr" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
          </div>
        </div>
        <button type="submit" disabled={submitting} className="mt-6 px-6 py-2.5 bg-[#032B66] text-white rounded-lg font-medium hover:bg-[#032B66]/90 disabled:opacity-50">{submitting ? "Posting..." : "Post Job"}</button>
      </form>
    </div>
  );
}
