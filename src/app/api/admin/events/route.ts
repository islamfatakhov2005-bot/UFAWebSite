import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const isPublished = searchParams.get("isPublished");
    const upcoming = searchParams.get("upcoming");

    const where: Record<string, unknown> = {};
    if (isPublished !== null) {
      where.isPublished = isPublished === "true";
    }
    if (upcoming === "true") {
      where.startDate = { gte: new Date() };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const {
      title, slug, description, image, location,
      startDate, endDate, registrationUrl, isPublished,
    } = body;

    if (!title || !slug || !description || !startDate) {
      return NextResponse.json(
        { error: "Title, slug, description, and startDate are required" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        image: image || null,
        location: location || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        registrationUrl: registrationUrl || null,
        isPublished: isPublished ?? false,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
