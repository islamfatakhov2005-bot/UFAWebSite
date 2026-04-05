import Image from "next/image";
import Link from "next/link";
import { Building2, Target, Users, Globe, Award, Handshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас — UFA",
  description: "Узнайте об Ассоциации Франчайзинга Узбекистана, нашей миссии и команде.",
};

const values = [
  {
    icon: Target,
    title: "Миссия",
    text: "Содействие развитию франчайзинга как эффективного инструмента предпринимательства в Узбекистане.",
  },
  {
    icon: Globe,
    title: "Видение",
    text: "Узбекистан — ведущий рынок франчайзинга в Центральной Азии с прозрачной и развитой экосистемой.",
  },
  {
    icon: Handshake,
    title: "Партнёрство",
    text: "Мы сотрудничаем с международными организациями, государственными органами и бизнес-сообществом.",
  },
  {
    icon: Award,
    title: "Стандарты",
    text: "Продвигаем лучшие мировые практики и этические стандарты ведения франчайзингового бизнеса.",
  },
  {
    icon: Users,
    title: "Сообщество",
    text: "Объединяем более 1200 участников — франчайзеров, франчайзи, экспертов и инвесторов.",
  },
  {
    icon: Building2,
    title: "Развитие",
    text: "Поддерживаем бизнес на каждом этапе — от идеи до масштабирования на международные рынки.",
  },
];

const milestones = [
  { year: "2019", event: "Основание Ассоциации Франчайзинга Узбекистана" },
  { year: "2020", event: "Первая Franchise Expo Tashkent — 50 участников" },
  { year: "2021", event: "Подписание меморандума с Международной Ассоциацией Франчайзинга (IFA)" },
  { year: "2022", event: "Запуск образовательной программы CFE (Certified Franchise Executive)" },
  { year: "2023", event: "Количество участников превышает 500" },
  { year: "2024", event: "Franchise Expo Tashkent 2024 — 150 брендов, 3000 посетителей" },
  { year: "2025", event: "Международное признание — членство в World Franchise Council" },
  { year: "2026", event: "Более 1200 участников, 500+ франшиз в каталоге" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-about.jpg"
          alt="Офис ассоциации"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Об Ассоциации</h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            Ассоциация Франчайзинга Узбекистана (UFA) — некоммерческая организация,
            созданная для развития и популяризации франчайзинга в Узбекистане. Мы
            объединяем бизнес, экспертизу и государственную поддержку для создания
            сильной франчайзинговой экосистемы.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
          >
            Вступить в UFA
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline mb-12">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-16">
            История UFA
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3ECF8E] to-[#4AADAD]" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-8 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-white rounded-xl p-5 shadow-sm inline-block max-w-sm">
                      <span className="text-sm font-bold gradient-text">{m.year}</span>
                      <p className="text-gray-700 text-sm mt-1">{m.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#3ECF8E] rounded-full border-4 border-white shadow-md z-10 flex-shrink-0" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2332] mb-4">
            Станьте частью UFA
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Присоединяйтесь к более чем 1200 участникам ассоциации.
            Получите доступ к экспертизе, мероприятиям и сообществу профессионалов.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/membership"
              className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
            >
              Начать моё членство
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
