import Image from "next/image";
import Link from "next/link";
import { Scale, Network, ShieldCheck, Users, FileText, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поддержка и защита интересов — UFA",
  description:
    "Законодательная работа, сеть действий и ответственный франчайзинг. Защита интересов индустрии.",
};

const pillars = [
  {
    icon: Scale,
    title: "Законодательная работа",
    description:
      "UFA активно участвует в разработке и совершенствовании законодательства о франчайзинге в Узбекистане. Мы работаем с Олий Мажлисом, министерствами и регуляторами для создания прозрачной правовой среды, защищающей интересы всех участников рынка.",
    highlights: [
      "Разработка закона о франчайзинге",
      "Защита прав интеллектуальной собственности",
      "Упрощение регистрации франшиз",
      "Налоговые льготы для франчайзинга",
    ],
  },
  {
    icon: Network,
    title: "Сеть действий франчайзинга",
    description:
      "Объединяем франчайзеров и франчайзи для коллективного решения отраслевых вопросов. Наша сеть позволяет быстро реагировать на вызовы рынка и координировать усилия сообщества.",
    highlights: [
      "Региональные рабочие группы",
      "Оперативное информирование",
      "Коллективные обращения",
      "Мониторинг регуляторных изменений",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Ответственный франчайзинг",
    description:
      "Продвигаем этические стандарты и лучшие практики ведения франчайзингового бизнеса. Кодекс этики UFA обеспечивает прозрачность и справедливость в отношениях между франчайзерами и франчайзи.",
    highlights: [
      "Кодекс этики UFA",
      "Стандарты раскрытия информации",
      "Медиация и разрешение споров",
      "Сертификация ответственных франчайзеров",
    ],
  },
];

const stats = [
  { value: "12", label: "Законодательных инициатив" },
  { value: "50+", label: "Встреч с регуляторами" },
  { value: "300+", label: "Участников сети действий" },
  { value: "95%", label: "Успешных медиаций" },
];

export default function AdvocacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-advocacy.jpg"
          alt="Поддержка бизнеса"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Поддержка и защита интересов
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            UFA защищает интересы франчайзингового сообщества через
            законодательную работу, развитие этических стандартов и создание
            справедливой бизнес-среды.
          </p>
          <Link href="/membership" className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25">Присоединиться</Link>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`flex flex-col lg:flex-row gap-8 items-start ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#1A2332]">
                      {pillar.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-[#f5f7fa] rounded-xl p-6 space-y-3">
                    {pillar.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#3ECF8E] rounded-full flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Initiatives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-12">
            Наши инициативы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Аналитические отчёты",
                desc: "Ежеквартальные отчёты о состоянии рынка франчайзинга и регуляторных изменениях.",
              },
              {
                icon: Users,
                title: "Рабочие группы",
                desc: "Тематические рабочие группы по ключевым вопросам индустрии.",
              },
              {
                icon: TrendingUp,
                title: "Мониторинг рынка",
                desc: "Постоянный мониторинг регуляторной среды и бизнес-климата.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span className="text-[#2A9D6F] font-semibold text-sm">Узнать больше →</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#1A2332] mb-4">
            Присоединиться к сети
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Станьте частью сети действий франчайзинга UFA и вместе защищайте
            интересы индустрии. Ваш голос имеет значение.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
          >
            Присоединиться к сети
          </Link>
        </div>
      </section>
    </>
  );
}
