import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserRoles } from "@uba/auth";
import { getPortalHome } from "@uba/security";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const roles = await getUserRoles(userId);

  if (!roles || roles.length === 0) {
    redirect("/onboarding");
  }

  const portalHome = getPortalHome(roles);
  redirect(portalHome);
}
