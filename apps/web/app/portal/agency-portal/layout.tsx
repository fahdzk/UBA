
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Building2, Briefcase, FileText, Star, Bell } from "lucide-react";

const navItems = [
  { href: "/portal/agency-portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/agency-portal/profile", label: "Company Profile", icon: Building2 },
  { href: "/portal/agency-portal/jobs", label: "Jobs", icon: Briefcase },
  { href: "/portal/agency-portal/applications", label: "Applications", icon: FileText },
  { href: "/portal/agency-portal/reviews", label: "Reviews", icon: Star },
  { href: "/portal/agency-portal/notifications", label: "Notifications", icon: Bell },
];

export default async function AgencyPortalLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#032B66] text-white shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6"><Link href="/portal/agency-portal/dashboard" className="text-xl font-bold">Agency Portal</Link></div>
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
