import HeroCarousel from "@/components/public/HeroCarousel";
import FranchisingTogether from "@/components/public/FranchisingTogether";
import FindYourFranchise from "@/components/public/FindYourFranchise";
import NewsGrid from "@/components/public/NewsGrid";
import EventsSpotlight from "@/components/public/EventsSpotlight";
import StatsBar from "@/components/public/StatsBar";
import ThreeColumns from "@/components/public/ThreeColumns";
import MembershipCTA from "@/components/public/MembershipCTA";
import prisma from "@/lib/db";

const fallbackSlides = [
  {
    id: 1,
    title: "Franchise Expo 2026",
    subtitle: "18–19 апреля 2026, Hyatt Regency Tashkent. Крупнейшая франчайзинговая выставка Центральной Азии.",
    image: "/images/hero-events.jpg",
    buttonText: "Зарегистрироваться",
    buttonUrl: "/events/expo",
  },
  {
    id: 2,
    title: "Развивайте бизнес с UFA",
    subtitle: "Присоединяйтесь к Ассоциации Франчайзинга Узбекистана.",
    image: "/images/hero-membership.jpg",
    buttonText: "Вступить в UFA",
    buttonUrl: "/membership",
  },
  {
    id: 3,
    title: "Образование и сертификация",
    subtitle: "Программы обучения мирового уровня для франчайзеров и франчайзи.",
    image: "/images/hero-education.jpg",
    buttonText: "Узнать больше",
    buttonUrl: "/education",
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

export default async function HomePage() {
  let slides = fallbackSlides;
  let stats = fallbackStats;
  let news: { id: number; title: string; slug: string; excerpt: string | null; image: string | null; publishedAt: Date | null }[] = [];

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
      take: 6,
      select: { id: true, title: true, slug: true, excerpt: true, image: true, publishedAt: true },
    });
    if (dbNews.length > 0) {
      news = dbNews;
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
      <FranchisingTogether />
      <FindYourFranchise />
      {formattedNews.length > 0 && <NewsGrid news={formattedNews} />}
      <EventsSpotlight />
      <StatsBar stats={stats} />
      <ThreeColumns />
      <MembershipCTA />
    </>
  );
}
