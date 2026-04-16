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
    <section className="py-20 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-heading green-underline-center text-center mb-12">
          Как мы можем помочь вашему бизнесу?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.title}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#3ECF8E] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2332] mb-3">{col.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{col.description}</p>
                <Link
                  href={col.href}
                  className="inline-flex items-center gap-2 text-[#3ECF8E] font-medium text-sm"
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
