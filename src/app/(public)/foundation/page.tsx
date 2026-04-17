import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Flag,
  BookOpen,
  HandCoins,
  GraduationCap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Фонд UFA",
  description: "Фонд UFA создаёт пути в предпринимательство через франчайзинг для всех. Стипендии, программы разнообразия, поддержка ветеранов и локальные инициативы.",
};

const programs = [
  {
    icon: Sparkles,
    title: "Институт разнообразия",
    text: "Исследования и программы по расширению представительства во франчайзинге.",
  },
  {
    icon: Flag,
    title: "Инициатива Ascension",
    text: "Ускоренный рост для перспективных брендов на ранней стадии франчайзинга.",
  },
  {
    icon: Heart,
    title: "Для начинающих",
    text: "Поддержка людей, которые впервые пробуют себя в предпринимательстве.",
  },
  {
    icon: BookOpen,
    title: "Открыто для возможностей",
    text: "Локальные события для продвижения франчайзинга в регионах страны.",
  },
  {
    icon: HandCoins,
    title: "Франчайзинг отдаёт",
    text: "Программа, в которой франчайзи поддерживают местные сообщества и школы.",
  },
  {
    icon: GraduationCap,
    title: "Стипендии",
    text: "Образовательные стипендии для студентов и начинающих предпринимателей.",
  },
];

const foundationTeam = [
  {
    role: "Исполнительный директор Фонда",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Директор программ",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Менеджер стипендий",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Координатор региональных программ",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Менеджер по сбору средств",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
];

export default function FoundationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-foundation.jpg"
          alt="Фонд UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Создаём пути в предпринимательство для всех
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Фонд UFA — некоммерческая организация, основанная в 2022 году.
            Миссия Фонда — сделать предпринимательство через франчайзинг
            доступным для людей всех регионов, возрастов и социальных групп
            Узбекистана.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            О Фонде
          </h2>
          <p className="text-[#020409] text-base leading-[1.8] mt-8">
            Фонд UFA — зарегистрированная некоммерческая организация, которая
            реализует образовательные, социальные и региональные программы в
            сфере франчайзинга. За три года работы Фонд направил более 1.2 млрд
            сум на стипендии, программы менторства и поддержку предпринимателей
            в регионах.
          </p>
        </div>
      </section>

      {/* 6 Program Cards */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Программы Фонда
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.title}
                  className="bg-white rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {program.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {program.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-20 bg-[#0B2645]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Поддержите Фонд
          </h2>
          <p className="text-white/90 text-base leading-[1.8] mb-8 mt-8">
            Ваше пожертвование помогает студентам получить образование в сфере
            франчайзинга, начинающим предпринимателям — открыть первый бизнес,
            а региональным сетям — расти. Фонд UFA — зарегистрированная НКО,
            пожертвования подтверждаются юридически.
          </p>
          <Link
            href="/foundation/donate"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Пожертвовать
          </Link>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Команда Фонда
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {foundationTeam.map((person) => (
              <div
                key={person.email}
                className="bg-[#F4F4F4] rounded-lg p-6"
              >
                <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                  {person.role}
                </p>
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${person.email}`}
                    className="block text-[#3ECF8E] hover:underline break-all"
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
