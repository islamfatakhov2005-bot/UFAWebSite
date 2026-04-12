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
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pages);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { title, slug, content, metaDescription, isPublished } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        metaDescription: metaDescription || null,
        isPublished: isPublished ?? true,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
