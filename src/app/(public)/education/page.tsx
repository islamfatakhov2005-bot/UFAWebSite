import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Video,
  Monitor,
  BookOpen,
  Presentation,
  GraduationCap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Образование — UFA",
  description:
    "Образовательные программы UFA: CFE сертификация, вебинары, курсы и мастер-классы по франчайзингу.",
};

const programs = [
  {
    icon: Award,
    title: "CFE Программа",
    description:
      "Международная программа Certified Franchise Executive — золотой стандарт профессиональной сертификации в индустрии франчайзинга. Подготовка и сертификация по стандартам IFA.",
    href: "/education",
  },
  {
    icon: Video,
    title: "Вебинары UFA",
    description:
      "Регулярные онлайн-вебинары с экспертами отрасли по актуальным темам: юридические аспекты, маркетинг, финансовое планирование и операционное управление.",
    href: "/education",
  },
  {
    icon: Monitor,
    title: "Онлайн-курсы",
    description:
      "Самостоятельное обучение в удобном темпе. Курсы охватывают все аспекты франчайзинга — от основ до продвинутых стратегий масштабирования.",
    href: "/education",
  },
  {
    icon: BookOpen,
    title: "Основы франчайзинга",
    description:
      "Вводный курс для начинающих предпринимателей. Базовые знания о бизнес-модели, правовых аспектах и финансовом планировании франшизы.",
    href: "/franchising-overview",
  },
  {
    icon: Presentation,
    title: "Мастер-классы",
    description:
      "Интенсивные практические занятия с действующими франчайзерами и экспертами. Реальные кейсы, разбор ошибок и лучшие практики рынка.",
    href: "/events",
  },
  {
    icon: GraduationCap,
    title: "Партнёры по образованию",
    description:
      "Сотрудничество с ведущими университетами и бизнес-школами Узбекистана для развития академических программ по франчайзингу.",
    href: "/about",
  },
];

export default function EducationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-education.jpg"
          alt="Образовательные программы"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Образование и развитие
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            UFA предлагает комплексные образовательные программы для
            франчайзеров, франчайзи и профессионалов индустрии. Наши программы
            соответствуют международным стандартам и адаптированы для рынка
            Узбекистана.
          </p>
          <Link href="/contact" className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25">Начать обучение</Link>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-12">
            Наши программы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.title}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                    {program.description}
                  </p>
                  <Link
                    href={program.href}
                    className="inline-block text-center bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
                  >
                    Узнать больше →
                  </Link>
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
            Начните обучение сегодня
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Свяжитесь с нами, чтобы узнать о расписании программ, условиях
            участия и специальных предложениях для членов UFA.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </>
  );
}
