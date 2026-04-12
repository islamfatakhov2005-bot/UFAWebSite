import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get("isActive");
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {};
    if (isActive !== null) {
      where.isActive = isActive === "true";
    }
    if (category) {
      where.category = category;
    }

    const partners = await prisma.partner.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(partners);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { name, logo, website, description, category, sortOrder, isActive } = body;

    if (!name || !logo) {
      return NextResponse.json(
        { error: "Name and logo are required" },
        { status: 400 }
      );
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        logo,
        website: website || null,
        description: description || null,
        category: category || null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}
