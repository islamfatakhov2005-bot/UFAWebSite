/**
 * Database seed script.
 * Run: npx tsx seed.ts
 *
 * Seeds initial data: admin user, slides, stats, sample news, partners from CompLogo.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL || "postgresql://ufa:ufa_password@localhost:5432/ufa_website";
const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── Admin user ──
  const adminExists = await prisma.user.findUnique({ where: { username: "admin" } });
  if (!adminExists) {
    await prisma.user.create({
      data: {
        username: "admin",
        passwordHash: await bcrypt.hash("admin123", 12),
        fullName: "Administrator",
      },
    });
    console.log("✓ Admin user created (admin / admin123)");
  }

  // ── Hero Slides ──
  const slidesCount = await prisma.slide.count();
  if (slidesCount === 0) {
    await prisma.slide.createMany({
      data: [
        {
          title: "Ассоциация Франчайзинга Узбекистана",
          subtitle: "Объединяем лидеров франчайзинга для развития бизнеса в Узбекистане",
          image: "/images/hero-1.jpg",
          buttonText: "Узнать больше",
          buttonUrl: "/about",
          sortOrder: 1,
        },
        {
          title: "Franchise Expo Tashkent 2026",
          subtitle: "Крупнейшая выставка франчайзинга в Центральной Азии — 18-19 апреля, Hyatt Regency",
          image: "/images/hero-2.jpg",
          buttonText: "Зарегистрироваться",
          buttonUrl: "/events",
          sortOrder: 2,
        },
        {
          title: "Вступайте в UFA",
          subtitle: "Получите доступ к эксклюзивным ресурсам, мероприятиям и сообществу франчайзинга",
          image: "/images/hero-3.jpg",
          buttonText: "Стать участником",
          buttonUrl: "/membership",
          sortOrder: 3,
        },
      ],
    });
    console.log("✓ Hero slides created");
  }

  // ── Statistics ──
  const statsCount = await prisma.statistic.count();
  if (statsCount === 0) {
    await prisma.statistic.createMany({
      data: [
        { value: "500+", label: "Франшиз в Узбекистане", sortOrder: 1 },
        { value: "1 200+", label: "Компаний-участников", sortOrder: 2 },
        { value: "50+", label: "Городов присутствия", sortOrder: 3 },
        { value: "3.5 трлн", label: "Сум вклад в ВВП", sortOrder: 4 },
        { value: "15 000+", label: "Рабочих мест создано", sortOrder: 5 },
        { value: "200+", label: "Международных брендов", sortOrder: 6 },
      ],
    });
    console.log("✓ Statistics created");
  }

  // ── Sample News ──
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          title: "UFA объявляет о проведении Franchise Expo Tashkent 2026",
          slug: "franchise-expo-tashkent-2026",
          excerpt: "Крупнейшая выставка франчайзинга в Центральной Азии пройдёт 18-19 апреля в Hyatt Regency Tashkent.",
          content: "<p>Ассоциация Франчайзинга Узбекистана объявляет о проведении ежегодной выставки Franchise Expo Tashkent 2026. Мероприятие соберёт более 100 брендов и 3000 посетителей.</p><p>Выставка пройдёт в отеле Hyatt Regency Tashkent и предложит уникальные возможности для нетворкинга, обучения и поиска франшиз.</p>",
          image: "/images/news-1.jpg",
          isPublished: true,
          publishedAt: new Date("2026-03-15"),
        },
        {
          title: "Рынок франчайзинга Узбекистана вырос на 25% за 2025 год",
          slug: "franchise-market-growth-2025",
          excerpt: "По данным UFA, количество франчайзинговых предприятий в стране увеличилось до 500+.",
          content: "<p>Рынок франчайзинга в Узбекистане демонстрирует стабильный рост. За 2025 год количество франчайзинговых предприятий увеличилось на 25%, достигнув отметки в 500+ компаний.</p>",
          image: "/images/news-2.jpg",
          isPublished: true,
          publishedAt: new Date("2026-03-10"),
        },
        {
          title: "UFA подписала меморандум с International Franchise Association",
          slug: "ufa-ifa-memorandum",
          excerpt: "Стратегическое партнёрство откроет новые возможности для узбекских франчайзоров на международных рынках.",
          content: "<p>UFA и IFA подписали меморандум о взаимопонимании, который укрепит сотрудничество в сфере франчайзинга между Узбекистаном и международным сообществом.</p>",
          image: "/images/news-3.jpg",
          isPublished: true,
          publishedAt: new Date("2026-02-28"),
        },
        {
          title: "Образовательная программа CFE стартует в Ташкенте",
          slug: "cfe-program-tashkent",
          excerpt: "Программа сертификации Certified Franchise Executive впервые будет доступна в Узбекистане.",
          content: "<p>UFA запускает образовательную программу CFE (Certified Franchise Executive) в Ташкенте. Программа разработана совместно с IFA и адаптирована для рынка Центральной Азии.</p>",
          image: "/images/news-4.jpg",
          isPublished: true,
          publishedAt: new Date("2026-02-15"),
        },
      ],
    });
    console.log("✓ Sample news created");
  }

  // ── Sample Events ──
  const eventsCount = await prisma.event.count();
  if (eventsCount === 0) {
    await prisma.event.createMany({
      data: [
        {
          title: "Franchise Expo Tashkent 2026",
          slug: "franchise-expo-tashkent-2026",
          description: "Крупнейшая выставка франчайзинга в Центральной Азии. 100+ брендов, 3000+ посетителей, нетворкинг и обучающие сессии.",
          location: "Hyatt Regency Tashkent",
          startDate: new Date("2026-04-18"),
          endDate: new Date("2026-04-19"),
          isPublished: true,
        },
        {
          title: "Franchise Expo New York 2026",
          slug: "franchise-expo-new-york-2026",
          description: "Международная выставка франчайзинга в Нью-Йорке. Узбекские бренды выходят на мировой рынок.",
          location: "Javits Center, New York",
          startDate: new Date("2026-05-29"),
          endDate: new Date("2026-05-30"),
          isPublished: true,
        },
      ],
    });
    console.log("✓ Sample events created");
  }

  // ── Partners from CompLogo ──
  const partnersCount = await prisma.partner.count();
  if (partnersCount === 0) {
    const compLogoDir = path.join(process.cwd(), "public", "complogo");
    if (fs.existsSync(compLogoDir)) {
      const files = fs.readdirSync(compLogoDir).filter(f => f.endsWith(".png"));
      const partners = files.map((file, index) => ({
        name: `Партнёр ${index + 1}`,
        logo: `/complogo/${file}`,
        sortOrder: index,
        isActive: true,
      }));
      await prisma.partner.createMany({ data: partners });
      console.log(`✓ ${partners.length} partners created from CompLogo`);
    }
  }

  // ── Site Settings ──
  const settingsCount = await prisma.siteSetting.count();
  if (settingsCount === 0) {
    await prisma.siteSetting.createMany({
      data: [
        { key: "site_name", value: "UFA — Ассоциация Франчайзинга Узбекистана", description: "Название сайта" },
        { key: "site_description", value: "Объединяем лидеров франчайзинга для развития бизнеса в Узбекистане", description: "Описание сайта" },
        { key: "contact_email", value: "info@uzfranchise.uz", description: "Email для связи" },
        { key: "contact_phone", value: "+998 71 200 00 00", description: "Телефон" },
        { key: "address", value: "г. Ташкент, ул. Амира Темура, 107", description: "Адрес офиса" },
        { key: "telegram_url", value: "https://t.me/uzfranchiseassociation", description: "Telegram" },
        { key: "instagram_url", value: "https://instagram.com/uzfranchise", description: "Instagram" },
        { key: "facebook_url", value: "https://facebook.com/uzfranchise", description: "Facebook" },
        { key: "linkedin_url", value: "", description: "LinkedIn" },
        { key: "youtube_url", value: "", description: "YouTube" },
      ],
    });
    console.log("✓ Site settings created");
  }

  // ── Sample Pages ──
  const pagesCount = await prisma.page.count();
  if (pagesCount === 0) {
    await prisma.page.createMany({
      data: [
        {
          title: "О франчайзинге",
          slug: "about-franchising",
          content: "<h2>Что такое франчайзинг?</h2><p>Франчайзинг — это форма ведения бизнеса, при которой франчайзер предоставляет франчайзи право использовать свой бренд, технологии и бизнес-модель.</p>",
          metaDescription: "Узнайте о франчайзинге в Узбекистане",
        },
        {
          title: "Политика конфиденциальности",
          slug: "privacy-policy",
          content: "<h2>Политика конфиденциальности</h2><p>UFA уважает вашу конфиденциальность и обязуется защищать ваши персональные данные.</p>",
        },
        {
          title: "Условия использования",
          slug: "terms",
          content: "<h2>Условия использования</h2><p>Используя сайт UFA, вы соглашаетесь с данными условиями.</p>",
        },
      ],
    });
    console.log("✓ Sample pages created");
  }

  // ── Menu Items ──
  const menuCount = await prisma.menuItem.count();
  if (menuCount === 0) {
    await prisma.menuItem.createMany({
      data: [
        { title: "Что такое франчайзинг?", url: "/about-franchising", sortOrder: 1, menuLocation: "main" },
        { title: "Новости", url: "/news", sortOrder: 2, menuLocation: "main" },
        { title: "Мероприятия", url: "/events", sortOrder: 3, menuLocation: "main" },
        { title: "Образование", url: "/education", sortOrder: 4, menuLocation: "main" },
        { title: "Поддержка", url: "/support", sortOrder: 5, menuLocation: "main" },
        { title: "Программы", url: "/programs", sortOrder: 6, menuLocation: "main" },
        { title: "Членство", url: "/membership", sortOrder: 7, menuLocation: "main" },
      ],
    });
    console.log("✓ Menu items created");
  }

  console.log("\nSeed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
