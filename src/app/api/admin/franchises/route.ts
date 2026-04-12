import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get("isActive");
    const isFeatured = searchParams.get("isFeatured");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (isActive !== null) {
      where.isActive = isActive === "true";
    }
    if (isFeatured !== null) {
      where.isFeatured = isFeatured === "true";
    }
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const franchises = await prisma.franchise.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(franchises);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch franchises" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const {
      name, slug, logo, category, description, headquarters,
      startupCost, totalInvestment, franchisingSince, website,
      contactEmail, contactPhone, veteransDiscount, discountDetails,
      isFeatured, isActive, sortOrder,
    } = body;

    if (!name || !slug || !category) {
      return NextResponse.json(
        { error: "Name, slug, and category are required" },
        { status: 400 }
      );
    }

    const franchise = await prisma.franchise.create({
      data: {
        name,
        slug,
        logo: logo || null,
        category,
        description: description || null,
        headquarters: headquarters || null,
        startupCost: startupCost || null,
        totalInvestment: totalInvestment || null,
        franchisingSince: franchisingSince || null,
        website: website || null,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        veteransDiscount: veteransDiscount ?? false,
        discountDetails: discountDetails || null,
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(franchise, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create franchise" }, { status: 500 });
  }
}
