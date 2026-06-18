
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@uba/database";
import { Briefcase, FileText, Star, Users } from "lucide-react";
import Link from "next/link";

export default async function AgencyDashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  const agency = await prisma.agencyProfile.findFirst({ where: { userId: user?.id } });
  const [activeJobs, totalApplications, reviewCount] = await Promise.all([
    prisma.job.count({ where: { agencyId: agency?.id, status: "OPEN" } }),
    prisma.application.count({ where: { job: { agencyId: agency?.id } } }),
    prisma.review.count({ where: { agencyId: agency?.id } }),
  ]);
  const stats = [
    { label: "Active Jobs", value: activeJobs, icon: Briefcase, color: "bg-blue-500" },
    { label: "Total Applications", value: totalApplications, icon: FileText, color: "bg-green-500" },
    { label: "Reviews", value: reviewCount, icon: Star, color: "bg-amber-500" },
    { label: "Company Rating", value: agency?.rating?.toFixed(1) || "N/A", icon: Users, color: "bg-purple-500" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{agency?.companyName || "Agency Dashboard"}</h1>
      <p className="text-gray-500 mt-1">Manage your jobs and review applications</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => { const Icon = stat.icon; return (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">{stat.label}</p><p className="text-2xl font-bold mt-1">{stat.value}</p></div>
              <div className={`${stat.color} p-3 rounded-lg`}><Icon size={20} className="text-white" /></div>
            </div>
          </div>
        ); })}
      </div>
      <div className="mt-8">
        <Link href="/portal/agency-portal/jobs/new" className="inline-flex items-center gap-2 px-4 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90">
          <Briefcase size={16} /> Post New Job
        </Link>
      </div>
    </div>
  );
}
