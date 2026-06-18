
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@uba/database";
import { Users, MessageSquare, Briefcase, Building2, TrendingUp, AlertTriangle } from "lucide-react";

export default async function AdminDashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const [totalUsers, activeUsers, openComplaints, activeCases, totalAgencies] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.complaint.count({ where: { status: { in: ["OPEN", "UNDER_REVIEW", "INVESTIGATING", "ESCALATED"] } } }),
    prisma.legalCase.count({ where: { status: { notIn: ["CLOSED", "WON", "LOST", "DISMISSED", "SETTLED"] } } }),
    prisma.agencyProfile.count(),
  ]);

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users, color: "bg-blue-500" },
    { label: "Active Users", value: activeUsers, icon: TrendingUp, color: "bg-green-500" },
    { label: "Open Complaints", value: openComplaints, icon: MessageSquare, color: "bg-red-500" },
    { label: "Active Cases", value: activeCases, icon: Briefcase, color: "bg-purple-500" },
    { label: "Agencies", value: totalAgencies, icon: Building2, color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="text-gray-500 mt-1">Platform overview and management</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        {stats.map((stat) => { const Icon = stat.icon; return (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">{stat.label}</p><p className="text-2xl font-bold mt-1">{stat.value}</p></div>
              <div className={`${stat.color} p-3 rounded-lg`}><Icon size={20} className="text-white" /></div>
            </div>
          </div>
        ); })}
      </div>
    </div>
  );
}
