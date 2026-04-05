import Image from "next/image";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мероприятия — UFA",
  description: "Мероприятия Ассоциации Франчайзинга Узбекистана: выставки, конференции, вебинары.",
};

const events = [
  {
    id: 1,
    title: "Franchise Expo Tashkent 2026",
    date: "15-17 мая 2026",
    time: "10:00 — 18:00",
    location: "Tashkent City Convention Center",
    attendees: "5000+",
    description:
      "Крупнейшая выставка франшиз в Центральной Азии. Более 200 брендов из 25 стран, мастер-классы, нетворкинг и инвестиционные сессии.",
    type: "Выставка",
    featured: true,
  },
  {
    id: 2,
    title: "Форум 'Франчайзинг 2026: Новые горизонты'",
    date: "8 июня 2026",
    time: "09:00 — 17:00",
    location: "Hilton Tashkent City",
    attendees: "500+",
    description:
      "Ежегодный форум с участием международных спикеров. Тренды, кейсы, правовое регулирование.",
    type: "Конференция",
    featured: false,
  },
  {
    id: 3,
    title: "Вебинар: Как выбрать франшизу",
    date: "20 апреля 2026",
    time: "14:00 — 16:00",
    location: "Онлайн (Zoom)",
    attendees: "200+",
    description:
      "Бесплатный вебинар от экспертов UFA. Критерии выбора франшизы, анализ рынка, юридические аспекты.",
    type: "Вебинар",
    featured: false,
  },
  {
    id: 4,
    title: "Нетворкинг-ужин UFA Members",
    date: "25 апреля 2026",
    time: "19:00 — 22:00",
    location: "The Ritz Tashkent",
    attendees: "100",
    description:
      "Эксклюзивное мероприятие для участников UFA. Неформальное общение, обмен опытом и новые контакты.",
    type: "Нетворкинг",
    featured: false,
  },
  {
    id: 5,
    title: "Мастер-класс: Масштабирование франшизы",
    date: "10 мая 2026",
    time: "10:00 — 13:00",
    location: "UFA Hub, Ташкент",
    attendees: "50",
    description:
      "Практический мастер-класс о стратегиях масштабирования. Для действующих франчайзеров.",
    type: "Мастер-класс",
    featured: false,
  },
];

const typeColors: Record<string, string> = {
  "Выставка": "bg-purple-100 text-purple-700",
  "Конференция": "bg-blue-100 text-blue-700",
  "Вебинар": "bg-green-100 text-green-700",
  "Нетворкинг": "bg-orange-100 text-orange-700",
  "Мастер-класс": "bg-pink-100 text-pink-700",
};

export default function EventsPage() {
  const featured = events.find((e) => e.featured);
  const upcoming = events.filter((e) => !e.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src="/images/hero-events.jpg"
          alt="Мероприятия UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Мероприятия</h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-4" />
          <p className="text-lg text-white/80 max-w-2xl mb-8">
            Конференции, выставки, вебинары и нетворкинг-мероприятия от UFA.
          </p>
          <Link href="#featured" className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25">Ближайшее событие ↓</Link>
        </div>
      </section>

      {/* Featured event */}
      {featured && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-[#1A2332] green-underline mb-8">
              Главное мероприятие
            </h2>
            <div className="bg-gradient-to-br from-[#3ECF8E]/10 to-[#4AADAD]/10 rounded-xl p-8 md:p-12 border border-[#3ECF8E]/20">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${typeColors[featured.type] || "bg-gray-100 text-gray-700"}`}>
                {featured.type}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#1A2332] mb-4">
                {featured.title}
              </h3>
              <p className="text-gray-600 text-lg mb-6 max-w-3xl leading-relaxed">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#3ECF8E]" />
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-[#3ECF8E]" />
                  <span>{featured.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#3ECF8E]" />
                  <span>{featured.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-[#3ECF8E]" />
                  <span>{featured.attendees} участников</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming events */}
      <section className="py-16 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-[#1A2332] green-underline mb-8">
            Предстоящие мероприятия
          </h2>
          <div className="space-y-6">
            {upcoming.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-extrabold leading-none">
                      {event.date.match(/\d+/)?.[0]}
                    </span>
                    <span className="text-xs font-medium mt-0.5">
                      {event.date.match(/[а-яё]+/i)?.[0]?.slice(0, 3)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${typeColors[event.type] || "bg-gray-100 text-gray-700"}`}>
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-[#1A2332] mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {event.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> {event.attendees}
                      </span>
                    </div>
                    <Link href="/contact" className="text-[#2A9D6F] font-semibold">Подробнее →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
