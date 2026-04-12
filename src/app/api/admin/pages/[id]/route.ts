import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const pageId = parseInt(id, 10);
    if (isNaN(pageId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const page = await prisma.page.update({
      where: { id: pageId },
      data: body,
    });

    return NextResponse.json(page);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const pageId = parseInt(id, 10);
    if (isNaN(pageId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.page.delete({ where: { id: pageId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
