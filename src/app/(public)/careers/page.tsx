import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  TrendingUp,
  GraduationCap,
  Coffee,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Карьера в UFA",
  description: "Станьте частью команды Ассоциации Франчайзинга Узбекистана — работайте над развитием одной из самых динамичных отраслей страны.",
};

const values = [
  {
    icon: Heart,
    title: "Работа с миссией",
    text: "Мы помогаем тысячам людей строить собственный бизнес и создавать рабочие места в регионах страны.",
  },
  {
    icon: TrendingUp,
    title: "Влияние на отрасль",
    text: "Ваша работа напрямую формирует законодательство и стандарты франчайзингового рынка Узбекистана.",
  },
  {
    icon: GraduationCap,
    title: "Развитие",
    text: "Доступ ко всем программам UFA Academy, конференциям и международному нетворкингу через партнёров IFA и WFC.",
  },
  {
    icon: Coffee,
    title: "Культура",
    text: "Современный офис в центре Ташкента, гибкий график, дружная команда из 40+ человек с международным опытом.",
  },
  {
    icon: Globe,
    title: "Международные связи",
    text: "Регулярные командировки на IFA Convention, World Franchise Council и отраслевые события в СНГ и за рубежом.",
  },
];

const openings = [
  {
    title: "Менеджер по работе с франчайзерами",
    team: "Членство",
    location: "Ташкент",
    type: "Полная занятость",
  },
  {
    title: "Специалист по адвокации",
    team: "Адвокация",
    location: "Ташкент",
    type: "Полная занятость",
  },
  {
    title: "Координатор мероприятий",
    team: "Мероприятия",
    location: "Ташкент",
    type: "Полная занятость",
  },
  {
    title: "Редактор журнала «Франчайзинг»",
    team: "Коммуникации",
    location: "Ташкент / удалённо",
    type: "Полная занятость",
  },
  {
    title: "Аналитик отрасли",
    team: "Исследования",
    location: "Ташкент",
    type: "Полная занятость",
  },
  {
    title: "Менеджер UFA Academy",
    team: "Образование",
    location: "Ташкент",
    type: "Полная занятость",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-about.jpg"
          alt="Карьера в UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/75" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.2] mb-4">
            Работайте с нами
          </h1>
          <div className="w-16 h-1 bg-[#3ECF8E] mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/90 leading-[1.7] max-w-3xl mx-auto">
            UFA — команда из 40+ профессионалов, которые каждый день делают
            франчайзинг в Узбекистане сильнее. Мы ищем людей, которые разделяют
            нашу миссию и готовы к содержательной работе.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Почему UFA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-[#F4F4F4] rounded-lg p-6 text-center"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {v.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Открытые позиции
          </h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-[#0B2645] mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-600 uppercase tracking-[0.08em]">
                    <span>{job.team}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Link
                  href="mailto:info@uzfranchise.uz"
                  className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors whitespace-nowrap text-center"
                >
                  Откликнуться
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 bg-white rounded-lg p-10">
            <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
              Не нашли подходящей позиции?
            </h3>
            <p className="text-[#020409] text-sm leading-[1.8] mb-6">
              Присылайте резюме и короткое сопроводительное письмо — мы
              рассматриваем сильных кандидатов вне открытых вакансий.
            </p>
            <Link
              href="mailto:info@uzfranchise.uz"
              className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              info@uzfranchise.uz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
