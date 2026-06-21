"use client";

import { Bell, Briefcase, FileWarning, Scale, UserPlus, Settings, Search } from "lucide-react";
import Link from "next/link";

const actions = [
  { label: "Find Jobs", href: "/jobs", icon: Search, color: "bg-navy-600 hover:bg-navy-700" },
  { label: "Rate an Agency", href: "/agencies", icon: Briefcase, color: "bg-amber-500 hover:bg-amber-600" },
  { label: "File Violation", href: "/violations/new", icon: FileWarning, color: "bg-brand-red hover:bg-red-700" },
  { label: "Legal Intake", href: "/legal/intake", icon: Scale, color: "bg-emerald-600 hover:bg-emerald-700" },
  { label: "Update Profile", href: "/profile/edit", icon: Settings, color: "bg-slate-600 hover:bg-slate-700" },
  { label: "Invite a BA", href: "/invite", icon: UserPlus, color: "bg-purple-600 hover:bg-purple-700" },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-slate-900">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition-colors ${action.color}`}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
