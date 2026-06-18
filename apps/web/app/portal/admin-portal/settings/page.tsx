
"use client";
import { useState } from "react";
import { Settings, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const handleSave = async (e: React.FormEvent) => { e.preventDefault(); await new Promise((r) => setTimeout(r, 500)); setSaved(true); setTimeout(() => setSaved(false), 3000); };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-500 mt-1">Platform configuration</p>
      <form onSubmit={handleSave} className="mt-8 max-w-3xl space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Settings size={18} className="text-[#032B66]" /> General</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
              <input type="text" defaultValue="UBA" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@uba.com" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#032B66]/20 focus:border-[#032B66] outline-none" /></div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="maintenance" className="rounded" />
              <label htmlFor="maintenance" className="text-sm text-gray-700">Maintenance Mode</label>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold mb-4">Features</h2>
          <div className="space-y-3">
            {["Enable Job Board", "Enable Complaints System", "Enable Legal Cases", "Enable Reviews"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" id={feature} />
                <label htmlFor={feature} className="text-sm text-gray-700">{feature}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="px-6 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90 flex items-center gap-2"><Save size={16} /> Save Settings</button>
          {saved && <span className="text-green-600 text-sm">Settings saved!</span>}
        </div>
      </form>
    </div>
  );
}
