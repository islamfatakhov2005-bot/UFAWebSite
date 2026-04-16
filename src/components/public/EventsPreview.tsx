import Link from "next/link";
import { MapPin } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    month: "МАЙ",
    day: "15",
    name: "Franchise Expo Tashkent 2026",
    location: "Ташкент, Узбекистан",
    href: "/events",
  },
  {
    id: 2,
    month: "ИЮН",
    day: "20",
    name: "Форум франчайзинга Центральной Азии",
    location: "Ташкент, Узбекистан",
    href: "/events",
  },
  {
    id: 3,
    month: "СЕН",
    day: "10",
    name: "Мастер-класс: Как открыть франшизу",
    location: "Самарканд, Узбекистан",
    href: "/events",
  },
];

export default function EventsPreview() {
  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2645] green-underline">
            Календарь мероприятий UFA
          </h2>
          <Link
            href="/events"
            className="hidden sm:inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
          >
            Смотреть все
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Link
              key={event.id}
              href={event.href}
              className="group flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex flex-col items-center justify-center text-white">
                <span className="text-[10px] font-bold uppercase leading-none">
                  {event.month}
                </span>
                <span className="text-2xl font-extrabold leading-none mt-0.5">
                  {event.day}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-[#0B2645] group-hover:text-[#3ECF8E] transition-colors line-clamp-2">
                  {event.name}
                </h3>
                <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {event.location}
                </p>
                <span className="inline-block mt-2 text-sm font-semibold text-[#3ECF8E] group-hover:translate-x-1 transition-transform">
                  Подробнее &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/events"
            className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
          >
            Смотреть все
          </Link>
        </div>
      </div>
    </section>
  );
}
