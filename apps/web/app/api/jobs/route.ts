
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const jobType = searchParams.get("jobType") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where: Record<string, unknown> = { status: "OPEN", deletedAt: null };
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (location) where.location = { contains: location, mode: "insensitive" };
  if (jobType) where.jobType = jobType;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        agency: { select: { companyName: true, verified: true, rating: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({ jobs, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const agency = await prisma.agencyProfile.findUnique({ where: { userId: user.id } });
  if (!agency) return NextResponse.json({ error: "No agency profile" }, { status: 403 });

  const job = await prisma.job.create({
    data: {
      agencyId: agency.id,
      title: body.title,
      description: body.description,
      location: body.location,
      city: body.city,
      state: body.state,
      country: body.country || "US",
      jobType: body.jobType,
      rate: body.rate,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      requirements: body.requirements || [],
    },
  });

  return NextResponse.json(job);
}
