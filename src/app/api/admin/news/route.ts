import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const isPublished = searchParams.get("isPublished");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (isPublished !== null) {
      where.isPublished = isPublished === "true";
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(news);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { title, slug, excerpt, content, image, isPublished, publishedAt } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        image: image || null,
        isPublished: isPublished ?? false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
