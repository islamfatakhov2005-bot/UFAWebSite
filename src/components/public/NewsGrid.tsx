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
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
            Центр новостей
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645] leading-[1.3]">
            Последние новости франчайзинга
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <time className="text-xs font-bold uppercase tracking-[0.08em] text-[#2A9D6F]">
                  {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-3 text-lg font-bold text-[#0B2645] leading-[1.4] line-clamp-2 group-hover:text-[#3ECF8E] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#020409] leading-[1.7] line-clamp-2">
                  {item.excerpt}
                </p>
                <span className="inline-block mt-5 text-[#2A9D6F] text-sm font-bold uppercase tracking-[0.08em] group-hover:underline">
                  Читать →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Все новости
          </Link>
        </div>
      </div>
    </section>
  );
}
