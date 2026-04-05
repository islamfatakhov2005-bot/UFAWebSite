import Link from "next/link";
import { GraduationCap, Calendar, Shield } from "lucide-react";

const columns = [
  {
    icon: GraduationCap,
    title: "Образование",
    description:
      "Обучающие программы, курсы и сертификация для франчайзеров и франчайзи. Развивайте навыки управления франшизой с экспертами отрасли.",
    href: "/education/courses",
  },
  {
    icon: Calendar,
    title: "Мероприятия",
    description:
      "Конференции, выставки и нетворкинг-сессии. Узнайте о последних трендах франчайзинга и найдите новых партнёров.",
    href: "/events",
  },
  {
    icon: Shield,
    title: "Поддержка",
    description:
      "Юридические консультации, помощь в финансировании и экспертная поддержка на каждом этапе развития вашей франшизы.",
    href: "/support/consulting",
  },
];

export default function ThreeColumns() {
  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2332] mb-3">{col.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{col.description}</p>
                <Link
                  href={col.href}
                  className="inline-flex items-center gap-2 text-[#2A9D6F] font-semibold text-sm hover:gap-3 transition-all duration-300"
                >
                  Узнать больше
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
