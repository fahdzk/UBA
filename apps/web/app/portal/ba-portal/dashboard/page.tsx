
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@uba/database";
import { Briefcase, FileText, MessageSquare, Crown, Bell } from "lucide-react";
import Link from "next/link";

export default async function BADashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { memberships: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  const [applications, complaints, notifications] = await Promise.all([
    prisma.application.count({ where: { userId: user?.id } }),
    prisma.complaint.count({ where: { complainantId: user?.id } }),
    prisma.notification.count({ where: { userId: user?.id, readAt: null } }),
  ]);

  const stats = [
    { label: "Active Applications", value: applications, icon: FileText, color: "bg-blue-500" },
    { label: "Open Complaints", value: complaints, icon: MessageSquare, color: "bg-red-500" },
    { label: "Membership", value: user?.memberships?.[0]?.tier || "None", icon: Crown, color: "bg-purple-500" },
    { label: "Unread Notifications", value: notifications, icon: Bell, color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user?.firstName}
      </h1>
      <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your account</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/portal/ba-portal/jobs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Briefcase size={18} className="text-[#032B66]" />
              <span className="text-sm">Browse Available Jobs</span>
            </Link>
            <Link href="/portal/ba-portal/complaints/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquare size={18} className="text-[#032B66]" />
              <span className="text-sm">File a Complaint</span>
            </Link>
            <Link href="/pricing" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Crown size={18} className="text-[#032B66]" />
              <span className="text-sm">Upgrade Membership</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm text-gray-500">
            <p>No recent activity. Start by browsing jobs or filing a complaint.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
