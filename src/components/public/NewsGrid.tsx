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
    <section className="py-20 bg-[#F5F6F8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <span className="eyebrow text-[#3ECF8E] mb-3">Центр новостей</span>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0B2645] leading-[1.15] tracking-[-0.01em] mt-2">
              Последние новости франчайзинга
            </h2>
          </div>
          <Link
            href="/news"
            className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#2A9D6F] hover:underline hidden sm:inline-block"
          >
            Все новости →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="card card-hover overflow-hidden group"
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
                <time className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2A9D6F]">
                  {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-3 text-[17px] font-bold text-[#0B2645] leading-[1.35] line-clamp-2 group-hover:text-[#3ECF8E] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#4A5568] leading-[1.65] line-clamp-2">
                  {item.excerpt}
                </p>
                <span className="inline-block mt-4 text-[#2A9D6F] text-[13px] font-bold uppercase tracking-[0.06em] group-hover:underline">
                  Читать →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
