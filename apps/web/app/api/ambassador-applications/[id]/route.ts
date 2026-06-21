import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { auth } from "@clerk/nextjs/server";

// GET single application
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
      include: { gigs: { orderBy: { sortOrder: "asc" } } },
    });

    if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(application);
  } catch (error) {
    console.error("GET /api/ambassador-applications/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH — update application (draft only) or submit
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { id } = await params;
    const existing = await prisma.ambassadorApplication.findFirst({
      where: { id, userId: user.id },
    });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const { action, gigs, ...data } = body;

    // Handle submission
    if (action === "submit") {
      // Validate required fields
      const required = ["firstName", "lastName", "email", "phone", "city", "state", "country", "dateOfBirth", "gender", "applicationType", "heightFeet", "heightInches", "weight", "shirtSize", "pantSize", "shoeSize", "howHeard", "yearsExperience", "experienceDescription", "travelWillingness", "headshotUrl", "fullBodyUrl"];
      const missing = required.filter((f) => !existing[f] && !data[f]);
      if (missing.length > 0) {
        return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
      }

      // Check gigs count
      const gigCount = await prisma.applicationGig.count({ where: { applicationId: id } });
      if (gigCount < 3) {
        return NextResponse.json({ error: "At least 3 gig entries required" }, { status: 400 });
      }

      // Check legal agreements
      if (!data.certifyAccuracy || !data.consentDataStorage || !data.understandFalseInfo || !data.consentPhotoUse) {
        return NextResponse.json({ error: "All legal agreements must be accepted" }, { status: 400 });
      }

      const submitted = await prisma.ambassadorApplication.update({
        where: { id },
        data: {
          ...data,
          status: "SUBMITTED",
          submittedAt: new Date(),
          languages: data.languages || [],
          eventTypes: data.eventTypes || [],
          agenciesWorked: data.agenciesWorked || [],
          availableDays: data.availableDays || [],
          availableTimeWindows: data.availableTimeWindows || [],
        },
        include: { gigs: { orderBy: { sortOrder: "asc" } } },
      });
      return NextResponse.json(submitted);
    }

    // Regular draft update
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
  } catch (error) {
    console.error("PATCH /api/ambassador-applications/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
