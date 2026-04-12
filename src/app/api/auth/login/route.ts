import { NextRequest, NextResponse } from "next/server";
import { createToken, verifyPassword } from "@/lib/auth";
import prisma from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 attempts per 15 minutes per IP
    const ip = getClientIp(request.headers);
    const rl = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Слишком много попыток входа. Попробуйте через 15 минут." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Имя пользователя и пароль обязательны" },
        { status: 400 }
      );
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Неверный формат данных" },
        { status: 400 }
      );
    }

    // Look up user in database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Неверное имя пользователя или пароль" },
        { status: 401 }
      );
    }

    const validPassword = await verifyPassword(password, user.passwordHash);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Неверное имя пользователя или пароль" },
        { status: 401 }
      );
    }

    const token = createToken({
      userId: user.id,
      username: user.username,
      role: "admin",
    });

    const response = NextResponse.json(
      { success: true, message: "Вход выполнен успешно" },
      { status: 200 }
    );

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
