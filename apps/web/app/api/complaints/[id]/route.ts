
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const complaint = await prisma.complaint.findFirst({
    where: {
      id,
      OR: [{ complainantId: userId }, { assignedAdminId: userId }],
    },
    include: {
      complainant: { select: { firstName: true, lastName: true, email: true } },
      respondent: { select: { firstName: true, lastName: true, email: true } },
      tickets: { select: { id: true, ticketNumber: true, status: true } },
      legalCase: { select: { id: true, caseNumber: true, status: true } },
    },
  });

  if (!complaint) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(complaint);
}
