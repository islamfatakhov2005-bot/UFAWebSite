import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  FileText,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обзор франчайзинга",
  description: "Что такое франчайзинг, как работает бизнес-модель, типы инвестиций, финансирование, плюсы и минусы — полный путеводитель от UFA.",
};

const sidebarLinks = [
  { label: "Обзор франчайзинга", href: "/franchising-overview" },
  { label: "Что такое франшиза", href: "/franchising-overview/what-is-a-franchise" },
  { label: "Введение в бизнес-модель", href: "/franchising-overview/business-model" },
  { label: "Начало работы", href: "/franchising-overview/getting-started" },
  { label: "Типы инвестиций", href: "/franchising-overview/investment-types" },
  { label: "Плюсы и минусы", href: "/franchising-overview/pros-and-cons" },
  { label: "Финансирование", href: "/franchising-overview/funding" },
  { label: "Вопросы перед покупкой", href: "/franchising-overview/questions" },
  { label: "Должная осмотрительность", href: "/franchising-overview/diligence" },
  { label: "Принятие решения", href: "/franchising-overview/decision" },
  { label: "Глоссарий терминов", href: "/franchising-overview/glossary" },
  { label: "Гид для продавцов", href: "/franchising-overview/sellers-guide" },
];

const recommended = [
  {
    icon: FileText,
    title: "Должная осмотрительность",
    text: "6 шагов проверки франшизы перед покупкой — от анализа договора до разговоров с действующими франчайзи.",
    href: "/franchising-overview/diligence",
  },
  {
    icon: HelpCircle,
    title: "15 вопросов перед покупкой",
    text: "Вопросы, которые нужно задать себе и франчайзеру прежде, чем подписывать договор.",
    href: "/franchising-overview/questions",
  },
  {
    icon: CheckCircle,
    title: "Принятие решения",
    text: "Как оценить франшизу, выбрать из нескольких вариантов и принять окончательное решение.",
    href: "/franchising-overview/decision",
  },
];

const exploreMore = [
  {
    icon: BookOpen,
    title: "Образование",
    text: "200+ курсов в UFA Academy, сертификация CFE и живые семинары.",
    href: "/education",
  },
  {
    icon: Lightbulb,
    title: "Каталог франшиз",
    text: "Найдите подходящую франшизу из 500+ вариантов в каталоге UFA.",
    href: "/franchise-opportunities",
  },
  {
    icon: TrendingUp,
    title: "Членство",
    text: "Станьте частью ассоциации — от 2.5 млн сум в год.",
    href: "/membership",
  },
];

export default function FranchisingOverviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-franchise.jpg"
          alt="Обзор франчайзинга"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Обзор франчайзинга: как работает франшиза
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Всё, что нужно знать о франчайзинге — от истории и базовой
            бизнес-модели до практических шагов по выбору и покупке франшизы в
            Узбекистане. Материал подготовлен экспертами UFA на основе
            международных стандартов IFA.
          </p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar left */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-[#F4F4F4] rounded-lg p-6 sticky top-24">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-4">
                  Раздел
                </h3>
                <nav className="space-y-1">
                  {sidebarLinks.map((link, i) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`block text-sm py-2 px-3 rounded transition-colors ${
                        i === 0
                          ? "bg-[#3ECF8E] text-white font-semibold"
                          : "text-[#020409] hover:bg-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 space-y-12">
              <div>
                <h2 className="section-heading green-underline mb-6">
                  История франчайзинга
                </h2>
                <p className="text-[#020409] text-sm leading-[1.8] mb-4 mt-6">
                  Франчайзинг как бизнес-модель зародился в середине XIX века в
                  США. Одним из первых франчайзеров считается компания Singer,
                  которая начала продавать лицензии на продажу швейных машин.
                  В XX веке модель получила широкое распространение благодаря
                  McDonald&apos;s, KFC и Holiday Inn.
                </p>
                <p className="text-[#020409] text-sm leading-[1.8]">
                  В Узбекистане франчайзинг активно развивается с начала
                  2010-х. Сегодня в стране работают более 500 франчайзинговых
                  брендов из 40+ стран, а также растёт количество локальных
                  сетей, выходящих на международный рынок.
                </p>
              </div>

              <div>
                <h2 className="section-heading green-underline mb-6">
                  Как работает франшиза
                </h2>
                <p className="text-[#020409] text-sm leading-[1.8] mb-6 mt-6">
                  Франчайзер разрабатывает успешную бизнес-модель и создаёт
                  систему, которую можно воспроизвести. Франчайзи приобретает
                  право на использование этой системы, выплачивая единовременный
                  паушальный взнос и регулярные роялти от выручки.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      n: "1",
                      title: "Паушальный взнос",
                      text: "Единовременный платёж за право использовать бренд, систему и ноу-хау.",
                    },
                    {
                      n: "2",
                      title: "Роялти",
                      text: "Регулярные отчисления от выручки — обычно 4–8% ежемесячно.",
                    },
                    {
                      n: "3",
                      title: "Поддержка",
                      text: "Обучение команды, маркетинговые материалы и операционная помощь от франчайзера.",
                    },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="flex items-start gap-4 bg-[#F4F4F4] rounded-lg p-5"
                    >
                      <div className="w-10 h-10 bg-[#3ECF8E] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        {item.n}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[#020409] text-sm leading-[1.8]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="section-heading green-underline mb-6">
                  Преимущества для франчайзи
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                  {[
                    "Проверенная бизнес-модель",
                    "Узнаваемый бренд с лояльной аудиторией",
                    "Обучение и методологическая поддержка",
                    "Снижение предпринимательского риска",
                    "Маркетинговая поддержка центрального офиса",
                    "Доступ к проверенным поставщикам",
                    "Сообщество опытных франчайзи",
                    "Возможность масштабирования",
                  ].map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-[#020409] text-sm leading-[1.8]"
                    >
                      <span className="w-2 h-2 bg-[#3ECF8E] rounded-full flex-shrink-0 mt-3" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="section-heading green-underline mb-6">
                  Как начать
                </h2>
                <div className="space-y-4 mt-6">
                  {[
                    "Исследование рынка и собственных интересов",
                    "Выбор франшизы и анализ FDD (Franchise Disclosure Document)",
                    "Разговоры с действующими франчайзи сети",
                    "Финансирование — накопления, кредит, партнёры",
                    "Подписание договора с юристом",
                    "Обучение от франчайзера и запуск точки",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="w-8 h-8 bg-[#3ECF8E] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-[#020409] text-sm leading-[1.8] pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="section-heading green-underline mb-6">
                  Регулирование в Узбекистане
                </h2>
                <p className="text-[#020409] text-sm leading-[1.8] mt-6">
                  Франчайзинг в Узбекистане регулируется Гражданским кодексом
                  (гл. 54 «Коммерческая концессия») и отдельными положениями
                  о защите товарных знаков. UFA работает над полноценным
                  отраслевым законом, который введёт стандарты раскрытия
                  информации (FDD) и защитит отношения сторон. Ознакомьтесь с
                  нашей дорожной картой в разделе «Адвокация».
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Рекомендуется к прочтению
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-white rounded-lg p-6 block hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                    {card.text}
                  </p>
                  <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                    Читать →
                  </span>
                </Link>
              );
            })}
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
            {exploreMore.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-[#F4F4F4] rounded-lg p-8 block hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
