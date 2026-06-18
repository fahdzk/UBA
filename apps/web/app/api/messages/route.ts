
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get("ticketId");

  const where: Record<string, unknown> = {
    OR: [{ senderId: user.id }, { recipientId: user.id }],
  };
  if (ticketId) where.ticketId = ticketId;

  const messages = await prisma.message.findMany({
    where,
    include: {
      sender: { select: { firstName: true, lastName: true, avatarUrl: true } },
      recipient: { select: { firstName: true, lastName: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { ticketId, recipientId, content, type } = body;

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const message = await prisma.message.create({
    data: {
      ticketId,
      senderId: user.id,
      recipientId,
      content,
      type: type || "TEXT",
    },
  });

  return NextResponse.json(message);
}
