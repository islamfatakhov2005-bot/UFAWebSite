import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Shield,
  FileBadge,
  FlaskConical,
  Star,
  HeartHandshake,
  TrendingUp,
  DollarSign,
  Network,
  BarChart3,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Образование",
  description:
    "Вместе во франчайзинге через образование — UFA Academy, живые семинары, программа CFE и отраслевые сертификации.",
};

const core = [
  {
    icon: GraduationCap,
    title: "UFA Academy",
    tagline: "200+ онлайн-курсов",
    description:
      "Платформа самостоятельного обучения с курсами по всем аспектам франчайзинга: от основ бизнес-модели до продвинутых стратегий масштабирования. Доступ 24/7 для участников UFA.",
    ctas: [
      { text: "Войти в LMS", href: "/education/academy/login", primary: true },
      { text: "Каталог курсов", href: "/education/academy", primary: false },
    ],
  },
  {
    icon: Users,
    title: "Живое обучение",
    tagline: "Семинары и мастер-классы",
    description:
      "Очные и виртуальные мероприятия с действующими франчайзерами и экспертами индустрии. Реальные кейсы, интерактивные сессии и networking с коллегами по цеху.",
    ctas: [
      { text: "Расписание", href: "/education/schedule", primary: true },
      { text: "Корпоративные программы", href: "/contact", primary: false },
    ],
  },
  {
    icon: Award,
    title: "Программа CFE",
    tagline: "Certified Franchise Executive",
    description:
      "Золотой стандарт профессиональной сертификации в индустрии франчайзинга. Признаётся Международной Ассоциацией Франчайзинга и открывает двери на международный рынок.",
    ctas: [
      { text: "Подробнее", href: "/education/cfe", primary: true },
      { text: "Записаться", href: "/education/cfe/enroll", primary: false },
    ],
  },
];

const additional = [
  {
    icon: BookOpen,
    title: "Foundations",
    text: "Вводный курс для всех, кто рассматривает франчайзинг. Бизнес-модель, юридическая база, финансовая структура.",
  },
  {
    icon: Shield,
    title: "Fran-Guard",
    text: "Курс по этике и соответствию стандартам отрасли. Обязательный модуль программы CFE.",
  },
  {
    icon: FileBadge,
    title: "Сертификаты",
    text: "Тематические сертификации по ролям: маркетинг, операции, право, международная экспансия.",
  },
  {
    icon: FlaskConical,
    title: "Custom Labs",
    text: "Индивидуальные корпоративные программы. Разрабатываются под задачи конкретного бренда.",
  },
  {
    icon: Star,
    title: "Signature Series",
    text: "Премиум-серия от лидеров отрасли. Ограниченный набор, только для членов UFA.",
  },
  {
    icon: HeartHandshake,
    title: "FranShip",
    text: "Программа менторства — опытные франчайзеры курируют новичков один-на-один.",
  },
];

const advantages = [
  {
    icon: TrendingUp,
    title: "Опытные инструкторы",
    text: "Все курсы ведут действующие франчайзеры и признанные эксперты с многолетней практикой.",
  },
  {
    icon: BarChart3,
    title: "Практический подход",
    text: "Только применимые знания — реальные кейсы, разбор ошибок, готовые шаблоны.",
  },
  {
    icon: DollarSign,
    title: "Доступные цены для членов",
    text: "Скидки до 50% на все программы для действующих участников UFA.",
  },
  {
    icon: Network,
    title: "Международное признание",
    text: "Сертификаты UFA признаются в странах СНГ и партнёрами IFA по всему миру.",
  },
  {
    icon: Award,
    title: "Карьерный рост",
    text: "Выпускники программ CFE получают оффер от ведущих франчайзинговых сетей страны.",
  },
];

const educationTeam = [
  {
    role: "Директор по образованию",
    email: "education@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Менеджер программы CFE",
    email: "cfe@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Координатор UFA Academy",
    email: "academy@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
];

export default function EducationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-education.jpg"
          alt="Образование UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Мы во Франчайзинге Вместе через Образование
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Образование — фундамент франчайзинга. UFA предлагает комплексную
            систему обучения: от вводных курсов для тех, кто только изучает
            отрасль, до международной сертификации для состоявшихся лидеров.
            Программы разработаны практикующими франчайзерами для практикующих
            франчайзеров.
          </p>
        </div>
      </section>

      {/* 3 Core Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Ключевые программы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {core.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.title}
                  className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col"
                >
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-1">
                    {program.title}
                  </h3>
                  <p className="text-[#2A9D6F] text-xs font-semibold uppercase tracking-[0.08em] mb-4">
                    {program.tagline}
                  </p>
                  <p className="text-[#020409] text-sm leading-[1.8] mb-6 flex-1">
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    {program.ctas.map((cta) => (
                      <Link
                        key={cta.text}
                        href={cta.href}
                        className={`block text-center py-3 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors ${
                          cta.primary
                            ? "bg-[#3ECF8E] hover:bg-[#35B67A] text-white"
                            : "border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white"
                        }`}
                      >
                        {cta.text}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 Additional Programs */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Дополнительные программы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additional.map((program) => {
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

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Почему UFA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {advantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <div key={adv.title} className="text-center">
                  <div className="w-14 h-14 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-7 h-7 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {adv.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-[#0B2645]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white/90 text-lg md:text-xl leading-[1.8] italic mb-8">
            «Программа CFE дала мне системное понимание франчайзинга — от юридической
            структуры до операционных деталей. Через год после выпуска мы открыли
            первые три франчайзинговые точки нашей сети. Без UFA Academy мы бы
            учились на своих ошибках ещё три года.»
          </p>
          <div>
            <p className="text-[#3ECF8E] text-sm font-bold uppercase tracking-[0.08em]">
              Сардор Умаров
            </p>
            <p className="text-white/70 text-sm">
              CEO, «Плов Ташкент» • Выпускник CFE 2024
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Команда образования
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationTeam.map((person) => (
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
                    className="block text-[#3ECF8E] hover:underline"
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
