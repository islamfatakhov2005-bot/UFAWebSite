import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  GraduationCap,
  Users,
  Globe,
  MapPin,
  MessageSquare,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Программы и сообщество — UFA",
  description:
    "Менторство, стипендии, международное расширение и другие программы Ассоциации Франчайзинга Узбекистана.",
};

const programs = [
  {
    icon: HeartHandshake,
    title: "Менторство",
    description:
      "Программа наставничества, в которой опытные франчайзеры делятся знаниями с начинающими предпринимателями. Индивидуальное сопровождение на каждом этапе запуска и развития франшизы.",
    color: "from-[#3ECF8E] to-[#2DB87A]",
  },
  {
    icon: GraduationCap,
    title: "Стипендии",
    description:
      "Стипендиальная программа UFA для талантливых предпринимателей. Покрытие расходов на обучение, сертификацию CFE и участие в международных мероприятиях.",
    color: "from-[#4AADAD] to-[#3A9999]",
  },
  {
    icon: Users,
    title: "Женщины во франчайзинге",
    description:
      "Программа поддержки женского предпринимательства в сфере франчайзинга. Нетворкинг, обучение, менторство и доступ к финансированию для женщин-предпринимателей.",
    color: "from-[#3ECF8E] to-[#4AADAD]",
  },
  {
    icon: Globe,
    title: "Международное расширение",
    description:
      "Помощь узбекским франшизам в выходе на международные рынки и привлечение зарубежных брендов в Узбекистан. Партнёрство с международными ассоциациями франчайзинга.",
    color: "from-[#2D3748] to-[#4AADAD]",
  },
  {
    icon: MapPin,
    title: "Региональные сети",
    description:
      "Развитие франчайзинга в регионах Узбекистана. Создание региональных хабов для поддержки предпринимателей за пределами Ташкента — в Самарканде, Бухаре, Намангане и других городах.",
    color: "from-[#3ECF8E] to-[#2D3748]",
  },
  {
    icon: MessageSquare,
    title: "Комитеты и форумы",
    description:
      "Отраслевые комитеты и дискуссионные форумы для обсуждения ключевых вопросов индустрии. Площадка для диалога между бизнесом, экспертами и государством.",
    color: "from-[#4AADAD] to-[#3ECF8E]",
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Программы и сообщество
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
            UFA создаёт экосистему поддержки для всех участников
            франчайзингового рынка — от начинающих предпринимателей до крупных
            международных сетей.
          </p>
          <Link href="#programs" className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25">Выбрать программу</Link>
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
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {program.description}
                  </p>
                  <span className="text-[#2A9D6F] font-semibold text-sm mt-3">Узнать больше →</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "150+", label: "Менторских пар" },
              { value: "40+", label: "Стипендиатов" },
              { value: "12", label: "Региональных хабов" },
              { value: "25+", label: "Международных партнёров" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#1A2332] green-underline-center text-center mb-12">
            Как присоединиться
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: "Станьте членом UFA",
                desc: "Выберите подходящий тариф членства и зарегистрируйтесь.",
              },
              {
                step: "Выберите программу",
                desc: "Ознакомьтесь с доступными программами и подайте заявку.",
              },
              {
                step: "Участвуйте",
                desc: "Активно участвуйте в мероприятиях, обучении и нетворкинге.",
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
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#1A2332] mb-4">
            Присоединяйтесь к сообществу
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Станьте частью крупнейшего франчайзингового сообщества в
            Узбекистане. Вместе мы развиваем индустрию и создаём возможности.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
            >
              Стать участником
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-[#3ECF8E] text-[#3ECF8E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#3ECF8E]/5 transition-colors"
            >
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
