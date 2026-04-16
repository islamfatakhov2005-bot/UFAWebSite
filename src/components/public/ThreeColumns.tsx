import Link from "next/link";
import { Building2, Store, Package } from "lucide-react";

const types = [
  {
    icon: Building2,
    title: "Франчайзеры",
    description:
      "Для брендов, которые продают франшизы и развивают сеть. Лиды, исследования, маркетинг, юридическая поддержка.",
    href: "/membership",
  },
  {
    icon: Store,
    title: "Франчайзи",
    description:
      "Для владельцев одной или нескольких точек. Обучение, нетворкинг, аналитика и голос в отраслевой повестке.",
    href: "/membership",
  },
  {
    icon: Package,
    title: "Поставщики",
    description:
      "Для компаний, обслуживающих отрасль: юристы, IT, маркетинг, финансы. Прямой выход на лиц, принимающих решения.",
    href: "/membership",
  },
];

export default function ThreeColumns() {
  return (
    <section className="py-20 bg-[#F4F4F4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
            Членство UFA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2332] leading-[1.3]">
            Выберите тип членства, подходящий вам
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                href={type.href}
                className="group bg-white rounded-lg p-8 block hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#3ECF8E]" />
                </div>
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                  {type.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8] mb-6">
                  {type.description}
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
  );
}
