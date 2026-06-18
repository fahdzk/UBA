
"use client";
import { useState } from "react";
import { Building2, Globe, Mail, Phone } from "lucide-react";

export default function AgencyProfilePage() {
  const [form, setForm] = useState({ companyName: "", website: "", email: "", phone: "", description: "", city: "", state: "", country: "US" });
  const [saved, setSaved] = useState(false);
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); await new Promise((r) => setTimeout(r, 500)); setSaved(true); setTimeout(() => setSaved(false), 3000); };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
      <p className="text-gray-500 mt-1">Manage your agency information</p>
      <form onSubmit={handleSave} className="mt-8 max-w-3xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-6 flex items-center gap-2"><Building2 size={18} className="text-[#032B66]" /> Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <div className="relative"><Globe size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative"><Mail size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative"><Phone size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
          </div>
          <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" className="px-6 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90">Save Changes</button>
          {saved && <span className="text-green-600 text-sm">Profile saved!</span>}
        </div>
      </form>
    </div>
  );
}
