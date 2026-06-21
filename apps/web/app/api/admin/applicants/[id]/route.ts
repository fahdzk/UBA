import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { auth } from "@clerk/nextjs/server";

// GET single applicant (admin)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const metadata = sessionClaims?.metadata as Record<string, unknown> | undefined;
    const role = metadata?.role as string | undefined;
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
    }

    const { id } = await params;
    const application = await prisma.ambassadorApplication.findUnique({
      where: { id },
      include: {
        gigs: { orderBy: { sortOrder: "asc" } },
        user: { select: { email: true, firstName: true, lastName: true } },
      },
    });

    if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(application);
  } catch (error) {
    console.error("GET admin applicant error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH — update status, notes, starred, tags (admin)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const metadata = sessionClaims?.metadata as Record<string, unknown> | undefined;
    const role = metadata?.role as string | undefined;
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, adminNotes, starred, tags } = body;

    // Map admin status changes
    let data: Record<string, unknown> = {};
    if (status) {
      data.status = status;
      if (status === "SUBMITTED" || status === "PENDING_REVIEW" || status === "UNDER_REVIEW") {
        data.submittedAt = new Date();
      }
    }
    if (adminNotes !== undefined) data.adminNotes = adminNotes;
    if (starred !== undefined) data.starred = starred;
    if (tags !== undefined) data.tags = tags;

    const updated = await prisma.ambassadorApplication.update({
      where: { id },
      data,
      include: { gigs: { orderBy: { sortOrder: "asc" } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH admin applicant error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
