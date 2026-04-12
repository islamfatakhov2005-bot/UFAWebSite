import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Новости — UFA",
  description: "Последние новости франчайзинга в Узбекистане и Центральной Азии.",
};

const fallbackNews = [
  {
    id: 1,
    title: "Franchise Expo Tashkent 2026: регистрация открыта",
    slug: "franchise-expo-2026",
    excerpt:
      "Крупнейшее мероприятие в сфере франчайзинга Центральной Азии пройдёт 15-17 мая в Tashkent City.",
    image: "/images/news-1.jpg",
    publishedAt: new Date("2026-03-28"),
  },
  {
    id: 2,
    title: "UFA подписала меморандум с IFA",
    slug: "ufa-ifa-memorandum",
    excerpt:
      "Международная Ассоциация Франчайзинга и UFA объединяют усилия для развития рынка Узбекистана.",
    image: "/images/news-2.jpg",
    publishedAt: new Date("2026-03-20"),
  },
  {
    id: 3,
    title: "Новые программы поддержки франчайзи",
    slug: "support-programs-2026",
    excerpt:
      "UFA запускает программу менторства и финансовой поддержки для начинающих франчайзи.",
    image: "/images/news-3.jpg",
    publishedAt: new Date("2026-03-15"),
  },
  {
    id: 4,
    title: "Рейтинг лучших франшиз Узбекистана 2026",
    slug: "top-franchises-2026",
    excerpt:
      "Опубликован ежегодный рейтинг самых успешных и перспективных франшиз страны.",
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
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src="/images/hero-news.jpg"
          alt="Новости UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Новости</h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-4" />
          <p className="text-lg text-white/80 max-w-2xl">
            Последние новости из мира франчайзинга Узбекистана и Центральной Азии.
          </p>
        </div>
      </section>

      {/* News grid */}
      <section id="news" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image || "/images/news-1.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  {item.publishedAt && (
                    <time className="text-xs text-gray-400 font-medium">
                      {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  )}
                  <h2 className="mt-2 text-lg font-bold text-[#1A2332] line-clamp-2 group-hover:text-[#3ECF8E] transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">{item.excerpt}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-[#3ECF8E]">
                    Читать далее &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
