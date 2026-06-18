
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";
import { assignRole } from "@uba/auth";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { firstName, lastName, phone, role, ...roleData } = body;

  try {
    // Update user basic info
    await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        firstName,
        lastName,
        phone,
        status: "ACTIVE",
      },
      create: {
        clerkId: userId,
        email: roleData.email || "",
        firstName,
        lastName,
        phone,
        status: "ACTIVE",
      },
    });

    // Assign role
    await assignRole(userId, role, "system");

    // Create role-specific profile
    if (role === "BA") {
      await prisma.bAProfile.upsert({
        where: { userId },
        update: {
          city: roleData.city,
          state: roleData.state,
          specialties: roleData.specialties || [],
          yearsExperience: roleData.yearsExperience || 0,
          bio: roleData.bio,
        },
        create: {
          userId,
          city: roleData.city,
          state: roleData.state,
          specialties: roleData.specialties || [],
          yearsExperience: roleData.yearsExperience || 0,
          bio: roleData.bio,
        },
      });
    } else if (role === "AGENCY_ADMIN") {
      await prisma.agencyProfile.upsert({
        where: { userId },
        update: {
          companyName: roleData.companyName,
          slug: roleData.companyName.toLowerCase().replace(/\s+/g, "-"),
          website: roleData.website,
          description: roleData.description,
        },
        create: {
          userId,
          companyName: roleData.companyName,
          slug: roleData.companyName.toLowerCase().replace(/\s+/g, "-"),
          website: roleData.website,
          description: roleData.description,
        },
      });
    } else if (role === "LAWYER") {
      await prisma.lawyerProfile.upsert({
        where: { userId },
        update: {
          barNumber: roleData.barNumber,
          firmName: roleData.firmName,
          specialties: roleData.specialties || [],
          jurisdiction: roleData.jurisdiction || [],
          yearsExperience: roleData.yearsExperience || 0,
        },
        create: {
          userId,
          barNumber: roleData.barNumber,
          firmName: roleData.firmName,
          specialties: roleData.specialties || [],
          jurisdiction: roleData.jurisdiction || [],
          yearsExperience: roleData.yearsExperience || 0,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Onboarding failed" }, { status: 500 });
  }
}
