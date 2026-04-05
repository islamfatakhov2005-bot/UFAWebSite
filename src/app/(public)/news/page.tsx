import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новости — UFA",
  description: "Последние новости франчайзинга в Узбекистане.",
};

const allNews = [
  {
    id: 1,
    title: "Franchise Expo Tashkent 2026: регистрация открыта",
    slug: "franchise-expo-2026",
    excerpt:
      "Крупнейшее мероприятие в сфере франчайзинга Центральной Азии пройдёт 15-17 мая в Tashkent City. Более 200 брендов из 25 стран представят свои франшизы.",
    image: "/images/news-1.jpg",
    publishedAt: "2026-03-28",
    category: "Мероприятия",
  },
  {
    id: 2,
    title: "UFA подписала меморандум с IFA",
    slug: "ufa-ifa-memorandum",
    excerpt:
      "Международная Ассоциация Франчайзинга и UFA объединяют усилия для развития рынка Узбекистана. Соглашение предусматривает обмен опытом и совместные программы.",
    image: "/images/news-2.jpg",
    publishedAt: "2026-03-20",
    category: "Партнёрство",
  },
  {
    id: 3,
    title: "Новые программы поддержки франчайзи",
    slug: "support-programs-2026",
    excerpt:
      "UFA запускает программу менторства и финансовой поддержки для начинающих франчайзи. Программа включает индивидуальные консультации и доступ к льготному кредитованию.",
    image: "/images/news-3.jpg",
    publishedAt: "2026-03-15",
    category: "Программы",
  },
  {
    id: 4,
    title: "Рейтинг лучших франшиз Узбекистана 2026",
    slug: "top-franchises-2026",
    excerpt:
      "Опубликован ежегодный рейтинг самых успешных и перспективных франшиз страны. В этом году в рейтинг вошли 50 брендов из 12 отраслей.",
    image: "/images/news-4.jpg",
    publishedAt: "2026-03-10",
    category: "Исследования",
  },
  {
    id: 5,
    title: "Франчайзинг в сфере образования: тренды 2026",
    slug: "education-franchising-trends",
    excerpt:
      "Образовательные франшизы показывают рост 35% в год. Анализ рынка и перспективные направления.",
    image: "/images/news-1.jpg",
    publishedAt: "2026-03-05",
    category: "Исследования",
  },
  {
    id: 6,
    title: "Вебинар: Как выбрать франшизу",
    slug: "webinar-choose-franchise",
    excerpt:
      "Бесплатный вебинар от экспертов UFA о ключевых критериях выбора франшизы и типичных ошибках начинающих предпринимателей.",
    image: "/images/news-2.jpg",
    publishedAt: "2026-02-28",
    category: "Образование",
  },
];

export default function NewsPage() {
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
          <p className="text-lg text-white/80 max-w-2xl mb-8">
            Последние новости из мира франчайзинга Узбекистана и Центральной Азии.
          </p>
          <Link href="#news" className="inline-block border-2 border-white/60 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">Все новости ↓</Link>
        </div>
      </section>

      {/* News grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#3ECF8E] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <time className="text-xs text-gray-400 font-medium">
                    {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
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
