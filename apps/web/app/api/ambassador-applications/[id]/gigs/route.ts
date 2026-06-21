import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { auth } from "@clerk/nextjs/server";

// GET gigs for an application
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { id } = await params;
    const application = await prisma.ambassadorApplication.findFirst({
      where: { id, userId: user.id },
    });
    if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const gigs = await prisma.applicationGig.findMany({
      where: { applicationId: id },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ gigs });
  } catch (error) {
    console.error("GET gigs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — add or update gigs (replace all)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { id } = await params;
    const application = await prisma.ambassadorApplication.findFirst({
      where: { id, userId: user.id },
    });
    if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (application.status !== "DRAFT") {
      return NextResponse.json({ error: "Cannot edit submitted application" }, { status: 400 });
    }

    const body = await req.json();
    const { gigs } = body;

    if (!Array.isArray(gigs)) {
      return NextResponse.json({ error: "gigs must be an array" }, { status: 400 });
    }

    // Delete existing gigs and recreate
    await prisma.applicationGig.deleteMany({ where: { applicationId: id } });
    await prisma.applicationGig.createMany({
      data: gigs.map((gig: Record<string, unknown>, index: number) => ({
        applicationId: id,
        event_name: gig.eventName as string,
        agencyName: gig.agencyName as string,
        clientBrand: gig.clientBrand as string,
        location: gig.location as string,
        dateWorked: gig.dateWorked as string,
        role: gig.role as string,
        ratePaid: gig.ratePaid as string | null,
        description: gig.description as string | null,
        sortOrder: index,
      })),
    });

    const updatedGigs = await prisma.applicationGig.findMany({
      where: { applicationId: id },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ gigs: updatedGigs });
  } catch (error) {
    console.error("POST gigs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
