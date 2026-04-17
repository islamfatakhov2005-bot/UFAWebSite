"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

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
    <header className="sticky top-0 z-50 bg-white border-b border-[#D5DCE5]">
      {/* Top utility row */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 h-[88px] flex items-center gap-6">
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

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-sm relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568] pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-[#D5DCE5] rounded-[3px] bg-white text-sm text-[#0B2645] focus:outline-none focus:border-[#0B2645] focus:ring-1 focus:ring-[#0B2645]/20"
            />
          </form>

          <nav className="hidden xl:flex items-center gap-5 text-[13px] font-semibold text-[#0B2645]">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`uppercase tracking-[0.05em] whitespace-nowrap hover:text-[#3ECF8E] transition-colors ${
                  isActive(link.href, pathname) ? "text-[#3ECF8E]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 ml-auto">
            <LanguageSwitcher />
            <Link href="/franchise-opportunities" className="btn btn-outline-navy">
              Найти франшизу
            </Link>
            <Link href="/login" className="hidden lg:inline-flex btn btn-outline-navy">
              Членская зона
            </Link>
            <Link href="/membership/apply" className="btn btn-primary">
              Вступить
            </Link>
          </div>

          <button
            className="lg:hidden ml-auto p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navy main nav */}
      <nav className="hidden lg:block bg-[#0B2645]">
        <div className="max-w-[1200px] mx-auto px-6">
          <ul className="flex items-center h-12">
            {mainNav.map((item) => (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={`flex items-center justify-center h-12 px-3 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors text-center border-b-2 ${
                    isActive(item.href, pathname)
                      ? "text-[#3ECF8E] border-[#3ECF8E]"
                      : "text-white hover:text-[#3ECF8E] border-transparent hover:border-[#3ECF8E]"
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
        <div className="lg:hidden fixed inset-0 top-[88px] z-40 bg-white overflow-y-auto">
          <div className="p-4 space-y-5">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#D5DCE5] rounded-[3px] bg-white text-sm focus:outline-none focus:border-[#0B2645]"
              />
            </form>

            <div className="space-y-1 pt-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-3 text-sm font-bold uppercase tracking-[0.06em] rounded-[3px] transition-colors ${
                    isActive(item.href, pathname)
                      ? "bg-[#0B2645] text-white"
                      : "text-[#0B2645] hover:bg-[#F5F6F8]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-[#D5DCE5] pt-4 space-y-1">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-3 text-sm text-[#0B2645] hover:bg-[#F5F6F8] rounded-[3px] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-center">
              <LanguageSwitcher />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              <Link
                href="/franchise-opportunities"
                className="btn btn-outline-navy w-full"
                onClick={() => setMobileOpen(false)}
              >
                Найти франшизу
              </Link>
              <Link
                href="/login"
                className="btn btn-outline-navy w-full"
                onClick={() => setMobileOpen(false)}
              >
                Членская зона
              </Link>
              <Link
                href="/membership/apply"
                className="btn btn-primary w-full"
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
