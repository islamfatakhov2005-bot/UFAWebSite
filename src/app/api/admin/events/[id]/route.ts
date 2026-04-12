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
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    if (body.startDate) {
      body.startDate = new Date(body.startDate);
    }
    if (body.endDate) {
      body.endDate = new Date(body.endDate);
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: body,
    });

    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.event.delete({ where: { id: eventId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
