
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@uba/database";
import { Briefcase, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default async function LawyerDashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  const [activeCases, pendingCases, resolvedCases] = await Promise.all([
    prisma.legalCase.count({ where: { lawyerId: user?.id, status: { notIn: ["CLOSED", "WON", "LOST", "DISMISSED", "SETTLED"] } } }),
    prisma.legalCase.count({ where: { lawyerId: user?.id, status: "INTAKE" } }),
    prisma.legalCase.count({ where: { lawyerId: user?.id, status: { in: ["CLOSED", "WON", "SETTLED"] } } }),
  ]);
  const stats = [
    { label: "Active Cases", value: activeCases, icon: Briefcase, color: "bg-blue-500" },
    { label: "Pending Intake", value: pendingCases, icon: Clock, color: "bg-amber-500" },
    { label: "Resolved", value: resolvedCases, icon: CheckCircle, color: "bg-green-500" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}</h1>
      <p className="text-gray-500 mt-1">Manage your legal cases</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
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
