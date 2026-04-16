import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Users, Megaphone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Об Ассоциации",
  description: "Ассоциация Франчайзинга Узбекистана — организация, представляющая и развивающая франчайзинг в Узбекистане с 2019 года.",
};

const pillars = [
  {
    icon: GraduationCap,
    title: "Образование",
    text: "Мы — источник новостей, ресурсов, профессионального развития, проверенных предложений и аккредитованных программ для франчайзингового сообщества Узбекистана.",
  },
  {
    icon: Users,
    title: "Сотрудничество",
    text: "Мы объединяем франчайзинговое сообщество для обучения, совместной работы и партнёрства ради роста. UFA — мощная сеть и инфраструктура, на которую могут опираться члены ассоциации.",
  },
  {
    icon: Megaphone,
    title: "Адвокация",
    text: "Важно, чтобы лица, принимающие решения, понимали ценность отрасли. Мы вместе с вами рассказываем позитивную историю франчайзинга законодателям, регуляторам и СМИ, чтобы влиять на политику и защищать бизнес-модель.",
  },
];

const milestones = [
  { year: "2019", event: "Основание Ассоциации Франчайзинга Узбекистана" },
  { year: "2020", event: "Первая Franchise Expo Tashkent — 50 участников" },
  { year: "2021", event: "Подписание меморандума с Международной Ассоциацией Франчайзинга (IFA)" },
  { year: "2022", event: "Запуск образовательной программы CFE (Certified Franchise Executive)" },
  { year: "2023", event: "Количество участников превышает 500" },
  { year: "2024", event: "Franchise Expo Tashkent 2024 — 150 брендов, 3000 посетителей" },
  { year: "2025", event: "Международное признание — членство в World Franchise Council" },
  { year: "2026", event: "Более 1200 участников, 500+ франшиз в каталоге" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-about.jpg"
          alt="Офис ассоциации"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1A2332]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-6" style={{ fontSize: "1.5rem" }}>
            Об Ассоциации
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Ассоциация Франчайзинга Узбекистана (UFA) — старейшая и крупнейшая организация,
            представляющая франчайзинг в стране. Через практическое образование, мероприятия мирового
            уровня и эффективную адвокацию, UFA предлагает поддерживающее членское сообщество,
            которое помогает франчайзи, франчайзерам и поставщикам учиться, лидировать и преуспевать
            во франчайзинге в более чем 300 отраслях.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="#leadership"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#1A2332] px-8 py-3 rounded font-semibold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Руководство UFA
            </Link>
            <Link
              href="#team"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#1A2332] px-8 py-3 rounded font-semibold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Команда UFA
            </Link>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#020409] text-lg leading-[1.8]">
            Вместе с вами UFA помогает людям разного происхождения и опыта строить собственный бизнес,
            создавать финансовую стабильность и успех, и поддерживать свои сообщества.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">{pillar.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interested in Joining */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            Интересно присоединиться?
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mb-8">
            Узнайте больше обо всех способах, которыми членство в UFA может помочь вам развивать
            компанию, расширять знания и становиться частью поддерживающего сообщества.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Изучить членство
          </Link>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-16">
            История UFA
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-[#3ECF8E]" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-8 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-white rounded-lg p-5 shadow-sm inline-block max-w-sm">
                      <span className="text-sm font-bold text-[#3ECF8E]">{m.year}</span>
                      <p className="text-[#020409] text-sm leading-[1.8] mt-1">{m.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#3ECF8E] rounded-full border-4 border-white z-10 flex-shrink-0" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paving the way */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            Путь к предпринимательству
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8]">
            Мы гораздо больше, чем просто некоммерческая профессиональная организация. UFA — это
            глобальный ресурс, который защищает интересы членов и их бизнесов, неустанно работая над
            продвижением будущего франчайзинга. Каждый членский взнос идёт на развитие отрасли, мы
            поддерживаем критически важный экономический двигатель и предоставляем инструменты и
            ресурсы для того, чтобы франчайзинговое сообщество воплощало свои мечты.
          </p>
        </div>
      </section>
    </>
  );
}
