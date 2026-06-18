
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Users, MessageSquare, Ticket, Briefcase,
  Building2, BarChart3, Newspaper, Settings, FileText, Bell,
} from "lucide-react";

const navItems = [
  { href: "/portal/admin-portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/admin-portal/users", label: "Users", icon: Users },
  { href: "/portal/admin-portal/complaints", label: "Complaints", icon: MessageSquare },
  { href: "/portal/admin-portal/tickets", label: "Tickets", icon: Ticket },
  { href: "/portal/admin-portal/legal-cases", label: "Legal Cases", icon: Briefcase },
  { href: "/portal/admin-portal/agencies", label: "Agencies", icon: Building2 },
  { href: "/portal/admin-portal/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/portal/admin-portal/news", label: "News", icon: Newspaper },
  { href: "/portal/admin-portal/audit-logs", label: "Audit Logs", icon: FileText },
  { href: "/portal/admin-portal/settings", label: "Settings", icon: Settings },
  { href: "/portal/admin-portal/notifications", label: "Notifications", icon: Bell },
];

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#032B66] text-white shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6"><Link href="/portal/admin-portal/dashboard" className="text-xl font-bold">Admin Portal</Link></div>
        <nav className="mt-4">
          {navItems.map((item) => { const Icon = item.icon; return (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-6 py-3 text-sm text-blue-100 hover:bg-white/5 transition-colors">
              <Icon size={18} /> {item.label}
            </Link>
          ); })}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
