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
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2332] mb-4">
          ВМЕСТЕ РАЗВИВАЕМ ФРАНЧАЙЗИНГ
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
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
                className="group bg-white rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="w-14 h-14 bg-[#3ECF8E]/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[#3ECF8E]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A2332] mb-2 group-hover:text-[#3ECF8E] transition-colors">
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
