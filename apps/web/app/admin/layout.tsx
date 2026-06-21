export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-navy-700 lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-white/10">
            <span className="font-heading text-xs font-bold text-white">UBA</span>
          </div>
          <span className="font-heading text-sm font-bold text-white">Admin</span>
        </div>
        <nav className="p-3 space-y-1">
          {[
            { href: "/admin/dashboard", label: "Dashboard" },
            { href: "/admin/members", label: "Members" },
            { href: "/admin/agencies", label: "Agencies" },
            { href: "/admin/violations", label: "Violations" },
            { href: "/admin/legal-cases", label: "Legal Cases" },
            { href: "/admin/notifications", label: "Notifications" },
            { href: "/admin/audit-logs", label: "Audit Logs" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
