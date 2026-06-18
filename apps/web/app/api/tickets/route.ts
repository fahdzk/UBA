
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where: Record<string, unknown> = {
    OR: [{ createdById: user.id }, { assignedToId: user.id }],
  };
  if (status) where.status = status;

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
        assignedTo: { select: { firstName: true, lastName: true } },
        complaint: { select: { id: true, title: true, status: true } },
        messages: { select: { id: true, content: true, type: true, sender: { select: { firstName: true, lastName: true } }, createdAt: true }, orderBy: { createdAt: "desc" }, take: 3 },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.ticket.count({ where }),
  ]);

  return NextResponse.json({ tickets, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { complaintId, subject, description, priority, category } = body;

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const ticketNumber = `TKT-${Date.now().toString(36).toUpperCase()}`;

  const ticket = await prisma.ticket.create({
    data: {
      complaintId,
      createdById: user.id,
      ticketNumber,
      subject,
      description,
      priority: priority || "MEDIUM",
      category,
      slaDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    },
  });

  return NextResponse.json(ticket);
}
