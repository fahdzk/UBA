
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { AuditService } from "@uba/security";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const where: Record<string, unknown> = { complainantId: user.id };
  if (status) where.status = status;

  const [complaints, total] = await Promise.all([
    prisma.complaint.findMany({
      where,
      include: { respondent: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.complaint.count({ where }),
  ]);

  return NextResponse.json({ complaints, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, category, priority } = body;

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const complaint = await prisma.complaint.create({
    data: {
      complainantId: user.id,
      title,
      description,
      category,
      priority: priority || "MEDIUM",
    },
  });

  await AuditService.log({
    userId: user.id,
    action: "CREATE",
    resource: "complaint",
    resourceId: complaint.id,
  });

  return NextResponse.json(complaint);
}
