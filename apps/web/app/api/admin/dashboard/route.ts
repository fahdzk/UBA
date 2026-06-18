
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { roles: { include: { role: true } } },
  });

  const isAdmin = currentUser?.roles.some(
    (r: { role: { name: string } }) => r.role.name === "ADMIN" || r.role.name === "SUPER_ADMIN"
  );
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [
    totalUsers,
    activeUsers,
    totalComplaints,
    openComplaints,
    totalCases,
    activeCases,
    totalApplications,
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.complaint.count(),
    prisma.complaint.count({ where: { status: { in: ["OPEN", "UNDER_REVIEW", "INVESTIGATING", "ESCALATED"] } } }),
    prisma.legalCase.count(),
    prisma.legalCase.count({ where: { status: { notIn: ["CLOSED", "WON", "LOST", "DISMISSED", "SETTLED"] } } }),
    prisma.application.count(),
    prisma.payment.findMany({
      where: { status: "SUCCEEDED" },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { user: { select: { firstName: true, lastName: true } } },
    }),
  ]);

  return NextResponse.json({
    stats: { totalUsers, activeUsers, totalComplaints, openComplaints, totalCases, activeCases, totalApplications },
    recentPayments,
  });
}
