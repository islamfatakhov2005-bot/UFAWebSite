import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  GraduationCap,
  Users,
  Globe,
  MapPin,
  MessageSquare,
  Award,
  Sprout,
  UserCircle,
  Sparkles,
  Building,
  Flag,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Программы и сообщество",
  description: "Когда мы работаем вместе, нет предела тому, чего мы можем достичь. Программы и инициативы UFA для всех участников франчайзинговой отрасли.",
};

const programs = [
  {
    icon: Flag,
    title: "Открыто для возможностей",
    text: "Локальные события для продвижения франчайзинга в регионах Узбекистана — ярмарки, открытые двери, встречи с франчайзерами.",
    href: "/programs/open-for-opportunity",
  },
  {
    icon: MapPin,
    title: "Региональные сети",
    text: "Нетворкинговые группы участников UFA в 10 регионах страны. Ежемесячные встречи, совместные проекты.",
    href: "/programs/regional-networks",
  },
  {
    icon: HeartHandshake,
    title: "FranShip Менторство",
    text: "Программа наставничества: опытные франчайзеры работают один-на-один с новичками на протяжении 6 месяцев.",
    href: "/programs/franship",
  },
  {
    icon: GraduationCap,
    title: "Стипендии",
    text: "Стипендиальные программы для студентов и предпринимателей, интересующихся франчайзингом. Покрытие CFE и международных мероприятий.",
    href: "/programs/scholarships",
  },
  {
    icon: Sprout,
    title: "Для начинающих",
    text: "Программа поддержки для тех, кто только входит в предпринимательство через франчайзинг. Адаптация международного проекта VetFran.",
    href: "/programs/for-beginners",
  },
  {
    icon: UserCircle,
    title: "Женщины во франчайзинге",
    text: "Сообщество женщин-лидеров в отрасли. Менторство, нетворкинг, обучение, доступ к финансированию.",
    href: "/programs/women",
  },
  {
    icon: Sparkles,
    title: "Инициатива Ascension",
    text: "Программа ускоренного роста для перспективных франчайзеров на ранней стадии. Индивидуальный коучинг и капитал.",
    href: "/programs/ascension",
  },
  {
    icon: MessageSquare,
    title: "Комитеты и форумы",
    text: "Отраслевые рабочие группы по направлениям: F&B, ритейл, услуги, международная экспансия, юриспруденция.",
    href: "/programs/committees",
  },
  {
    icon: Award,
    title: "Институт разнообразия",
    text: "Исследования и программы по расширению представительства во франчайзинге — регионы, возраст, gender, background.",
    href: "/programs/diversity",
  },
  {
    icon: Users,
    title: "Молодёжный совет",
    text: "Совет молодых лидеров франчайзинга (до 35 лет). Формирование нового поколения предпринимателей.",
    href: "/programs/youth-council",
  },
  {
    icon: Building,
    title: "Совет лидеров регионов",
    text: "Руководители крупнейших региональных сетей Узбекистана — Ферганской, Бухарской, Самаркандской областей.",
    href: "/programs/regional-leaders",
  },
  {
    icon: Globe,
    title: "Международное расширение",
    text: "Поддержка узбекских франшиз при выходе на рынки СНГ и дальнего зарубежья. Партнёрство с IFA и WFC.",
    href: "/programs/international",
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-programs.jpg"
          alt="Программы UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1A2332]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Когда мы работаем вместе — нет предела тому, чего мы достигаем
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            UFA объединяет профессионалов франчайзинга через 12 программ и
            сообществ. Это пространства, где участники обучаются, строят связи,
            поддерживают друг друга и вместе формируют будущее отрасли в
            Узбекистане.
          </p>
        </div>
      </section>

      {/* 12 Program Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Наши программы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <Link
                  key={program.title}
                  href={program.href}
                  className="group bg-[#F4F4F4] rounded-lg p-6 block hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8] flex-1">
                    {program.text}
                  </p>
                  <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] mt-4 group-hover:underline">
                    Подробнее →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A2332]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Присоединяйтесь к сообществу
          </h2>
          <p className="text-white/90 text-base leading-[1.8] mb-8 mt-8">
            Участие в программах UFA доступно действующим членам ассоциации.
            Станьте участником и получите доступ ко всем 12 сообществам,
            менторским парам, стипендиям и ресурсам.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/membership"
              className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Стать участником
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#1A2332] px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
