
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, data } = body;

  if (type === "user.created" || type === "user.updated") {
    const user = await prisma.user.upsert({
      where: { clerkId: data.id },
      update: {
        email: data.email_addresses?.[0]?.email_address || "",
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        avatarUrl: data.image_url || null,
        phone: data.phone_numbers?.[0]?.phone_number || null,
      },
      create: {
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        avatarUrl: data.image_url || null,
        phone: data.phone_numbers?.[0]?.phone_number || null,
        status: "PENDING_VERIFICATION",
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  }

  if (type === "user.deleted") {
    await prisma.user.delete({
      where: { clerkId: data.id },
    }).catch(() => {});
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ ignored: true });
}
