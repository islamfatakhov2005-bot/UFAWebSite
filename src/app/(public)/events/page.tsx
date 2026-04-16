import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мероприятия",
  description: "Конференции и мероприятия UFA — общайтесь, учитесь и развивайтесь. Ежегодная конвенция, саммит адвокации, образовательные форумы и региональные встречи.",
};

const eventCards = [
  {
    title: "Ежегодная конвенция UFA",
    date: "Февраль 2027",
    location: "Ташкент",
    description:
      "Крупнейшее мероприятие франчайзинга в Центральной Азии. Более 1500 участников, 150+ спикеров, программа для франчайзеров, франчайзи и поставщиков.",
    cta: "Подробнее",
    href: "/events/annual-convention",
  },
  {
    title: "Саммит адвокации",
    date: "Март 2026",
    location: "Ташкент",
    description:
      "Два дня на Олий Мажлисе и в министерствах. Встречи с законодателями, обсуждение налоговых и лицензионных вопросов отрасли.",
    cta: "Подробнее",
    href: "/events/advocacy-summit",
  },
  {
    title: "Конференция мульти-юнит франчайзинга",
    date: "Апрель 2026",
    location: "Самарканд",
    description:
      "Для владельцев нескольких точек и региональных представителей. Масштабирование, HR, операционная эффективность и структура собственности.",
    cta: "Подробнее",
    href: "/events/multi-unit-conference",
  },
  {
    title: "Юридический симпозиум",
    date: "Май 2026",
    location: "Ташкент",
    description:
      "Два дня для корпоративных юристов и in-house команд — договоры, FDD, споры, международная экспансия, последние решения судов.",
    cta: "Подробнее",
    href: "/events/legal-symposium",
  },
  {
    title: "Конференция роста и маркетинга",
    date: "Июнь 2026",
    location: "Ташкент",
    description:
      "Для CMO, директоров по развитию и маркетологов. Performance-маркетинг, лидогенерация, брендинг и рекрутинг франчайзи.",
    cta: "Подробнее",
    href: "/events/marketing-conference",
  },
  {
    title: "Конференция новых франчайзеров",
    date: "Сентябрь 2026",
    location: "Ташкент",
    description:
      "Для брендов на ранней стадии франчайзинга. Как запустить систему, выстроить поддержку и привлечь первых франчайзи.",
    cta: "Подробнее",
    href: "/events/emerging-franchisor",
  },
  {
    title: "Конференция лидерства",
    date: "Октябрь 2026",
    location: "Бухара",
    description:
      "Для CEO, владельцев и топ-менеджмента. Стратегия, корпоративное управление, преемственность и построение культуры.",
    cta: "Подробнее",
    href: "/events/leadership-conference",
  },
  {
    title: "Региональные сети UFA",
    date: "Круглый год",
    location: "10 регионов",
    description:
      "Региональные нетворкинговые встречи участников UFA в Ташкенте, Самарканде, Бухаре, Фергане, Андижане и других городах.",
    cta: "Подробнее",
    href: "/events/regional-networks",
  },
  {
    title: "Вебинары",
    date: "Еженедельно",
    location: "Онлайн",
    description:
      "Бесплатные и закрытые для членов онлайн-сессии: право, финансы, маркетинг, операции. Записи доступны в архиве.",
    cta: "Смотреть вебинары",
    href: "/events/webinars",
  },
  {
    title: "Franchise Expo Tashkent",
    date: "Ноябрь 2026",
    location: "Tashkent City Convention Center",
    description:
      "Главная франчайзинговая выставка страны. 150+ брендов, 3000+ посетителей, демо-стенды, инвестиционные сессии и деловые встречи.",
    cta: "Подробнее",
    href: "/events/expo",
  },
];

const upcomingEvents = [
  {
    date: "20 апреля 2026",
    title: "Вебинар: Как выбрать франшизу",
    location: "Онлайн",
  },
  {
    date: "15 мая 2026",
    title: "Региональная встреча UFA — Самарканд",
    location: "Samarkand Regency",
  },
  {
    date: "8 июня 2026",
    title: "Конференция мульти-юнит франчайзинга",
    location: "Hilton Samarkand",
  },
  {
    date: "22 июня 2026",
    title: "Мастер-класс: Масштабирование франшизы",
    location: "UFA Hub, Ташкент",
  },
  {
    date: "15 июля 2026",
    title: "Юридический симпозиум",
    location: "InterContinental Tashkent",
  },
];

const eventTeam = [
  {
    name: "Мадина Турсунова",
    role: "Директор по мероприятиям",
    email: "events@ufa.uz",
    phone: "+998 71 234 56 75",
  },
  {
    name: "Бехзод Рахимов",
    role: "Менеджер спонсорства",
    email: "sales@ufa.uz",
    phone: "+998 71 234 56 76",
  },
  {
    name: "Нодира Абдуллаева",
    role: "Координатор регистрации",
    email: "registration@ufa.uz",
    phone: "+998 71 234 56 83",
  },
  {
    name: "Шерзод Каримов",
    role: "Менеджер выставок",
    email: "expo@ufa.uz",
    phone: "+998 71 234 56 84",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-events.jpg"
          alt="Мероприятия UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Конференции и мероприятия UFA — общайтесь, учитесь, развивайтесь
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Мероприятия UFA объединяют франчайзеров, франчайзи и поставщиков со
            всей страны и из-за рубежа. От интимных региональных встреч до
            крупнейшей в Центральной Азии ежегодной конвенции — найдите формат,
            который поможет вашему бизнесу расти.
          </p>
        </div>
      </section>

      {/* 10 Event cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Наши мероприятия
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventCards.map((event) => (
              <div
                key={event.title}
                className="bg-[#F4F4F4] rounded-lg p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#3ECF8E]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2A9D6F]">
                    {event.date}
                  </span>
                </div>
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <p className="text-[#020409] text-sm leading-[1.8] mb-6 flex-1">
                  {event.description}
                </p>
                <Link
                  href={event.href}
                  className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] hover:underline"
                >
                  {event.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Ближайшие события
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="bg-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
              >
                <div className="flex items-center gap-2 md:w-48 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#3ECF8E]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2A9D6F]">
                    {event.date}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#0B2645] mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] hover:underline"
                >
                  Регистрация →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/events/calendar"
              className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Полный календарь
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsorship CTA */}
      <section className="py-20 bg-[#0B2645]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Станьте спонсором мероприятий UFA
          </h2>
          <p className="text-white/90 text-base leading-[1.8] mb-8 mt-8">
            Спонсорство мероприятий UFA — это прямой доступ к лицам, принимающим
            решения в отрасли: франчайзерам, региональным партнёрам, владельцам
            сетей. Пакеты подбираются индивидуально под задачи вашего бренда.
          </p>
          <Link
            href="mailto:sales@ufa.uz"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Запросить пакет спонсорства
          </Link>
        </div>
      </section>

      {/* Team contacts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Команда мероприятий
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTeam.map((person) => (
              <div
                key={person.email}
                className="bg-[#F4F4F4] rounded-lg p-6"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-1">
                  {person.name}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                  {person.role}
                </p>
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${person.email}`}
                    className="block text-[#3ECF8E] hover:underline"
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
