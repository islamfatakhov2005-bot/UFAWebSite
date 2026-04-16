import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Расписание обучения",
  description: "Ближайшие семинары, мастер-классы и очные сессии UFA Academy. Регистрация онлайн.",
};

const sessions = [
  { date: "23 апреля 2026", time: "10:00–17:00", format: "Очно, Ташкент", title: "Мастер-класс: Построение FDD с нуля", seats: "20 мест" },
  { date: "5 мая 2026", time: "14:00–18:00", format: "Онлайн (Zoom)", title: "Финансовая модель франшизы в Excel", seats: "Без лимита" },
  { date: "15 мая 2026", time: "09:30–13:30", format: "Очно, Самарканд", title: "Региональный воркшоп: запуск точки с нуля", seats: "30 мест" },
  { date: "29 мая 2026", time: "10:00–17:00", format: "Очно, Ташкент", title: "CFE Bootcamp — подготовка к экзамену", seats: "16 мест" },
  { date: "12 июня 2026", time: "14:00–17:00", format: "Онлайн", title: "Fran-Guard: этика и комплаенс", seats: "Без лимита" },
  { date: "26 июня 2026", time: "10:00–17:00", format: "Очно, Ташкент", title: "HR для мульти-юнит: рекрутинг, обучение, retention", seats: "25 мест" },
  { date: "18 июля 2026", time: "09:30–15:30", format: "Очно, Бухара", title: "Региональный воркшоп: масштабирование в областных центрах", seats: "30 мест" },
  { date: "7 августа 2026", time: "14:00–18:00", format: "Онлайн", title: "Маркетинг локальной точки: работающие каналы", seats: "Без лимита" },
  { date: "4 сентября 2026", time: "10:00–17:00", format: "Очно, Ташкент", title: "Юридический deep-dive: договор коммерческой концессии", seats: "18 мест" },
  { date: "25 сентября 2026", time: "14:00–17:00", format: "Онлайн", title: "Foundations of Franchising Live Q&A", seats: "Без лимита" },
];

export default function SchedulePage() {
  return (
    <>
      <section className="relative text-white py-20 overflow-hidden">
        <Image src="/images/hero-education.jpg" alt="Расписание обучения" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0B2645]/80" />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-[30px] md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-[-0.01em] mb-4">
            Расписание обучения
          </h1>
          <div className="w-12 h-[2px] bg-[#3ECF8E] mx-auto mb-6" />
          <p className="text-base md:text-lg text-white/85 leading-[1.65] max-w-2xl mx-auto">
            Очные семинары, онлайн-мастер-классы и воркшопы в регионах Узбекистана — ближайшие 12 сессий.
          </p>
        </div>
      </section>

      <section className="bg-[#F5F6F8] py-14">
        <div className="max-w-[900px] mx-auto px-6">
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li key={s.title + s.date} className="card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="md:w-44 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#3ECF8E]" />
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2A9D6F]">
                      {s.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#4A5568]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{s.time}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#0B2645] mb-1">
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#4A5568]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {s.format}
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0B2645]">
                      {s.seats}
                    </span>
                  </div>
                </div>
                <Link href="/contact" className="btn btn-outline-green text-xs whitespace-nowrap">
                  Зарегистрироваться
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
