
"use client";
import { useState } from "react";
import { User, Award, MapPin, Phone } from "lucide-react";

export default function LawyerProfilePage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", barNumber: "", firmName: "", specialties: "", jurisdiction: "", yearsExperience: "", bio: "" });
  const [saved, setSaved] = useState(false);
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); await new Promise((r) => setTimeout(r, 500)); setSaved(true); setTimeout(() => setSaved(false), 3000); };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <p className="text-gray-500 mt-1">Manage your lawyer profile</p>
      <form onSubmit={handleSave} className="mt-8 max-w-3xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-6 flex items-center gap-2"><User size={18} className="text-[#032B66]" /> Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Bar Number</label>
              <div className="relative"><Award size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="text" value={form.barNumber} onChange={(e) => setForm({ ...form, barNumber: e.target.value })} className="w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Firm Name</label>
              <input type="text" value={form.firmName} onChange={(e) => setForm({ ...form, firmName: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction (comma-separated)</label>
              <input type="text" value={form.jurisdiction} onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
              <input type="number" value={form.yearsExperience} onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
          </div>
          <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma-separated)</label>
            <input type="text" value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" placeholder="e.g., Employment Law, Contract Disputes" /></div>
          <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" className="px-6 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90">Save Changes</button>
          {saved && <span className="text-green-600 text-sm">Profile saved!</span>}
        </div>
      </form>
    </div>
  );
}
