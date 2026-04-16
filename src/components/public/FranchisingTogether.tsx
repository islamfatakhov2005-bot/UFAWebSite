import Link from "next/link";
import { GraduationCap, Users, Megaphone } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    title: "Образование",
    description:
      "Практическое обучение, сертификация CFE, UFA Academy с 200+ курсами и живые семинары для всего франчайзингового сообщества.",
    href: "/education",
    cta: "Изучить программы",
  },
  {
    icon: Users,
    title: "Сотрудничество",
    description:
      "Мы объединяем франчайзеров, франчайзи и поставщиков в одно сообщество. 1200+ участников, 10 региональных сетей, 12 программ.",
    href: "/programs",
    cta: "Наши сообщества",
  },
  {
    icon: Megaphone,
    title: "Адвокация",
    description:
      "Голос франчайзинга в Олий Мажлисе и министерствах. Законодательные инициативы, налоговые льготы, защита отношений франчайзинга.",
    href: "/advocacy",
    cta: "Наши приоритеты",
  },
];

export default function FranchisingTogether() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
            Франчайзинг вместе
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645] max-w-3xl mx-auto leading-[1.3]">
            UFA помогает людям строить собственный бизнес и поддерживать свои сообщества
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col"
              >
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#3ECF8E]" />
                </div>
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8] mb-6 flex-1">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] hover:underline"
                >
                  {pillar.cta} →
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/membership"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Вступить в UFA
          </Link>
        </div>
      </div>
    </section>
  );
}
