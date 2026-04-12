import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

const staticPages = [
  { title: "Главная", url: "/", keywords: "главная домой" },
  { title: "О нас", url: "/about", keywords: "ассоциация история миссия команда" },
  { title: "Членство", url: "/membership", keywords: "вступить тарифы цены членство" },
  { title: "Каталог франшиз", url: "/franchise-opportunities", keywords: "каталог франшизы найти купить" },
  { title: "Обзор франчайзинга", url: "/franchising-overview", keywords: "что такое франчайзинг основы" },
  { title: "Образование", url: "/education", keywords: "курсы обучение сертификация CFE" },
  { title: "Мероприятия", url: "/events", keywords: "выставка конференция форум expo" },
  { title: "Поддержка", url: "/advocacy", keywords: "юридическая защита законодательство" },
  { title: "Программы", url: "/programs", keywords: "менторство стипендии сообщество" },
  { title: "Новости", url: "/news", keywords: "новости статьи блог" },
  { title: "Контакты", url: "/contact", keywords: "связаться адрес телефон email" },
];

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({
      pages: staticPages.map(({ title, url }) => ({ title, url, type: "Страницы" as const })),
      news: [],
      events: [],
      franchises: [],
    });
  }

  const lower = q.toLowerCase();

  // Static pages — client-side filter
  const matchedPages = staticPages
    .filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.keywords.toLowerCase().includes(lower)
    )
    .map(({ title, url }) => ({ title, url, type: "Страницы" as const }));

  // Database searches in parallel
  const [news, events, franchises] = await Promise.all([
    prisma.news.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { title: true, slug: true },
      take: 5,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.event.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { title: true, slug: true },
      take: 5,
      orderBy: { startDate: "desc" },
    }),
    prisma.franchise.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { name: true, slug: true },
      take: 5,
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return NextResponse.json({
    news: news.map((n) => ({ title: n.title, url: `/news/${n.slug}`, type: "Новости" as const })),
    events: events.map((e) => ({ title: e.title, url: `/events/${e.slug}`, type: "Мероприятия" as const })),
    franchises: franchises.map((f) => ({ title: f.name, url: `/franchise-opportunities/${f.slug}`, type: "Франшизы" as const })),
    pages: matchedPages,
  });
}
