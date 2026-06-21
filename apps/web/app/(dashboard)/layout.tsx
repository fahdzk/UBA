import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const metadata = sessionClaims?.metadata as Record<string, unknown> | undefined;
  const role = (metadata?.role as string) ?? "member";
  const onboardingComplete = metadata?.onboardingComplete as boolean | undefined;

  if (!onboardingComplete) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar role={role as "member" | "agency" | "admin"} />
      <div className="flex-1 lg:ml-[260px]">
        <Topbar />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
