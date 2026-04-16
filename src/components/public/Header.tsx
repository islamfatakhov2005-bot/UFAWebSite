"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { SearchTrigger } from "./SearchDialog";

const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  "Что такое франчайзинг?": [
    {
      title: "Основы",
      links: [
        { label: "Обзор франчайзинга", href: "/franchising-overview" },
        { label: "Каталог франшиз", href: "/franchise-opportunities" },
      ],
    },
  ],
  "Новости и исследования": [
    {
      title: "Новости",
      links: [
        { label: "Последние новости", href: "/news" },
      ],
    },
  ],
  "Мероприятия": [
    {
      title: "Календарь",
      links: [
        { label: "Предстоящие мероприятия", href: "/events" },
      ],
    },
  ],
  "Образование": [
    {
      title: "Программы",
      links: [
        { label: "Образование и развитие", href: "/education" },
      ],
    },
  ],
  "Поддержка и развитие": [
    {
      title: "Ресурсы",
      links: [
        { label: "Поддержка и защита интересов", href: "/advocacy" },
        { label: "Кодекс этики", href: "/code-of-ethics" },
      ],
    },
  ],
  "Программы и сообщество": [
    {
      title: "Программы",
      links: [
        { label: "Программы и сообщество", href: "/programs" },
      ],
    },
  ],
  "Членство": [
    {
      title: "Информация",
      links: [
        { label: "Преимущества членства", href: "/membership" },
        { label: "Контакты", href: "/contact" },
      ],
    },
  ],
};

const navItems = Object.keys(megaMenuData);

function isMenuActive(menuKey: string, pathname: string): boolean {
  const sections = megaMenuData[menuKey];
  return sections.some((section) =>
    section.links.some((link) => pathname === link.href || pathname.startsWith(link.href + "/"))
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-[var(--shadow-header)] bg-white/90 backdrop-blur-xl"
          : "bg-white"
      }`}
    >
      {/* Utility bar */}
      <div className="bg-[#1A2332] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="hover:text-[#3ECF8E] transition-colors">
              О нас
            </Link>
            <Link href="/about#ufa" className="hover:text-[#3ECF8E] transition-colors">
              О UFA
            </Link>
            <Link href="/news" className="hover:text-[#3ECF8E] transition-colors">
              Медиа
            </Link>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <SearchTrigger />
            <Link href="/admin/login" className="hover:text-[#3ECF8E] transition-colors">
              Войти
            </Link>
            <Link
              href="/membership"
              className="bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-4 py-1.5 rounded text-xs font-semibold transition-colors"
            >
              Вступить в UFA
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`border-b border-gray-100 transition-colors duration-300 ${scrolled ? "bg-transparent" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/logo.png"
              alt="UFA — Ассоциация Франчайзинга Узбекистана"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setActiveMenu(item)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 uppercase tracking-[0.05em] text-[13px] font-medium transition-colors rounded-lg ${
                    isMenuActive(item, pathname)
                      ? "text-[#3ECF8E]"
                      : "text-gray-700 hover:text-[#3ECF8E]"
                  }`}
                >
                  {item}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {/* Mega menu dropdown */}
                {activeMenu === item && (
                  <div className="absolute top-full left-0 mt-0 bg-white rounded-b-xl shadow-[var(--shadow-dropdown)] border border-gray-100 p-6 min-w-[320px] z-50">
                    <div className="flex gap-8">
                      {megaMenuData[item].map((section) => (
                        <div key={section.title}>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                            {section.title}
                          </h4>
                          <ul className="space-y-2">
                            {section.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className={`text-sm transition-colors ${
                                    pathname === link.href
                                      ? "text-[#3ECF8E] font-semibold"
                                      : "text-gray-700 hover:text-[#3ECF8E]"
                                  }`}
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
                )}
              </div>
            ))}
          </div>

          {/* Find a Franchise CTA */}
          <Link
            href="/franchise-opportunities"
            className="hidden lg:inline-flex bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-5 py-2 rounded text-sm font-semibold transition-colors whitespace-nowrap"
          >
            Найти франшизу
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[104px] z-40 bg-white overflow-y-auto">
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <div key={item} className="border-b border-gray-100 pb-2">
                <button
                  className={`w-full flex items-center justify-between py-3 text-left font-medium min-h-[48px] ${
                    isMenuActive(item, pathname) ? "text-[#3ECF8E]" : "text-gray-800"
                  }`}
                  onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                >
                  {item}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${activeMenu === item ? "rotate-180" : ""}`}
                  />
                </button>
                {activeMenu === item && (
                  <div className="pl-4 pb-3 space-y-3">
                    {megaMenuData[item].map((section) => (
                      <div key={section.title}>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">{section.title}</p>
                        {section.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`block py-1.5 text-sm min-h-[44px] flex items-center ${
                              pathname === link.href
                                ? "text-[#3ECF8E] font-semibold"
                                : "text-gray-600 hover:text-[#3ECF8E]"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <Link href="/about" className="block text-gray-700 font-medium min-h-[48px] flex items-center" onClick={() => setMobileOpen(false)}>
                О нас
              </Link>
              <Link href="/contact" className="block text-gray-700 font-medium min-h-[48px] flex items-center" onClick={() => setMobileOpen(false)}>
                Контакты
              </Link>
              <Link
                href="/membership"
                className="block w-full text-center bg-[#3ECF8E] hover:bg-[#35B67A] text-white py-3 rounded font-semibold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Вступить в UFA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
