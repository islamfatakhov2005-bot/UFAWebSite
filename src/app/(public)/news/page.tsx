import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/db";
import { Newspaper, BookOpen, Mic, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Новости и исследования",
  description: "Центр новостей и исследований UFA — отраслевые публикации, журнал, подкасты, архив вебинаров и отчёты о состоянии франчайзинга в Узбекистане.",
};

const categories = [
  "Все новости",
  "Франчайзинг в СМИ",
  "Адвокация",
  "Пресс-релизы",
  "Экспертное мнение",
  "От CEO",
  "Журнал «Франчайзинг»",
  "Спонсорский фокус",
];

const resources = [
  {
    icon: BookOpen,
    title: "Гид по возможностям",
    text: "Ежегодное печатное издание с каталогом франшиз и советами экспертов.",
    href: "/resources/opportunities-guide",
  },
  {
    icon: Newspaper,
    title: "Журнал «Франчайзинг»",
    text: "Официальный отраслевой журнал UFA — 6 выпусков в год.",
    href: "/resources/magazine",
  },
  {
    icon: Mic,
    title: "Подкасты UFA",
    text: "Разговоры с лидерами отрасли, экспертами и успешными франчайзи.",
    href: "/resources/podcasts",
  },
  {
    icon: Video,
    title: "Архив вебинаров",
    text: "Более 200 часов образовательного контента для членов UFA.",
    href: "/events/webinars",
  },
];

const fallbackNews = [
  {
    id: 1,
    title: "Franchise Expo Tashkent 2026: регистрация открыта",
    slug: "franchise-expo-2026",
    excerpt: "Крупнейшее мероприятие в сфере франчайзинга Центральной Азии пройдёт 15-17 мая в Tashkent City.",
    image: "/images/news-1.jpg",
    publishedAt: new Date("2026-03-28"),
  },
  {
    id: 2,
    title: "UFA подписала меморандум с IFA",
    slug: "ufa-ifa-memorandum",
    excerpt: "Международная Ассоциация Франчайзинга и UFA объединяют усилия для развития рынка Узбекистана.",
    image: "/images/news-2.jpg",
    publishedAt: new Date("2026-03-20"),
  },
  {
    id: 3,
    title: "Новые программы поддержки франчайзи",
    slug: "support-programs-2026",
    excerpt: "UFA запускает программу менторства и финансовой поддержки для начинающих франчайзи.",
    image: "/images/news-3.jpg",
    publishedAt: new Date("2026-03-15"),
  },
  {
    id: 4,
    title: "Рейтинг лучших франшиз Узбекистана 2026",
    slug: "top-franchises-2026",
    excerpt: "Опубликован ежегодный рейтинг самых успешных и перспективных франшиз страны.",
    image: "/images/news-4.jpg",
    publishedAt: new Date("2026-03-10"),
  },
];

export default async function NewsPage() {
  let articles: typeof fallbackNews = fallbackNews;

  try {
    const dbNews = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, slug: true, excerpt: true, image: true, publishedAt: true },
    });
    if (dbNews.length > 0) {
      articles = dbNews.map((n) => ({
        ...n,
        excerpt: n.excerpt || "",
        image: n.image || "/images/news-1.jpg",
        publishedAt: n.publishedAt || new Date(),
      }));
    }
  } catch {
    // use fallback
  }

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-news.jpg"
          alt="Центр новостей UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Центр новостей и исследований
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Актуальные новости отрасли, пресс-релизы UFA, экспертные колонки,
            подкасты и архив вебинаров. Всё, что нужно знать профессионалу
            франчайзинга в Узбекистане.
          </p>
        </div>
      </section>

      {/* Categories filter */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-[0.08em] transition-colors ${
                  i === 0
                    ? "bg-[#3ECF8E] text-white"
                    : "bg-[#F4F4F4] text-[#0B2645] hover:bg-[#3ECF8E] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-[#F4F4F4] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <Image
                    src={item.image || "/images/news-1.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  {item.publishedAt && (
                    <time className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2A9D6F]">
                      {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  )}
                  <h2 className="mt-3 text-base font-semibold text-[#0B2645] leading-[1.5] line-clamp-2 group-hover:text-[#3ECF8E] transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm text-[#020409] leading-[1.8] line-clamp-3">
                    {item.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#2A9D6F] group-hover:underline">
                    Читать далее →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Ресурсы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="group bg-white rounded-lg p-6 block hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {resource.text}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
