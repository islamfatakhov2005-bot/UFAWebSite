import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";

export interface EventSection {
  title: string;
  items: string[];
}

export interface EventResource {
  title: string;
  text: string;
  href: string;
  cta?: string;
}

export interface EventContact {
  name?: string;
  role: string;
  email: string;
  phone: string;
}

interface EventPageLayoutProps {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  meta: {
    date: string;
    location: string;
    audience: string;
  };
  intro: string;
  sections: EventSection[];
  resources?: EventResource[];
  contacts?: EventContact[];
  cta?: {
    title: string;
    text: string;
    buttonText: string;
    buttonHref: string;
  };
}

export default function EventPageLayout({
  hero,
  meta,
  intro,
  sections,
  resources,
  contacts,
  cta,
}: EventPageLayoutProps) {
  return (
    <>
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/80" />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-[30px] md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-[-0.01em] mb-4">
            {hero.title}
          </h1>
          <div className="w-12 h-[2px] bg-[#3ECF8E] mx-auto mb-6" />
          <p className="text-base md:text-lg text-white/85 leading-[1.65] max-w-2xl mx-auto">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-[#0B2645] py-6 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#3ECF8E]" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/60 font-bold mb-0.5">
                  Даты
                </p>
                <p className="text-sm font-semibold">{meta.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#3ECF8E]" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/60 font-bold mb-0.5">
                  Место
                </p>
                <p className="text-sm font-semibold">{meta.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#3ECF8E]" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/60 font-bold mb-0.5">
                  Аудитория
                </p>
                <p className="text-sm font-semibold">{meta.audience}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-[#4A5568] text-base leading-[1.75] mb-12">
            {intro}
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl md:text-2xl font-extrabold text-[#0B2645] mb-4 tracking-[-0.01em]">
                  {section.title}
                </h2>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-[#0B2645] leading-[1.65]"
                    >
                      <span className="w-1.5 h-1.5 bg-[#3ECF8E] flex-shrink-0 mt-[10px]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {resources && resources.length > 0 && (
        <section className="py-16 bg-[#F5F6F8]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2645] text-center mb-10 tracking-[-0.01em]">
              Ресурсы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((r) => (
                <Link
                  key={r.title}
                  href={r.href}
                  className="card card-hover p-6 block group"
                >
                  <h3 className="text-base font-bold text-[#0B2645] mb-2 group-hover:text-[#3ECF8E] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-[1.65] mb-4">
                    {r.text}
                  </p>
                  <span className="text-[#2A9D6F] text-[13px] font-bold uppercase tracking-[0.06em] group-hover:underline">
                    {r.cta || "Подробнее"} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="py-16 bg-[#0B2645]">
          <div className="max-w-[900px] mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-[-0.01em]">
              {cta.title}
            </h2>
            <p className="text-white/80 text-base leading-[1.7] mb-8 max-w-xl mx-auto">
              {cta.text}
            </p>
            <Link href={cta.buttonHref} className="btn btn-primary">
              {cta.buttonText}
            </Link>
          </div>
        </section>
      )}

      {contacts && contacts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2645] text-center mb-10 tracking-[-0.01em]">
              Контакты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((p) => (
                <div key={p.email} className="card p-6">
                  <h3 className="text-base font-bold text-[#0B2645] mb-3">
                    {p.role}
                  </h3>
                  <div className="space-y-1 text-[13px]">
                    <a
                      href={`mailto:${p.email}`}
                      className="block text-[#2A9D6F] hover:underline"
                    >
                      {p.email}
                    </a>
                    <a
                      href={`tel:${p.phone.replace(/\s/g, "")}`}
                      className="block text-[#4A5568] hover:text-[#3ECF8E]"
                    >
                      {p.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
