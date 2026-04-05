import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  publishedAt: string;
}

interface NewsGridProps {
  news: NewsItem[];
}

export default function NewsGrid({ news }: NewsGridProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2332] green-underline">
            Последние новости
          </h2>
          <Link
            href="/news"
            className="hidden sm:inline-block text-sm font-semibold text-[#3ECF8E] hover:text-[#35B67A] transition-colors"
          >
            Центр новостей &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <time className="text-xs text-gray-400 font-medium">
                  {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-2 font-semibold text-[#1A2332] line-clamp-2 group-hover:text-[#3ECF8E] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                <span className="inline-block mt-4 text-sm font-semibold text-[#3ECF8E] group-hover:translate-x-1 transition-transform">
                  Подробнее &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
