import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get("isActive");

    const where: Record<string, unknown> = {};
    if (isActive !== null) {
      where.isActive = isActive === "true";
    }

    const slides = await prisma.slide.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(slides);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { title, subtitle, image, buttonText, buttonUrl, sortOrder, isActive } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image are required" }, { status: 400 });
    }

    const slide = await prisma.slide.create({
      data: {
        title,
        subtitle: subtitle || null,
        image,
        buttonText: buttonText || null,
        buttonUrl: buttonUrl || null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
  }
}
