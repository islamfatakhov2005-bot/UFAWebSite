"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

type Locale = "ru" | "uz";

const COOKIE = "ufa_locale";

function readLocale(): Locale {
  if (typeof document === "undefined") return "ru";
  const match = document.cookie.match(new RegExp("(?:^|; )" + COOKIE + "=([^;]*)"));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === "uz" ? "uz" : "ru";
}

function writeLocale(locale: Locale) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${COOKIE}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  document.documentElement.lang = locale;
}

type Variant = "light" | "dark";

export default function LanguageSwitcher({ variant = "light" }: { variant?: Variant }) {
  const [locale, setLocale] = useState<Locale>("ru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = readLocale();
    setLocale(current);
    document.documentElement.lang = current;
  }, []);

  const choose = (next: Locale) => {
    if (next === locale) return;
    writeLocale(next);
    setLocale(next);
    window.location.reload();
  };

  const isDark = variant === "dark";
  const baseText = isDark ? "text-white/85" : "text-[#0B2645]";
  const activeBg = isDark ? "bg-white text-[#0B2645]" : "bg-[#0B2645] text-white";
  const border = isDark ? "border-white/30" : "border-[#D5DCE5]";
  const inactive = isDark ? "hover:bg-white/10" : "hover:bg-[#F5F6F8]";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-[3px] border ${border} ${baseText} px-1 py-0.5`}
      role="group"
      aria-label="Язык сайта / Sayt tili"
      suppressHydrationWarning
    >
      <Globe className="w-3.5 h-3.5 ml-1 opacity-70" aria-hidden="true" />
      <button
        type="button"
        onClick={() => choose("ru")}
        aria-pressed={mounted && locale === "ru"}
        className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] rounded-[2px] transition-colors ${
          mounted && locale === "ru" ? activeBg : inactive
        }`}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => choose("uz")}
        aria-pressed={mounted && locale === "uz"}
        className={`px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] rounded-[2px] transition-colors ${
          mounted && locale === "uz" ? activeBg : inactive
        }`}
      >
        UZ
      </button>
    </div>
  );
}
