import { NextRequest, NextResponse } from "next/server";
import { sendLeadToCrm } from "@/lib/crm";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { insertLead, listLeads } from "@/lib/sqlite-leads";

export const runtime = "nodejs";

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

    // Primary: always save to local SQLite — doesn't depend on Postgres auth
    try {
      insertLead({ ...leadData, raw: body });
    } catch (sqliteError) {
      console.error("[Lead] SQLite save failed:", sqliteError);
    }

    // Best-effort CRM send
    let sentToCrm = false;
    try {
      sentToCrm = await sendLeadToCrm(leadData);
    } catch {
      /* CRM send failed */
    }

    // Best-effort Postgres (legacy — may fail if auth not configured)
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
    } catch {
      /* Postgres write failed — SQLite already has the lead */
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

  // SQLite is authoritative; Postgres is supplementary
  try {
    return NextResponse.json(listLeads(100));
  } catch {
    return NextResponse.json(
      { error: "Ошибка загрузки заявок" },
      { status: 500 }
    );
  }
}
