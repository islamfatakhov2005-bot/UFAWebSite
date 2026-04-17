"use client";

import Link from "next/link";
import Image from "next/image";

const footerNav = [
  {
    title: "О UFA",
    links: [
      { label: "Об ассоциации", href: "/about" },
      { label: "Фонд UFA", href: "/foundation" },
      { label: "Карьера", href: "/careers" },
      { label: "Контакты", href: "/contact" },
      { label: "Медиа-кит", href: "/media-kit" },
    ],
  },
  {
    title: "Что такое франчайзинг",
    links: [
      { label: "Обзор франчайзинга", href: "/franchising-overview" },
      { label: "Начало работы", href: "/franchising-overview/getting-started" },
      { label: "Финансирование", href: "/franchising-overview/funding" },
      { label: "Каталог франшиз", href: "/franchise-opportunities" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Новости", href: "/news" },
      { label: "Мероприятия", href: "/events" },
      { label: "Образование", href: "/education" },
      { label: "Программы", href: "/programs" },
      { label: "Влияние отрасли", href: "/impact" },
    ],
  },
  {
    title: "Вступление",
    links: [
      { label: "Обзор членства", href: "/membership" },
      { label: "Для франчайзеров", href: "/membership/franchisors" },
      { label: "Для франчайзи", href: "/membership/franchisees" },
      { label: "Для поставщиков", href: "/membership/suppliers" },
      { label: "Подать заявку", href: "/registration" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B2645] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Image
              src="/logos/logo.png"
              alt="UFA"
              width={140}
              height={42}
              className="h-10 w-auto object-contain brightness-200 mb-5"
            />
            <p className="text-[13px] text-white/70 leading-[1.7] max-w-sm mb-6">
              Ассоциация Франчайзинга Узбекистана — ведущая организация по
              развитию франчайзинга в стране. 1200+ участников, 500+ брендов,
              14 регионов.
            </p>
            <div className="space-y-1.5 text-[13px] text-white/80">
              <p>г. Ташкент, ул. Амира Темура, 107Б</p>
              <p>
                <a href="tel:+998992008272" className="hover:text-[#3ECF8E]">
                  +998 99 200 8272
                </a>
              </p>
              <p>
                <a href="mailto:info@uzfranchise.uz" className="hover:text-[#3ECF8E]">
                  info@uzfranchise.uz
                </a>
              </p>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white mb-5">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/70 hover:text-[#3ECF8E] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/50">
            © 2026 Uzbekistan Franchising Association. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-[12px]">
            <Link href="/terms" className="text-white/50 hover:text-white transition-colors">
              Условия использования
            </Link>
            <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
