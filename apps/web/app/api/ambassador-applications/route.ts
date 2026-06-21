import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { auth } from "@clerk/nextjs/server";

// GET — fetch user's draft or submitted applications
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const applications = await prisma.ambassadorApplication.findMany({
      where: { userId: user.id },
      include: { gigs: { orderBy: { sortOrder: "asc" } } },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("GET /api/ambassador-applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — create or update draft application
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const { id, gigs, ...data } = body;

    // If updating existing
    if (id) {
      const existing = await prisma.ambassadorApplication.findFirst({
        where: { id, userId: user.id },
      });
      if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
      if (existing.status !== "DRAFT") {
        return NextResponse.json({ error: "Cannot edit submitted application" }, { status: 400 });
      }

      const updated = await prisma.ambassadorApplication.update({
        where: { id },
        data: {
          ...data,
          languages: data.languages || [],
          eventTypes: data.eventTypes || [],
          agenciesWorked: data.agenciesWorked || [],
          availableDays: data.availableDays || [],
          availableTimeWindows: data.availableTimeWindows || [],
          updatedAt: new Date(),
        },
        include: { gigs: { orderBy: { sortOrder: "asc" } } },
      });
      return NextResponse.json(updated);
    }

    // Create new draft
    const created = await prisma.ambassadorApplication.create({
      data: {
        ...data,
        userId: user.id,
        status: "DRAFT",
        languages: data.languages || [],
        eventTypes: data.eventTypes || [],
        agenciesWorked: data.agenciesWorked || [],
        availableDays: data.availableDays || [],
        availableTimeWindows: data.availableTimeWindows || [],
      },
      include: { gigs: { orderBy: { sortOrder: "asc" } } },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/ambassador-applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
