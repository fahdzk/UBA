
"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "Payment Issues", "Harassment", "Contract Violation",
  "Unsafe Working Conditions", "Misconduct", "Discrimination", "Other",
];

const PRIORITIES = [
  { value: "LOW", label: "Low", color: "bg-gray-200 text-gray-700" },
  { value: "MEDIUM", label: "Medium", color: "bg-blue-100 text-blue-700" },
  { value: "HIGH", label: "High", color: "bg-orange-100 text-orange-700" },
  { value: "CRITICAL", label: "Critical", color: "bg-red-100 text-red-700" },
];

export default function NewComplaintPage() {
  const [form, setForm] = useState({ title: "", category: "", priority: "MEDIUM", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Complaint Submitted</h2>
        <p className="text-gray-500 mt-2">We have received your complaint and will review it within 48 hours.</p>
        <Link href="/portal/ba-portal/complaints" className="inline-block mt-6 px-6 py-2 bg-[#032B66] text-white rounded-lg">
          View Complaints
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/portal/ba-portal/complaints" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#032B66] mb-6">
        <ArrowLeft size={16} />
        Back to Complaints
      </Link>
      <h1 className="text-2xl font-bold text-gray-900">File a Complaint</h1>
      <p className="text-gray-500 mt-1">Tell us about the issue you are experiencing</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
              placeholder="Brief summary of the issue" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none">
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <div className="flex gap-2">
                {PRIORITIES.map((p) => (
                  <button key={p.value} type="button" onClick={() => setForm({ ...form, priority: p.value })}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${form.priority === p.value ? p.color + " ring-2 ring-[#032B66]" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none"
              placeholder="Provide detailed information about your complaint..." />
          </div>
        </div>
        <button type="submit" disabled={submitting}
          className="mt-6 px-6 py-2.5 bg-[#032B66] text-white rounded-lg font-medium hover:bg-[#032B66]/90 disabled:opacity-50">
          {submitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
