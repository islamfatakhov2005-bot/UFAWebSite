"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

const mainNav: { label: string; href: string }[] = [
  { label: "Что такое франчайзинг?", href: "/franchising-overview" },
  { label: "Новости и исследования", href: "/news" },
  { label: "Мероприятия", href: "/events" },
  { label: "Образование", href: "/education" },
  { label: "Адвокация", href: "/advocacy" },
  { label: "Программы и сообщество", href: "/programs" },
  { label: "Членство", href: "/membership" },
];

const secondaryLinks = [
  { label: "О нас", href: "/about" },
  { label: "Фонд UFA", href: "/foundation" },
  { label: "Присоединяйтесь", href: "/get-involved" },
  { label: "Медиа-кит", href: "/media-kit" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/franchise-opportunities?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Main row: logo + search + secondary links + CTAs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/logo.png"
              alt="UFA"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Search — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-md relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск..."
              className="w-full pl-12 pr-4 py-2.5 rounded border border-gray-300 bg-white text-sm focus:outline-none focus:border-[#3ECF8E] focus:ring-1 focus:ring-[#3ECF8E]"
            />
          </form>

          {/* Secondary nav links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#0B2645]">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase tracking-[0.04em] whitespace-nowrap hover:text-[#3ECF8E] transition-colors ${
                  isActive(link.href, pathname) ? "text-[#3ECF8E]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <Link
              href="/franchise-opportunities"
              className="border-2 border-[#0B2645] text-[#0B2645] hover:bg-[#0B2645] hover:text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-[0.05em] whitespace-nowrap transition-colors"
            >
              Найти франшизу
            </Link>
            <Link
              href="/login"
              className="hidden lg:inline-block border-2 border-[#0B2645] text-[#0B2645] hover:bg-[#0B2645] hover:text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-[0.05em] whitespace-nowrap transition-colors"
            >
              Членская зона
            </Link>
            <Link
              href="/membership/apply"
              className="bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-[0.05em] whitespace-nowrap transition-colors"
            >
              Вступить
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navy main nav bar */}
      <nav className="hidden lg:block bg-[#0B2645]">
        <div className="max-w-[1400px] mx-auto px-4">
          <ul className="flex items-center justify-between h-12">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors whitespace-nowrap ${
                    isActive(item.href, pathname)
                      ? "text-[#3ECF8E]"
                      : "text-white/90 hover:text-[#3ECF8E]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40 bg-white overflow-y-auto">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full pl-12 pr-4 py-3 rounded border border-gray-300 bg-white text-sm focus:outline-none focus:border-[#3ECF8E]"
              />
            </form>

            <div className="space-y-1 pt-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-3 text-sm font-semibold uppercase tracking-[0.08em] rounded transition-colors ${
                    isActive(item.href, pathname)
                      ? "bg-[#3ECF8E] text-white"
                      : "text-[#0B2645] hover:bg-[#F4F4F4]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-1">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-3 text-sm text-[#020409] hover:bg-[#F4F4F4] rounded transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <Link
                href="/franchise-opportunities"
                className="block text-center border-2 border-[#0B2645] text-[#0B2645] py-3 rounded text-sm font-bold uppercase tracking-[0.08em] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Найти франшизу
              </Link>
              <Link
                href="/login"
                className="block text-center border-2 border-[#0B2645] text-[#0B2645] py-3 rounded text-sm font-bold uppercase tracking-[0.08em] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Членская зона
              </Link>
              <Link
                href="/membership/apply"
                className="block text-center bg-[#3ECF8E] text-white py-3 rounded text-sm font-bold uppercase tracking-[0.08em] transition-colors"
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
