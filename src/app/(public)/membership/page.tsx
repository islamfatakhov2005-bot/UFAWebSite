import Image from "next/image";
import { Check, Star, Zap, Crown } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Членство в UFA — Тарифы и преимущества",
  description: "Станьте членом Ассоциации Франчайзинга Узбекистана. Тарифы от 2.5 млн сум/год. Доступ к каталогу франшиз, мероприятиям, консультациям.",
};

const benefits = [
  "Доступ к каталогу франшиз и базе данных UFA",
  "Приоритетное участие в мероприятиях и выставках",
  "Экспертные консультации по франчайзингу",
  "Юридическая поддержка и шаблоны договоров",
  "Доступ к программам обучения и сертификации",
  "Нетворкинг с лидерами отрасли",
  "Размещение в каталоге UFA и на сайте",
  "Скидки на мероприятия партнёров",
  "Ежемесячная аналитика рынка",
  "Участие в рабочих группах и комитетах",
];

const plans = [
  {
    name: "Базовый",
    icon: Star,
    price: "2 500 000",
    period: "сум / год",
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
    icon: Zap,
    price: "7 500 000",
    period: "сум / год",
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
    icon: Crown,
    price: "25 000 000",
    period: "сум / год",
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

export default function MembershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-membership.jpg"
          alt="Команда UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-[-0.02em]">
            Членство в UFA
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Присоединяйтесь к крупнейшему сообществу франчайзинга в Узбекистане и
            получите доступ к уникальным ресурсам, экспертизе и возможностям.
          </p>
          <Link
            href="#plans"
            className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
          >
            Выбрать тариф ↓
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-12">
            Преимущества членства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#3ECF8E]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#3ECF8E]" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-4">
            Тарифные планы
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            66% участников выбирают Профессиональный тариф
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`rounded-xl p-8 transition-all duration-300 ${
                    plan.featured
                      ? "bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] text-white ring-4 ring-[#3ECF8E]/30 scale-[1.03] shadow-lg relative"
                      : "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                      Рекомендуемый
                    </div>
                  )}
                  <Icon
                    className={`w-8 h-8 mb-4 ${plan.featured ? "text-white" : "text-[#3ECF8E]"}`}
                  />
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      plan.featured ? "text-white" : "text-[#1A2332]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 ${
                      plan.featured ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span
                      className={`text-3xl font-extrabold ${
                        plan.featured ? "text-white" : "text-[#1A2332]"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ml-1 ${
                        plan.featured ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            plan.featured ? "text-white" : "text-[#3ECF8E]"
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#join"
                    className={`block text-center py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      plan.featured
                        ? "bg-white text-[#1A2332] hover:bg-gray-100 shadow-sm"
                        : "border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white"
                    }`}
                  >
                    Начать моё членство
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join" className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#1A2332] mb-4">
            Готовы начать?
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Свяжитесь с нами, и наша команда поможет подобрать оптимальный тариф
            и ответит на все ваши вопросы о членстве в UFA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
            >
              Получить консультацию
            </Link>
            <a
              href="tel:+998712345678"
              className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#3ECF8E]/5 transition-colors"
            >
              +998 71 234 56 78
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Бесплатная консультация · Без обязательств · Ответим в течение 24 часов
          </p>
        </div>
      </section>
    </>
  );
}
