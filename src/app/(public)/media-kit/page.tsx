import Image from "next/image";
import Link from "next/link";
import { Download, FileText, Image as ImageIcon, Palette } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Медиа-кит",
  description: "Логотип, фирменный стиль, ключевые факты и пресс-материалы Ассоциации Франчайзинга Узбекистана для журналистов и партнёров.",
};

const resources = [
  {
    icon: ImageIcon,
    title: "Логотип",
    text: "Полный набор логотипов UFA: цветной, монохромный, инверсный. Форматы PNG, SVG, AI.",
    cta: "Скачать ZIP",
    href: "/media/ufa-logo-pack.zip",
  },
  {
    icon: Palette,
    title: "Бренд-гайд",
    text: "Фирменный стиль UFA: цвета, шрифты, правила использования логотипа, тональность коммуникаций.",
    cta: "Открыть PDF",
    href: "/media/ufa-brand-guide.pdf",
  },
  {
    icon: FileText,
    title: "Пресс-кит",
    text: "Ключевые факты об ассоциации, статистика отрасли, биографии руководителей и готовые цитаты.",
    cta: "Открыть PDF",
    href: "/media/ufa-press-kit.pdf",
  },
  {
    icon: Download,
    title: "Отчёт Impact 2026",
    text: "Актуальный отчёт о влиянии франчайзинга на экономику Узбекистана: 28 страниц, инфографика, диаграммы.",
    cta: "Скачать PDF",
    href: "/media/ufa-impact-2026.pdf",
  },
];

const facts = [
  { label: "Основана", value: "2019" },
  { label: "Участников", value: "1 200+" },
  { label: "Брендов в каталоге", value: "500+" },
  { label: "Регионов", value: "14" },
  { label: "Отраслей", value: "300+" },
  { label: "Мероприятий в год", value: "60+" },
];

const contacts = [
  {
    role: "Руководитель PR и коммуникаций",
    email: "press@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
  {
    
    role: "Менеджер по СМИ",
    email: "media@uzfranchise.uz",
    phone: "+998 99 200 8272",
  },
];

export default function MediaKitPage() {
  return (
    <>
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-news.jpg"
          alt="Медиа-кит UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/75" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.2] mb-4">
            Медиа-кит
          </h1>
          <div className="w-16 h-1 bg-[#3ECF8E] mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/90 leading-[1.7] max-w-3xl mx-auto">
            Всё необходимое для корректного упоминания UFA в СМИ, статьях и
            партнёрских материалах — логотипы, цвета, ключевые факты и
            контакты пресс-службы.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Материалы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.title}
                  href={r.href}
                  className="group bg-[#F4F4F4] rounded-lg p-8 block hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {r.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                    {r.text}
                  </p>
                  <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                    {r.cta} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Ключевые факты
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="bg-white rounded-lg p-6 text-center"
              >
                <div className="text-3xl font-bold text-[#3ECF8E] mb-2">
                  {fact.value}
                </div>
                <p className="text-xs text-[#020409] uppercase tracking-[0.08em] leading-[1.5]">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Пресс-служба
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map((person) => (
              <div
                key={person.email}
                className="bg-[#F4F4F4] rounded-lg p-8"
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
