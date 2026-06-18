
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      agency: { select: { companyName: true, slug: true, verified: true, logoUrl: true, rating: true, phone: true } },
      applications: { select: { id: true, status: true, createdAt: true, user: { select: { firstName: true, lastName: true } } } },
    },
  });

  if (!job || job.deletedAt) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Increment view count
  await prisma.job.update({ where: { id }, data: { views: { increment: 1 } } });

  return NextResponse.json(job);
}
