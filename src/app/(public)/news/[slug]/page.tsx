import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Eye } from "lucide-react";
import prisma from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let article;
  try {
    article = await prisma.news.findUnique({ where: { slug } });
  } catch {
    return { title: "Новость не найдена | UFA" };
  }
  if (!article) return { title: "Новость не найдена | UFA" };

  return {
    title: article.title,
    description: article.excerpt || article.content.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.excerpt || article.content.slice(0, 160),
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await prisma.news.findUnique({ where: { slug } });
  } catch {
    notFound();
  }

  if (!article || !article.isPublished) notFound();

  // Increment views
  try {
    await prisma.news.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });
  } catch {
    // non-critical
  }

  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  // Get related articles
  let related: { id: number; title: string; slug: string; image: string | null; publishedAt: Date | null }[] = [];
  try {
    related = await prisma.news.findMany({
      where: { isPublished: true, id: { not: article.id } },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, title: true, slug: true, image: true, publishedAt: true },
    });
  } catch {
    // non-critical
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        datePublished: article.publishedAt?.toISOString(),
        description: article.excerpt,
        publisher: { "@type": "Organization", name: "UFA" },
      }) }} />
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src={article.image || "/images/hero-news.jpg"}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-4xl mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Все новости
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-4" />
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            {publishDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {publishDate}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {article.views + 1} просмотров
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>
          )}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-[#f5f7fa]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-[#1A2332] mb-8">
              Другие новости
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image || "/images/news-1.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    {item.publishedAt && (
                      <time className="text-xs text-gray-400">
                        {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                    <h3 className="mt-2 text-base font-bold text-[#1A2332] line-clamp-2 group-hover:text-[#3ECF8E] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
