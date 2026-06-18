
import { ProtectedRoute } from "./components/protected-route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  MessageSquare,
  Crown,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/portal/ba-portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/ba-portal/profile", label: "Profile", icon: User },
  { href: "/portal/ba-portal/jobs", label: "Job Board", icon: Briefcase },
  { href: "/portal/ba-portal/applications", label: "Applications", icon: FileText },
  { href: "/portal/ba-portal/complaints", label: "Complaints", icon: MessageSquare },
  { href: "/portal/ba-portal/membership", label: "Membership", icon: Crown },
  { href: "/portal/ba-portal/notifications", label: "Notifications", icon: Bell },
];

export default function BAPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["BA", "ADMIN", "SUPER_ADMIN"]}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#032B66] text-white rounded-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#032B66] text-white transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-6">
            <Link href="/portal/ba-portal/dashboard" className="text-xl font-bold">
              BA Portal
            </Link>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                    active
                      ? "bg-white/10 border-r-4 border-[#F21B23]"
                      : "text-blue-100 hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
