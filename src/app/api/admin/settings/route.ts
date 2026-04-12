import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { settings } = body as {
      settings: Array<{ key: string; value: string; description?: string }>;
    };

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: "Settings array is required" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      settings.map((setting) =>
        prisma.siteSetting.upsert({
          where: { key: setting.key },
          update: {
            value: setting.value,
            description: setting.description ?? undefined,
          },
          create: {
            key: setting.key,
            value: setting.value,
            description: setting.description || null,
          },
        })
      )
    );

    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
