import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  MapPin,
  HeartHandshake,
  Sprout,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Влияние франчайзинга",
  description: "Экономическое и социальное влияние франчайзинга на Узбекистан — данные, исследования и карта отрасли по регионам.",
};

const stats = [
  { value: "$2.3B", label: "ВВП франчайзинга" },
  { value: "12 500", label: "франчайзинговых точек" },
  { value: "85%", label: "локальное владение" },
  { value: "3.2%", label: "доля в ВВП страны" },
  { value: "180K", label: "рабочих мест" },
  { value: "68%", label: "первый бизнес владельца" },
];

const cards = [
  {
    icon: TrendingUp,
    title: "Экономический рост",
    text: "Франчайзинг — один из самых быстрорастущих секторов Узбекистана, превышающий темпы роста ВВП на 2.5%.",
  },
  {
    icon: Users,
    title: "Рабочие места",
    text: "180 000 человек работают во франчайзинговых предприятиях страны. Из них 62% — молодёжь до 35 лет.",
  },
  {
    icon: MapPin,
    title: "Регионы",
    text: "Франчайзинг представлен во всех 14 регионах страны. За 2025 год открыто 2400 точек, из них 1100 — вне Ташкента.",
  },
  {
    icon: HeartHandshake,
    title: "Социальная ответственность",
    text: "76% франчайзи участвуют в благотворительности, поддержке местных школ, спорта и культурных инициатив.",
  },
  {
    icon: Sprout,
    title: "Предпринимательство",
    text: "Франчайзинг снижает барьер входа в бизнес. 68% наших франчайзи — предприниматели без предыдущего опыта.",
  },
];

const regions = [
  { name: "Ташкент", points: "4 200" },
  { name: "Самаркандская обл.", points: "1 100" },
  { name: "Ферганская обл.", points: "980" },
  { points: "820" },
  { points: "760" },
  { name: "Бухарская обл.", points: "690" },
  { name: "Ташкентская обл.", points: "650" },
  { name: "Кашкадарьинская обл.", points: "540" },
  { name: "Сурхандарьинская обл.", points: "480" },
  { name: "Хорезмская обл.", points: "420" },
  { points: "380" },
  { points: "310" },
  { name: "Сырдарьинская обл.", points: "220" },
  { name: "Каракалпакстан", points: "360" },
];

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-impact.jpg"
          alt="Влияние франчайзинга"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Влияние франчайзинга
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Франчайзинг — двигатель экономики Узбекистана. Он создаёт рабочие
            места, развивает предпринимательство в регионах и даёт возможности
            тысячам начинающих владельцев бизнеса. Вот цифры, которые это
            подтверждают.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#3ECF8E] mb-3">
                  {stat.value}
                </div>
                <p className="text-[#020409] text-xs leading-[1.8] uppercase tracking-[0.08em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Cards */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Что даёт франчайзинг стране
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-lg p-6 border-t-4 border-[#3ECF8E]"
                >
                  <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value + PDF */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            Ценность франчайзинга
          </h2>
          <p className="text-[#020409] text-base leading-[1.8] mb-8 mt-8">
            Исследование UFA совместно с Центром экономических исследований
            показывает: франчайзинговые предприятия в среднем на 22% устойчивее
            независимых в первые три года работы, создают рабочие места быстрее
            и имеют более высокую налоговую отдачу на единицу инвестиций.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/resources/value-report-2026.pdf"
              className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Полный отчёт
            </Link>
            <Link
              href="/resources/executive-summary-2026.pdf"
              className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Краткое резюме
            </Link>
          </div>
        </div>
      </section>

      {/* Regions map */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Франчайзинг по регионам
          </h2>
          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="border-l-4 border-[#3ECF8E] pl-4"
                >
                  <p className="text-[#020409] text-sm font-semibold mb-1">
                    {region.name}
                  </p>
                  <p className="text-[#2A9D6F] text-lg font-bold">
                    {region.points}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.08em]">
                    точек
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 CTAs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/franchising-overview"
              className="group bg-[#F4F4F4] rounded-lg p-8 block hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                Что такое франчайзинг
              </h3>
              <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                Узнайте, как работает бизнес-модель, которая создаёт 180 000
                рабочих мест в стране.
              </p>
              <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                Подробнее →
              </span>
            </Link>
            <Link
              href="/get-involved"
              className="group bg-[#F4F4F4] rounded-lg p-8 block hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                Присоединяйтесь
              </h3>
              <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                Вы делаете франчайзинг лучше. Узнайте, как стать частью сети
                активных участников отрасли.
              </p>
              <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                Включиться →
              </span>
            </Link>
            <Link
              href="/membership"
              className="group bg-[#F4F4F4] rounded-lg p-8 block hover:shadow-md transition-shadow"
            >
              <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                Членство UFA
              </h3>
              <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                Выбирайте тариф, подходящий вашему бизнесу — франчайзерам,
                франчайзи и поставщикам.
              </p>
              <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                Изучить →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
