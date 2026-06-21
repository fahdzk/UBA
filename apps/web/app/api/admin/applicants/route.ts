import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { auth } from "@clerk/nextjs/server";

// GET — list all ambassador applications (admin only)
export async function GET(req: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const metadata = sessionClaims?.metadata as Record<string, unknown> | undefined;
    const role = metadata?.role as string | undefined;
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const travel = searchParams.get("travel");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (type) where.applicationType = type;
    if (travel) where.travelWillingness = travel;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.ambassadorApplication.findMany({
        where,
        include: { gigs: { orderBy: { sortOrder: "asc" } } },
        orderBy: { submittedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.ambassadorApplication.count({ where }),
    ]);

    return NextResponse.json({ applications, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("GET /api/admin/applicants error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
