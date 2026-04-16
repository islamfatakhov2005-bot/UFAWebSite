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
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="eyebrow text-[#3ECF8E] mb-4">Франчайзинг вместе</span>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0B2645] max-w-3xl mx-auto leading-[1.15] tracking-[-0.01em] mt-3">
            UFA помогает людям строить собственный бизнес и поддерживать свои сообщества
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="card card-hover p-8 flex flex-col"
              >
                <div className="w-14 h-14 bg-[#F5F6F8] rounded-[3px] flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#3ECF8E]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B2645] mb-3 leading-[1.25]">
                  {pillar.title}
                </h3>
                <p className="text-[15px] text-[#4A5568] leading-[1.65] mb-6 flex-1">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  className="text-[#2A9D6F] text-[13px] font-bold uppercase tracking-[0.06em] hover:underline"
                >
                  {pillar.cta} →
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link href="/membership" className="btn btn-primary">
            Вступить в UFA
          </Link>
        </div>
      </div>
    </section>
  );
}
