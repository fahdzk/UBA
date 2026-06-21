// apps/web — Admin setup API
// Call this once to create an admin user via Clerk Backend API
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@uba/database";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, firstName, lastName, setupKey } = body;

  // Simple protection — only allow with a setup key
  if (setupKey !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Create user in Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.createUser({
      emailAddress: [email],
      firstName: firstName || "Admin",
      lastName: lastName || "User",
      publicMetadata: {
        role: "admin",
        onboardingComplete: true,
      },
      skipPasswordRequirement: false,
    });

    // Sync to local DB
    await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email,
        firstName: firstName || "Admin",
        lastName: lastName || "User",
        status: "ACTIVE",
      },
      create: {
        clerkId: user.id,
        email,
        firstName: firstName || "Admin",
        lastName: lastName || "User",
        status: "ACTIVE",
      },
    });

    // Assign admin role
    const role = await prisma.role.findFirst({ where: { name: "ADMIN" } });
    if (role) {
      const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
      if (dbUser) {
        await prisma.userRole.upsert({
          where: { userId_roleId: { userId: dbUser.id, roleId: role.id } },
          update: {},
          create: { userId: dbUser.id, roleId: role.id },
        });
      }
    }

    return NextResponse.json({
      success: true,
      userId: user.id,
      message: `Admin user ${email} created. Check email for password setup.`,
    });
  } catch (error: unknown) {
    const err = error as { errors?: { message: string }[]; message?: string };
    const message = err.errors?.[0]?.message || err.message || "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
