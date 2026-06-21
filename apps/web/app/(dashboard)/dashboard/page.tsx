import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/lib/supabase";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { MembershipStatusCard } from "@/components/dashboard/MembershipStatusCard";
import { Briefcase, FileWarning, Building2, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("clerk_user_id", userId)
    .single();

  const displayName = profile?.display_name ?? "Member";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Welcome back, {displayName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with your UBA membership
          </p>
        </div>
        <MembershipStatusCard />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Applications"
          value="0"
          subtitle="0 pending review"
          icon={Briefcase}
          color="navy"
        />
        <StatCard
          title="Violations Filed"
          value="0"
          subtitle="0 open cases"
          icon={FileWarning}
          color="red"
        />
        <StatCard
          title="Agencies Rated"
          value="0"
          subtitle="Help the community"
          icon={Building2}
          color="gold"
        />
        <StatCard
          title="Rate Alerts"
          value="0"
          subtitle="New data in your city"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
