import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Coins,
  Briefcase,
  FileCheck,
  Users,
  Megaphone,
  Map,
  HeartHandshake,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Адвокация",
  description: "Адвокация помогает франчайзинговому бизнесу расти. UFA защищает интересы отрасли в парламенте, министерствах и СМИ.",
};

const policyAreas = [
  {
    icon: Coins,
    title: "Налоговая политика",
    text: "Упрощённые режимы налогообложения для франчайзи, льготы для новых точек, стабильность налоговой среды.",
  },
  {
    icon: Briefcase,
    title: "Трудовое право",
    text: "Защита модели «независимый франчайзи», гибкие трудовые отношения, обучение персонала.",
  },
  {
    icon: FileCheck,
    title: "Лицензирование и регистрация",
    text: "Упрощение регистрации франшиз, стандарты раскрытия информации, защита интеллектуальной собственности.",
  },
  {
    icon: Shield,
    title: "Защита отношений франчайзинга",
    text: "Законодательство, защищающее баланс интересов франчайзера и франчайзи, разрешение споров.",
  },
];

const quickLinks = [
  "Сеть действий франчайзинга",
  "FranPAC — отраслевой фонд",
  "Ответственный франчайзинг",
  "Закон о франчайзинге Узбекистана",
  "Налоговые вопросы",
  "Справедливый франчайзинг",
  "Юридический центр UFA",
  "Карта франчайзинга по регионам",
];

const advocacyNews = [
  {
    date: "Апрель 2026",
    title: "UFA представила законопроект о защите франчайзи в Олий Мажлисе",
    summary:
      "Пакет поправок расширяет обязательства по раскрытию информации и вводит механизм медиации споров.",
  },
  {
    date: "Март 2026",
    title: "Встреча с Министерством экономики по льготному налогообложению",
    summary:
      "Обсуждены предложения UFA по упрощённому режиму для франчайзинговых точек в регионах.",
  },
  {
    date: "Март 2026",
    title: "Исследование: вклад франчайзинга в ВВП Узбекистана вырос до 3.2%",
    summary:
      "Совместный отчёт UFA и Центра экономических исследований показывает устойчивый рост отрасли.",
  },
  {
    date: "Февраль 2026",
    title: "Подписан меморандум с Торгово-промышленной палатой",
    summary:
      "Соглашение о совместной защите интересов малого и среднего бизнеса во франчайзинге.",
  },
  {
    date: "Февраль 2026",
    title: "UFA присоединилась к World Franchise Council",
    summary:
      "Международное признание ассоциации как голоса узбекского франчайзингового сообщества.",
  },
  {
    date: "Январь 2026",
    title: "Опубликован годовой отчёт об адвокационной работе",
    summary:
      "12 законодательных инициатив, 50+ встреч с регуляторами, 300+ участников сети действий.",
  },
];

const priorities = [
  {
    title: "Закон о франчайзинге",
    text: "Полноценный отраслевой закон, регулирующий отношения франчайзинга, раскрытие информации и защиту сторон.",
  },
  {
    title: "Налоговые льготы",
    text: "Специальный режим для новых франчайзинговых точек в первые 2 года работы.",
  },
  {
    title: "Упрощённая регистрация",
    text: "Онлайн-регистрация франчайзинговых договоров через единый портал.",
  },
  {
    title: "Защита IP",
    text: "Усиленная защита товарных знаков и ноу-хау в рамках франчайзинговых сетей.",
  },
  {
    title: "Международная экспансия",
    text: "Поддержка узбекских брендов при выходе на рынки СНГ и дальнего зарубежья.",
  },
];

const getInvolved = [
  {
    icon: Map,
    title: "Влияние франчайзинга",
    text: "Отчёт о вкладе отрасли в экономику страны.",
    href: "/impact",
  },
  {
    icon: Map,
    title: "Франчайзинг по регионам",
    text: "Интерактивная карта с данными по 14 регионам.",
    href: "/franchising-by-region",
  },
  {
    icon: Users,
    title: "Сеть действий",
    text: "Присоединитесь к 5000+ адвокатов отрасли.",
    href: "/advocacy/action-network",
  },
  {
    icon: Megaphone,
    title: "Саммит адвокации",
    text: "Ежегодная встреча с законодателями.",
    href: "/events/advocacy-summit",
  },
  {
    icon: HeartHandshake,
    title: "FranPAC",
    text: "Отраслевой фонд поддержки законодательных инициатив.",
    href: "/advocacy/franpac",
  },
];

const advocacyTeam = [
  { role: "Директор по адвокации", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Директор юридического центра", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Менеджер связей с парламентом", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Менеджер связей с регуляторами", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Аналитик политики", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Координатор сети действий", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Директор FranPAC", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Менеджер по коммуникациям", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Координатор региональных программ", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Юрист отдела адвокации", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
];

export default function AdvocacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-advocacy.jpg"
          alt="Адвокация UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Адвокация помогает франчайзинговому бизнесу расти
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            UFA — голос франчайзинговой индустрии Узбекистана. Мы работаем с
            Олий Мажлисом, министерствами и регуляторами, чтобы формировать
            законодательство, которое защищает отношения франчайзинга и создаёт
            среду для роста. Узнайте о нашей дорожной карте развития отрасли.
          </p>
          <Link
            href="/advocacy/roadmap"
            className="inline-block mt-8 bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Дорожная карта роста
          </Link>
        </div>
      </section>

      {/* 4 Policy Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Приоритетные направления
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policyAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="bg-[#F4F4F4] rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {area.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {area.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Быстрые ссылки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <Scale className="w-5 h-5 text-[#3ECF8E] flex-shrink-0" />
                <span className="text-[#020409] text-sm font-semibold">
                  {link}
                </span>
                <span className="ml-auto text-[#2A9D6F]">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advocacy News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Новости адвокации
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advocacyNews.map((news) => (
              <article
                key={news.title}
                className="bg-[#F4F4F4] rounded-lg p-6 flex flex-col"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2A9D6F] mb-3">
                  {news.date}
                </span>
                <h3 className="text-base font-semibold text-[#0B2645] mb-3 leading-[1.5]">
                  {news.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8] mb-6 flex-1">
                  {news.summary}
                </p>
                <Link
                  href="/news"
                  className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] hover:underline"
                >
                  Читать →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Priorities */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Законодательные приоритеты 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {priorities.map((priority) => (
              <div
                key={priority.title}
                className="bg-white rounded-lg p-6 border-t-4 border-[#3ECF8E]"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                  {priority.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8]">
                  {priority.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Включайтесь в работу
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {getInvolved.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-[#F4F4F4] rounded-lg p-6 block hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {card.text}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Команда адвокации
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advocacyTeam.map((person) => (
              <div
                key={person.email}
                className="bg-white rounded-lg p-6"
              >
                <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                  {person.role}
                </p>
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${person.email}`}
                    className="block text-[#3ECF8E] hover:underline break-all"
                  >
                    {person.email}
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="block text-gray-600 hover:text-[#3ECF8E] transition-colors"
                  >
                    {person.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
