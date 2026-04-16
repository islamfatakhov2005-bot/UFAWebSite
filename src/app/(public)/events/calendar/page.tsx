import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Календарь UFA",
  description: "Полный календарь мероприятий UFA на ближайшие 12 месяцев — конференции, выставки, региональные встречи, вебинары.",
};

const events = [
  { date: "20 апр 2026", type: "Вебинар", title: "Как выбрать франшизу", location: "Онлайн", href: "/events/webinars" },
  { date: "15 мая 2026", type: "Региональная встреча", title: "Самарканд — владельцы F&B сетей", location: "Samarkand Regency", href: "/events/regional-networks" },
  { date: "15–17 мая 2026", type: "Выставка", title: "Franchise Expo Tashkent 2026", location: "Tashkent City Convention Center", href: "/events/expo" },
  { date: "8 июня 2026", type: "Конференция", title: "Мульти-юнит франчайзинг", location: "Hilton Samarkand", href: "/events/multi-unit-conference" },
  { date: "22 июня 2026", type: "Мастер-класс", title: "Масштабирование франшизы", location: "UFA Hub, Ташкент", href: "/events" },
  { date: "15 июля 2026", type: "Конференция", title: "Юридический симпозиум", location: "InterContinental Tashkent", href: "/events/legal-symposium" },
  { date: "3–4 августа 2026", type: "Региональная встреча", title: "Фергана — региональные операторы", location: "Ferghana Business Hub", href: "/events/regional-networks" },
  { date: "12 сентября 2026", type: "Конференция", title: "Новые франчайзеры — запуск бренда", location: "Ташкент", href: "/events/emerging-franchisor" },
  { date: "20–22 сентября 2026", type: "Конференция", title: "Маркетинг и рост", location: "Hotel Uzbekistan", href: "/events/marketing-conference" },
  { date: "14 октября 2026", type: "Конференция", title: "Лидерство и преемственность", location: "Бухара", href: "/events/leadership-conference" },
  { date: "5–6 ноября 2026", type: "Саммит", title: "Advocacy Summit", location: "Олий Мажлис, Ташкент", href: "/events/advocacy-summit" },
  { date: "20 ноября 2026", type: "Выставка", title: "Franchise Expo Tashkent — Autumn", location: "Tashkent City Convention Center", href: "/events/expo" },
  { date: "16–18 февраля 2027", type: "Конвенция", title: "Ежегодная конвенция UFA 2027", location: "Hilton Tashkent City", href: "/events/annual-convention" },
];

const categories = [
  "Все",
  "Конференции",
  "Конвенция",
  "Выставки",
  "Саммиты",
  "Вебинары",
  "Региональные встречи",
  "Мастер-классы",
];

export default function CalendarPage() {
  return (
    <>
      <section className="relative text-white py-20 overflow-hidden">
        <Image src="/images/hero-events.jpg" alt="Календарь UFA" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0B2645]/80" />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-[30px] md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-[-0.01em] mb-4">
            Календарь мероприятий UFA
          </h1>
          <div className="w-12 h-[2px] bg-[#3ECF8E] mx-auto mb-6" />
          <p className="text-base md:text-lg text-white/85 leading-[1.65] max-w-2xl mx-auto">
            60+ событий в год — от еженедельных вебинаров до главной отраслевой конвенции.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-[#D5DCE5] py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] rounded-[3px] transition-colors ${
                i === 0 ? "bg-[#0B2645] text-white" : "bg-[#F5F6F8] text-[#0B2645] hover:bg-[#0B2645] hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F6F8] py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={e.title + e.date}>
                <Link
                  href={e.href}
                  className="card card-hover flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-5 group"
                >
                  <div className="md:w-48 flex-shrink-0 flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#3ECF8E]" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2A9D6F]">
                      {e.date}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A5568] mb-1">
                      {e.type}
                    </p>
                    <h3 className="text-base font-bold text-[#0B2645] group-hover:text-[#3ECF8E] transition-colors">
                      {e.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-[13px] text-[#4A5568]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{e.location}</span>
                    </div>
                  </div>
                  <span className="text-[#2A9D6F] text-[13px] font-bold uppercase tracking-[0.06em] whitespace-nowrap">
                    Подробнее →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
