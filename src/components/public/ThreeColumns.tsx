import Link from "next/link";
import { Building2, Store, Package } from "lucide-react";

const types = [
  {
    icon: Building2,
    title: "Франчайзеры",
    description:
      "Для брендов, которые продают франшизы и развивают сеть. Лиды, исследования, маркетинг, юридическая поддержка.",
    href: "/membership/franchisors",
  },
  {
    icon: Store,
    title: "Франчайзи",
    description:
      "Для владельцев одной или нескольких точек. Обучение, нетворкинг, аналитика и голос в отраслевой повестке.",
    href: "/membership/franchisees",
  },
  {
    icon: Package,
    title: "Поставщики",
    description:
      "Для компаний, обслуживающих отрасль: юристы, IT, маркетинг, финансы. Прямой выход на лиц, принимающих решения.",
    href: "/membership/suppliers",
  },
];

export default function ThreeColumns() {
  return (
    <section className="py-20 bg-[#F5F6F8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="eyebrow text-[#3ECF8E] mb-3">Членство UFA</span>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0B2645] leading-[1.15] tracking-[-0.01em] mt-2">
            Выберите тип членства, подходящий вам
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                href={type.href}
                className="card card-hover p-8 block"
              >
                <div className="w-14 h-14 bg-[#F5F6F8] rounded-[3px] flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#3ECF8E]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2645] mb-3 leading-[1.25]">
                  {type.title}
                </h3>
                <p className="text-[15px] text-[#4A5568] leading-[1.65] mb-6">
                  {type.description}
                </p>
                <span className="text-[#2A9D6F] text-[13px] font-bold uppercase tracking-[0.06em] hover:underline">
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
