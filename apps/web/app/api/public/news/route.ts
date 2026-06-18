
import { NextResponse } from "next/server";
import { prisma } from "@uba/database";

export async function GET() {
  const posts = await prisma.newsPost.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      publishedAt: true,
      author: { select: { firstName: true, lastName: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 10,
  });

  return NextResponse.json(posts);
}
