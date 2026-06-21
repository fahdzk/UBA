"use client";

import { Bell, Search, Menu, Sun, Moon, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

export function Topbar({ onMenuClick, showMobileMenu = false }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3">
        {showMobileMenu && (
          <button
            onClick={onMenuClick}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search jobs, agencies, members..."
            className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0D1B3E] focus:outline-none focus:ring-2 focus:ring-[#0D1B3E]/10"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* User menu */}
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-sm font-semibold text-white">
            U
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700">Username</p>
          </div>
        </div>
      </div>
    </header>
  );
}
