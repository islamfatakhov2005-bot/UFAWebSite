import Link from "next/link";
import { Users, Shield, GraduationCap, Calendar } from "lucide-react";

const ctaBoxes = [
  {
    icon: Users,
    title: "Членство",
    description: "Станьте частью крупнейшего сообщества",
    href: "/membership",
  },
  {
    icon: Shield,
    title: "Поддержка",
    description: "Защита интересов франчайзинга",
    href: "/support",
  },
  {
    icon: GraduationCap,
    title: "Образование",
    description: "Программы обучения мирового уровня",
    href: "/education",
  },
  {
    icon: Calendar,
    title: "Мероприятия",
    description: "Конференции и выставки",
    href: "/events",
  },
];

export default function FranchisingTogether() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="section-heading green-underline-center text-center mb-2">
          Мы развиваем франчайзинг вместе
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mb-12 font-normal">
          Узбекская Ассоциация Франчайзинга объединяет бренды, предпринимателей и
          экспертов для развития франчайзинга в Узбекистане
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ctaBoxes.map((box) => {
            const Icon = box.icon;
            return (
              <Link
                key={box.title}
                href={box.href}
                className="group bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="w-14 h-14 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[#3ECF8E]" />
                </div>
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-2">
                  {box.title}
                </h3>
                <p className="text-sm text-gray-500">{box.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
