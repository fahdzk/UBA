"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  FileWarning,
  Scale,
  Users,
  Building2,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";

const memberNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Agencies", href: "/agencies", icon: Building2 },
  { label: "Violations", href: "/violations", icon: FileWarning },
  { label: "Legal", href: "/legal", icon: Scale },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

const agencyNav = [
  { label: "Dashboard", href: "/agency/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/agency/jobs", icon: Briefcase },
  { label: "Applicants", href: "/agency/applicants", icon: Users },
  { label: "Ratings", href: "/agency/ratings", icon: FileWarning },
  { label: "Settings", href: "/agency/settings", icon: Settings },
];

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Applicants", href: "/admin/applicants", icon: ClipboardList },
  { label: "Agencies", href: "/admin/agencies", icon: Building2 },
  { label: "Violations", href: "/admin/violations", icon: FileWarning },
  { label: "Legal Cases", href: "/admin/legal-cases", icon: Scale },
];

interface SidebarProps {
  role?: "member" | "agency" | "admin";
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ role = "member", collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === "admin" ? adminNav : role === "agency" ? agencyNav : memberNav;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-[#0D1B3E] transition-all duration-200",
        collapsed ? "w-16" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red font-bold text-white">
              U
            </div>
            <span className="font-heading text-lg font-bold text-white">UBA</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="rounded-md p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-2 border-brand-gold bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-white/10 p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              U
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">User</p>
              <p className="truncate text-xs text-white/50">{role}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
