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

    const statistics = await prisma.statistic.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(statistics);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { value, label, sortOrder, isActive } = body;

    if (!value || !label) {
      return NextResponse.json(
        { error: "Value and label are required" },
        { status: 400 }
      );
    }

    const statistic = await prisma.statistic.create({
      data: {
        value,
        label,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(statistic, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create statistic" }, { status: 500 });
  }
}
