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
    <section className="py-20 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading green-underline">
            Последние новости
          </h2>
          <Link
            href="/news"
            className="hidden sm:inline-block text-sm font-semibold text-[#3ECF8E] hover:text-[#35B67A] transition-colors"
          >
            Центр новостей &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
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
                <h3 className="mt-2 font-semibold text-[#1A2332] line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                <span className="inline-block mt-4 text-[#3ECF8E] font-medium text-sm">
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
