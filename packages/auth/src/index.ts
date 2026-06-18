// @uba/auth — Clerk authentication helpers
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@uba/database";
import { RoleName } from "@prisma/client";

/**
 * Sync a Clerk user to the database.
 * Called after sign-up and on sign-in to ensure user exists in our DB.
 */
export async function syncUserToDatabase(clerkUserId: string) {
  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(clerkUserId);

  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress;
  if (!email) return null;

  const user = await prisma.user.upsert({
    where: { clerkId: clerkUserId },
    update: {
      email,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      imageUrl: clerkUser.imageUrl || undefined,
      lastLoginAt: new Date(),
    },
    create: {
      id: `usr_${clerkUserId.slice(0, 12)}`,
      clerkId: clerkUserId,
      email,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      imageUrl: clerkUser.imageUrl || undefined,
      status: "PENDING_VERIFICATION",
      lastLoginAt: new Date(),
    },
  });

  // Assign BA role by default if no roles exist
  const existingRoles = await prisma.userRole.findMany({ where: { userId: user.id } });
  if (existingRoles.length === 0) {
    const baRole = await prisma.role.findUnique({ where: { name: RoleName.BA } });
    if (baRole) {
      await prisma.userRole.create({ data: { userId: user.id, roleId: baRole.id } });
    }
  }

  return user;
}

/**
 * Get the current user's roles from the database.
 */
export async function getUserRoles(clerkUserId: string): Promise<RoleName[]> {
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
    include: { roles: { include: { role: true } } },
  });

  if (!user) return [RoleName.GUEST];
  return user.roles.map((ur) => ur.role.name);
}

/**
 * Get the authenticated user's full profile from DB.
 */
export async function getUserProfile(clerkUserId: string) {
  return prisma.user.findUnique({
    where: { clerkId: clerkUserId },
    include: {
      roles: { include: { role: true } },
      baProfile: true,
      agencyProfile: true,
      lawyerProfile: true,
      membership: { include: { subscription: true } },
    },
  });
}

/**
 * Assign a role to a user in the database.
 */
export async function assignRole(clerkUserId: string, roleName: string, _source?: string) {
  const user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
  if (!user) return;

  const role = await prisma.role.findUnique({ where: { name: roleName as any } });
  if (!role) return;

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: role.id } },
    update: {},
    create: { userId: user.id, roleId: role.id },
  });
}
