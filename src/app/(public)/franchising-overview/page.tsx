import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обзор франчайзинга — UFA",
  description: "Что такое франчайзинг? Узнайте, как работает франшиза, её преимущества и как начать.",
};

const sidebarLinks = [
  { label: "Что такое франшиза", href: "/franchising-overview#what" },
  { label: "Модель франчайзинга", href: "/franchising-overview#how" },
  { label: "Начало работы", href: "/franchising-overview#start" },
  { label: "Типы инвестиций", href: "/franchise-opportunities" },
  { label: "Плюсы и минусы", href: "/franchising-overview#benefits" },
  { label: "Финансирование", href: "/franchise-opportunities" },
  { label: "Глоссарий терминов", href: "/education" },
];

const learnMoreCards = [
  {
    icon: BookOpen,
    title: "Образование",
    description: "Программы обучения и сертификации для франчайзеров и франчайзи.",
    href: "/education",
  },
  {
    icon: Lightbulb,
    title: "Возможности",
    description: "Найдите подходящую франшизу из нашего каталога.",
    href: "/franchise-opportunities",
  },
  {
    icon: TrendingUp,
    title: "Членство",
    description: "Присоединяйтесь к UFA и развивайте бизнес вместе с нами.",
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
          alt="Франчайзинг"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Обзор франчайзинга: как работает франшиза?
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            Всё, что нужно знать о франчайзинге — от основ до практических шагов
            по запуску собственного бизнеса.
          </p>
          <Link href="/franchise-opportunities" className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25">Найти франшизу</Link>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content (70%) */}
            <div className="lg:w-[70%] space-y-12">
              <div id="what">
                <h2 className="text-2xl font-extrabold text-[#1A2332] mb-4">
                  Что такое франчайзинг?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Франчайзинг — это бизнес-модель, при которой владелец бренда
                  (франчайзер) предоставляет другому предпринимателю (франчайзи)
                  право использовать свою торговую марку, бизнес-процессы и
                  ноу-хау в обмен на вознаграждение.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Эта модель позволяет быстро масштабировать успешный бизнес,
                  одновременно снижая риски для новых предпринимателей, которые
                  получают проверенную систему ведения бизнеса.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#1A2332] mb-4">
                  История франчайзинга
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Франчайзинг как бизнес-модель зародился в середине XIX века в
                  США. Одним из первых франчайзеров считается компания Singer,
                  которая начала продавать лицензии на продажу швейных машин.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  В XX веке франчайзинг получил широкое распространение благодаря
                  таким компаниям, как McDonald&apos;s, KFC и Holiday Inn. Сегодня
                  франчайзинг является одной из самых популярных бизнес-моделей в
                  мире, генерируя триллионы долларов ежегодного оборота.
                </p>
              </div>

              <div id="how">
                <h2 className="text-2xl font-extrabold text-[#1A2332] mb-4">
                  Как работает франшиза?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Франчайзер разрабатывает успешную бизнес-модель и создаёт
                  систему, которую можно воспроизвести. Франчайзи приобретает
                  право на использование этой системы, выплачивая паушальный
                  взнос и регулярные роялти.
                </p>
                <div className="bg-[#f5f7fa] rounded-xl p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      1
                    </span>
                    <p className="text-gray-700">
                      <strong>Паушальный взнос</strong> — единовременный платёж за
                      право использования бренда.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      2
                    </span>
                    <p className="text-gray-700">
                      <strong>Роялти</strong> — регулярные отчисления от выручки
                      (обычно 4-8%).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      3
                    </span>
                    <p className="text-gray-700">
                      <strong>Поддержка</strong> — обучение, маркетинг и
                      операционная помощь от франчайзера.
                    </p>
                  </div>
                </div>
              </div>

              <div id="benefits">
                <h2 className="text-2xl font-extrabold text-[#1A2332] mb-4">
                  Преимущества для франчайзи
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Проверенная бизнес-модель",
                    "Узнаваемый бренд",
                    "Обучение и поддержка",
                    "Снижение рисков",
                    "Маркетинговая поддержка",
                    "Доступ к поставщикам",
                    "Сообщество франчайзи",
                    "Масштабируемость",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#3ECF8E] rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div id="start">
                <h2 className="text-2xl font-extrabold text-[#1A2332] mb-4">
                  Как начать?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "Исследование",
                      desc: "Изучите рынок франшиз, определите свои интересы и бюджет.",
                    },
                    {
                      step: "Выбор франшизы",
                      desc: "Сравните варианты, изучите условия и поговорите с действующими франчайзи.",
                    },
                    {
                      step: "Финансирование",
                      desc: "Подготовьте инвестиции, рассмотрите варианты кредитования.",
                    },
                    {
                      step: "Подписание договора",
                      desc: "Внимательно изучите договор франчайзинга с юристом.",
                    },
                    {
                      step: "Обучение и запуск",
                      desc: "Пройдите обучение от франчайзера и откройте свой бизнес.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="w-10 h-10 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-[#1A2332]">{item.step}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (30%) */}
            <div className="lg:w-[30%]">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-[#1A2332] mb-4">
                  Навигация
                </h3>
                <nav className="space-y-2">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-gray-600 hover:text-[#3ECF8E] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#3ECF8E]/5"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Cards */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-12">
            Узнать больше
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learnMoreCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-[#3ECF8E] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
