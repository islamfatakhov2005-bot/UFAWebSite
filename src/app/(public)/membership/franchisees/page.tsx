import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Членство для франчайзи",
  description: "Преимущества членства UFA для владельцев одной или нескольких точек — обучение, нетворкинг, аналитика, юридическая поддержка.",
};

const tiers = [
  {
    name: "Системное членство",
    price: "Бесплатно",
    description: "Доступно всем франчайзи, чей бренд является членом UFA",
    features: [
      "Доступ к базовой аналитике и новостям",
      "Участие в открытых мероприятиях",
      "Рассылка UFA Weekly",
      "Скидки от партнёров-поставщиков",
    ],
  },
  {
    
    price: "2 500 000",
    description: "Для владельцев одной точки",
    features: [
      "Доступ к UFA Academy и базе знаний",
      "Участие в региональных нетворкингах",
      "Программа менторства FranShip",
      "Консультации юридического центра",
      "Скидки до 40% на мероприятия UFA",
    ],
    featured: true,
  },
  {
    name: "Multi-unit (2-9 точек)",
    price: "5 500 000",
    description: "Для владельцев нескольких точек одного или разных брендов",
    features: [
      "Всё из Single-unit",
      "Доступ в Multi-Unit Council",
      "Индивидуальные консультации",
      "Приоритет в CFE программе",
      "Закрытые встречи с регуляторами",
    ],
  },
  {
    name: "Multi-unit (10+ точек)",
    price: "11 000 000",
    description: "Для крупных операторов сетей",
    features: [
      "Всё из Multi-unit (2-9)",
      "Персональный менеджер",
      "Доступ в Leaders Forum",
      "Участие в Advocacy Summit как спикер",
      "Прямой доступ к руководству UFA",
    ],
  },
];

const benefits = [
  {
    title: "Обучение",
    items: [
      "UFA Academy — 200+ курсов для всех ролей в вашей точке",
      "Живые семинары по операциям, HR и финансам",
      "Сертификация Foundations для управляющих",
      "Программа лидерства для собственников",
    ],
  },
  {
    title: "Сообщество",
    items: [
      "Региональные сети UFA — встречи в вашем городе",
      "Программа FranShip — менторство от опытных франчайзи",
      "Клубы по интересам: F&B, ритейл, услуги",
      "Ежегодная конвенция в Ташкенте",
    ],
  },
  {
    title: "Поддержка",
    items: [
      "Юридический центр — консультации по договорам",
      "Помощь в медиации споров с франчайзером",
      "Налоговые консультации по оптимизации",
      "Hotline в кризисных ситуациях",
    ],
  },
  {
    title: "Голос в отрасли",
    items: [
      "Участие в опросах Franchisee Survey",
      "Возможность выступления в Advocacy Summit",
      "Включение в рабочие группы по регулированию",
      "Прямая обратная связь руководству UFA",
    ],
  },
];

const team = [
  { role: "Менеджер для франчайзи", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Координатор программ", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Специалист поддержки", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
];

export default function FranchiseesMembershipPage() {
  return (
    <>
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-membership.jpg"
          alt="Членство для франчайзи"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/75" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.2] mb-4">
            Членство для франчайзи
          </h1>
          <div className="w-16 h-1 bg-[#3ECF8E] mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/90 leading-[1.7] mb-8 max-w-3xl mx-auto">
            Для владельцев одной или нескольких точек. Обучение, сообщество,
            юридическая поддержка и возможность влиять на будущее отрасли.
          </p>
          <Link
            href="/membership/apply"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Подать заявку
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Тарифы для франчайзи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-lg p-6 flex flex-col ${
                  tier.featured
                    ? "bg-[#0B2645] text-white relative"
                    : "bg-[#F4F4F4]"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-white text-xs font-bold uppercase tracking-[0.08em] px-3 py-1 rounded">
                    Популярный
                  </div>
                )}
                <p
                  className={`text-xs leading-[1.7] mb-4 ${
                    tier.featured ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span
                    className={`text-2xl font-bold ${
                      tier.featured ? "text-[#3ECF8E]" : "text-[#0B2645]"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.price !== "Бесплатно" && (
                    <span
                      className={`text-sm ml-2 ${
                        tier.featured ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      сум / год
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`text-xs leading-[1.7] pl-4 relative ${
                        tier.featured ? "text-white/90" : "text-[#020409]"
                      }`}
                    >
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-[#3ECF8E] rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/membership/apply"
                  className={`block text-center py-3 rounded font-bold text-xs uppercase tracking-[0.08em] transition-colors ${
                    tier.featured
                      ? "bg-[#3ECF8E] text-white hover:bg-[#35B67A]"
                      : "border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white"
                  }`}
                >
                  Подать заявку
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Что даёт членство
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((cat) => (
              <div key={cat.title} className="bg-white rounded-lg p-8">
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-4">
                  {cat.title}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[#020409] text-sm leading-[1.8]"
                    >
                      <span className="w-2 h-2 bg-[#3ECF8E] rounded-full flex-shrink-0 mt-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Контакты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.email}
                className="bg-[#F4F4F4] rounded-lg p-6"
              >
                <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                  {person.role}
                </p>
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${person.email}`}
                    className="block text-[#3ECF8E] hover:underline"
                  >
                    {person.email}
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="block text-gray-600 hover:text-[#3ECF8E] transition-colors"
                  >
                    {person.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
