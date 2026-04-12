import type { Metadata } from "next";
import HeroCarousel from "@/components/public/HeroCarousel";
import FranchisingTogether from "@/components/public/FranchisingTogether";
import NewsGrid from "@/components/public/NewsGrid";
import EventsPreview from "@/components/public/EventsPreview";
import StatsBar from "@/components/public/StatsBar";
import ThreeColumns from "@/components/public/ThreeColumns";
import MembershipCTA from "@/components/public/MembershipCTA";
import PartnersSection from "@/components/public/PartnersSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import NewsletterForm from "@/components/public/NewsletterForm";
import FranchiseQuiz from "@/components/public/FranchiseQuiz";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "UFA — Ассоциация Франчайзинга Узбекистана",
  description: "Ведущая ассоциация франчайзинга в Узбекистане. 500+ франшиз, образовательные программы, мероприятия и поддержка бизнеса.",
};

// Fallback data used when DB is not available (first run without PostgreSQL)
const fallbackSlides = [
  {
    id: 1,
    title: "Franchise Expo Tashkent 2026",
    subtitle: "Крупнейшая выставка франшиз в Центральной Азии. Более 200 брендов, 5000 посетителей.",
    image: "/images/hero-1.svg",
    buttonText: "Зарегистрироваться",
    buttonUrl: "/events",
  },
  {
    id: 2,
    title: "Развивайте бизнес с UFA",
    subtitle: "Присоединяйтесь к Ассоциации Франчайзинга Узбекистана.",
    image: "/images/hero-2.svg",
    buttonText: "Вступить в UFA",
    buttonUrl: "/membership",
  },
  {
    id: 3,
    title: "Образование и сертификация",
    subtitle: "Программы обучения мирового уровня для франчайзеров и франчайзи.",
    image: "/images/hero-3.svg",
    buttonText: "Узнать больше",
    buttonUrl: "/about",
  },
];

const fallbackStats = [
  { value: "500+", label: "Франшиз" },
  { value: "1 200+", label: "Участников" },
  { value: "50+", label: "Городов" },
  { value: "3.5 трлн", label: "Сум вклад в ВВП" },
  { value: "15 000+", label: "Рабочих мест" },
  { value: "200+", label: "Международных брендов" },
];

const fallbackPartners = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Партнёр ${i + 1}`,
  logo: `/complogo/${i + 1}.png`,
  website: "#",
}));

export default async function HomePage() {
  let slides = fallbackSlides;
  let stats = fallbackStats;
  let news: { id: number; title: string; slug: string; excerpt: string | null; image: string | null; publishedAt: Date | null }[] = [];
  let partners = fallbackPartners;

  try {
    const dbSlides = await prisma.slide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    if (dbSlides.length > 0) {
      slides = dbSlides.map((s) => ({
        id: s.id,
        title: s.title,
        subtitle: s.subtitle || "",
        image: s.image,
        buttonText: s.buttonText || "",
        buttonUrl: s.buttonUrl || "#",
      }));
    }

    const dbStats = await prisma.statistic.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    if (dbStats.length > 0) {
      stats = dbStats;
    }

    const dbNews = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { id: true, title: true, slug: true, excerpt: true, image: true, publishedAt: true },
    });
    if (dbNews.length > 0) {
      news = dbNews;
    }

    const dbPartners = await prisma.partner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, logo: true, website: true },
    });
    if (dbPartners.length > 0) {
      partners = dbPartners.map((p) => ({
        id: p.id,
        name: p.name,
        logo: p.logo,
        website: p.website || "#",
      }));
    }
  } catch {
    // DB not available — use fallback data
  }

  const formattedNews = news.map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    excerpt: n.excerpt || "",
    image: n.image || "/images/news-1.jpg",
    publishedAt: n.publishedAt ? n.publishedAt.toISOString().split("T")[0] : "",
  }));

  return (
    <>
      <HeroCarousel slides={slides} />
      <StatsBar stats={stats} />
      <FranchisingTogether />
      <ThreeColumns />
      {formattedNews.length > 0 && <NewsGrid news={formattedNews} />}
      <EventsPreview />
      <TestimonialsSection />
      <FranchiseQuiz />
      <MembershipCTA />
      <PartnersSection partners={partners} />
      <NewsletterForm />
    </>
  );
}
