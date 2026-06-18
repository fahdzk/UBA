
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const roles = await prisma.userRole.findMany({
    where: { userId: user.id },
    include: { role: true },
  });
  const roleNames = roles.map((r) => r.role.name);

  const where: Record<string, unknown> = {};
  if (roleNames.includes("LAWYER") && !roleNames.includes("ADMIN") && !roleNames.includes("SUPER_ADMIN")) {
    where.lawyerId = user.id;
  } else if (roleNames.includes("BA")) {
    where.baId = user.id;
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  if (status) where.status = status;

  const cases = await prisma.legalCase.findMany({
    where,
    include: {
      ba: { select: { firstName: true, lastName: true } },
      lawyer: { select: { firstName: true, lastName: true } },
      complaint: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cases);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { complaintId, title, description } = body;

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const caseNumber = `CASE-${Date.now().toString(36).toUpperCase()}`;

  const legalCase = await prisma.legalCase.create({
    data: {
      complaintId,
      baId: user.id,
      caseNumber,
      title,
      description,
      status: "INTAKE",
    },
  });

  return NextResponse.json(legalCase);
}
