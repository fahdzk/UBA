
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, User, Bell } from "lucide-react";

const navItems = [
  { href: "/portal/lawyer-portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/lawyer-portal/cases", label: "Cases", icon: Briefcase },
  { href: "/portal/lawyer-portal/profile", label: "Profile", icon: User },
  { href: "/portal/lawyer-portal/notifications", label: "Notifications", icon: Bell },
];

export default async function LawyerPortalLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#032B66] text-white shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6"><Link href="/portal/lawyer-portal/dashboard" className="text-xl font-bold">Lawyer Portal</Link></div>
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
