import { NextRequest, NextResponse } from "next/server";
import { sendLeadToCrm } from "@/lib/crm";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 submissions per hour per IP
    const ip = getClientIp(request.headers);
    const rl = rateLimit(`leads:${ip}`, 10, 60 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Слишком много заявок. Попробуйте позже." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, subject, message, formType } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Имя, email и сообщение обязательны" },
        { status: 400 }
      );
    }

    // Type validation
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Неверный формат данных" },
        { status: 400 }
      );
    }

    // Length limits
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: "Превышена максимальная длина поля" },
        { status: 400 }
      );
    }

    if ((phone && String(phone).length > 30) || (company && String(company).length > 200) || (subject && String(subject).length > 200)) {
      return NextResponse.json(
        { error: "Превышена максимальная длина поля" },
        { status: 400 }
      );
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Неверный формат email" },
        { status: 400 }
      );
    }

    const leadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : "",
      company: company ? String(company).trim() : "",
      subject: subject ? String(subject).trim() : "",
      message: message.trim(),
      formType: formType ? String(formType).trim() : "contact",
    };

    // Persist to database
    let sentToCrm = false;
    try {
      sentToCrm = await sendLeadToCrm(leadData);
    } catch {
      // CRM send failed, but we still save locally
    }

    try {
      await prisma.websiteLead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          company: leadData.company || null,
          subject: leadData.subject || null,
          message: leadData.message,
          formType: leadData.formType,
          sentToCrm,
        },
      });
    } catch (dbError) {
      console.error("[Lead] DB save failed:", dbError);
      // Still return success to user — the lead data was received
    }

    return NextResponse.json(
      { success: true, message: "Заявка отправлена успешно" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Ошибка при отправке заявки" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Protected — require admin auth
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await prisma.websiteLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(leads);
  } catch {
    return NextResponse.json(
      { error: "Ошибка загрузки заявок" },
      { status: 500 }
    );
  }
}
