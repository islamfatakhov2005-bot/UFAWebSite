import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Store,
  Package,
  TrendingUp,
  BarChart3,
  GraduationCap,
  Users,
  Megaphone,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Членство",
  description: "Присоединяйтесь к Ассоциации Франчайзинга Узбекистана — три типа членства, пять категорий преимуществ, прямой доступ к экспертам и программам отрасли.",
};

const types = [
  {
    icon: Building2,
    title: "Франчайзеры",
    text: "Бренды, продающие франшизы и развивающие сети на территории Узбекистана и за рубежом. Доступ к инструментам роста, маркетингу, исследованиям и юридической поддержке.",
    cta: "Подробнее для франчайзеров",
    href: "/membership/franchisors",
  },
  {
    icon: Store,
    title: "Франчайзи",
    text: "Предприниматели, владеющие и управляющие одной или несколькими франшизами. Обучение, нетворкинг, аналитика и голос в отраслевой повестке.",
    cta: "Подробнее для франчайзи",
    href: "/membership/franchisees",
  },
  {
    icon: Package,
    title: "Поставщики",
    text: "Компании, обслуживающие франчайзинговую отрасль: юристы, консультанты, IT, маркетинг, банки. Прямой выход на лиц, принимающих решения.",
    cta: "Подробнее для поставщиков",
    href: "/membership/suppliers",
  },
];

const stats = [
  { value: "1200+", label: "действующих участников" },
  { value: "500+", label: "франшиз в каталоге" },
  { value: "300+", label: "отраслей" },
  { value: "95%", label: "продлевают членство" },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Развивайте бизнес",
    items: [
      "Доступ к каталогу франшиз UFA и базе данных участников",
      "Размещение бренда на портале и в отраслевых публикациях",
      "Лиды и запросы от потенциальных франчайзи",
      "Партнёрские скидки от поставщиков-членов UFA",
      "Участие в Franchise Expo Tashkent и региональных выставках",
    ],
  },
  {
    icon: BarChart3,
    title: "Исследования и аналитика",
    items: [
      "Ежегодный отчёт «Экономический прогноз франчайзинга Узбекистана»",
      "Опросы франчайзеров и франчайзи",
      "Аналитика по регионам, отраслям и ценовым сегментам",
      "Доступ к Franchise Business Review бенчмаркам",
      "Ежемесячная рассылка ключевых показателей рынка",
    ],
  },
  {
    icon: GraduationCap,
    title: "Образование",
    items: [
      "Программа CFE (Certified Franchise Executive)",
      "UFA Academy — 200+ курсов в онлайн-формате",
      "Живые семинары и мастер-классы для команд",
      "Сертификации Foundations и Fran-Guard",
      "Индивидуальные корпоративные программы",
    ],
  },
  {
    icon: Users,
    title: "Находите своих людей",
    items: [
      "Комитеты и рабочие группы по отраслям",
      "Программа менторства FranShip",
      "Советы лидеров — женщины, новые франчайзеры, мульти-юнит",
      "Региональные нетворкинговые встречи",
      "Ежегодная конвенция UFA в Ташкенте",
    ],
  },
  {
    icon: Megaphone,
    title: "Адвокация",
    items: [
      "Представление интересов в парламенте и министерствах",
      "Сеть действий UFA — 5000+ адвокатов франчайзинга",
      "Позиция по налоговым, трудовым и лицензионным вопросам",
      "Прямой доступ к рабочим группам регуляторов",
      "Юридический центр и amicus-поддержка",
    ],
  },
];

const plans = [
  {
    name: "Базовый",
    price: "2 500 000",
    description: "Для начинающих франчайзи и предпринимателей",
    features: [
      "Доступ к каталогу франшиз",
      "Участие в открытых мероприятиях",
      "Ежемесячная рассылка",
      "Базовые консультации",
    ],
    featured: false,
  },
  {
    name: "Профессиональный",
    price: "7 500 000",
    description: "Для действующих франчайзеров и франчайзи",
    features: [
      "Все преимущества Базового",
      "Приоритетное участие в мероприятиях",
      "Экспертные консультации (4 часа/мес)",
      "Юридическая поддержка",
      "Размещение в каталоге UFA",
      "Доступ к аналитике рынка",
    ],
    featured: true,
  },
  {
    name: "Корпоративный",
    price: "25 000 000",
    description: "Для крупных франчайзинговых сетей и компаний",
    features: [
      "Все преимущества Профессионального",
      "Неограниченные консультации",
      "Участие в рабочих группах",
      "Выступление на мероприятиях UFA",
      "Премиум-размещение на сайте",
      "Индивидуальный менеджер",
      "VIP-нетворкинг мероприятия",
    ],
    featured: false,
  },
];

const team = [
  {
    role: "Членство",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Привлечение членов",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    role: "Работа с участниками",
    email: "info@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
];

const exploreMore = [
  {
    title: "Франчайзеры",
    text: "Расширяйте сеть, получайте лиды и исследования — инструменты для роста вашего бренда.",
    href: "/membership/franchisors",
  },
  {
    title: "Франчайзи",
    text: "Обучение, нетворкинг и юридическая поддержка для владельцев одной или нескольких точек.",
    href: "/membership/franchisees",
  },
  {
    title: "Поставщики",
    text: "Выходите на лиц, принимающих решения, в отрасли, где концентрируется 80% франчайзинга страны.",
    href: "/membership/suppliers",
  },
];

export default function MembershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-membership.jpg"
          alt="Участники UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Присоединяйтесь к нам во Франчайзинге Вместе
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            UFA — это сообщество франчайзеров, франчайзи и поставщиков, которые
            вместе развивают отрасль, защищают её интересы и помогают друг другу
            расти. Подайте заявку или задайте вопрос — наша команда членства
            свяжется с вами в течение рабочего дня.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/registration"
              className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Подать заявку
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#0B2645] px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Узнать больше
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Membership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Типы членства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {types.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col"
                >
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {type.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8] mb-6 flex-1">
                    {type.text}
                  </p>
                  <Link
                    href={type.href}
                    className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] hover:underline"
                  >
                    {type.cta} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership by the Numbers */}
      <section className="py-20 bg-[#0B2645]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading white-underline-center !text-white text-center mb-12">
            Членство UFA в цифрах
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#3ECF8E] mb-3">
                  {stat.value}
                </div>
                <p className="text-white/80 text-sm leading-[1.8] uppercase tracking-[0.08em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Benefit Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-16">
            Преимущества членства
          </h2>
          <div className="space-y-16">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-start ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:col-span-4">
                    <div className="w-16 h-16 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#3ECF8E]" />
                    </div>
                    <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645]">
                      {benefit.title}
                    </h3>
                  </div>
                  <ul className="md:col-span-8 space-y-3">
                    {benefit.items.map((item) => (
                      <li
                        key={item}
                        className="text-[#020409] text-sm leading-[1.8] pl-6 relative"
                      >
                        <span className="absolute left-0 top-3 w-2 h-2 bg-[#3ECF8E] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-4">
            Тарифы
          </h2>
          <p className="text-center text-[#020409] text-sm leading-[1.8] max-w-2xl mx-auto mb-12 mt-8">
            Выберите тариф в зависимости от размера вашего бизнеса и целей.
            Членские взносы реинвестируются в развитие отрасли.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-8 ${
                  plan.featured
                    ? "bg-[#0B2645] text-white relative"
                    : "bg-white border border-gray-200"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-white text-xs font-bold uppercase tracking-[0.08em] px-4 py-1 rounded">
                    Рекомендуемый
                  </div>
                )}
                <p
                  className={`text-sm leading-[1.8] mb-6 ${
                    plan.featured ? "text-white/80" : "text-[#020409]"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span
                    className={`text-3xl font-bold ${
                      plan.featured ? "text-[#3ECF8E]" : "text-[#0B2645]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ml-2 ${
                      plan.featured ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    сум / год
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm leading-[1.8] pl-6 relative ${
                        plan.featured ? "text-white/90" : "text-[#020409]"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-3 w-2 h-2 rounded-full ${
                          plan.featured ? "bg-[#3ECF8E]" : "bg-[#3ECF8E]"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/registration"
                  className={`block text-center py-3 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors ${
                    plan.featured
                      ? "bg-[#3ECF8E] text-white hover:bg-[#35B67A]"
                      : "border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white"
                  }`}
                >
                  Подать заявку
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            Готовы стать участником?
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mb-8 mt-8">
            Заполните короткую заявку, и менеджер команды членства свяжется с
            вами в течение рабочего дня, чтобы подобрать оптимальный тариф и
            ответить на все вопросы.
          </p>
          <Link
            href="/registration"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Подать заявку
          </Link>
        </div>
      </section>

      {/* Team contacts */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Команда членства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.email}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-4">
                  {person.role}
                </h3>
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

      {/* Explore More */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Узнайте больше
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exploreMore.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-[#F4F4F4] rounded-lg p-8 block hover:shadow-md transition-shadow"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                  {card.text}
                </p>
                <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                  Подробнее →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
