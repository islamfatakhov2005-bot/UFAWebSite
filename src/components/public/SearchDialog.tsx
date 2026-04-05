"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

const pages = [
  { title: "Главная", href: "/", keywords: "главная домой" },
  { title: "О нас", href: "/about", keywords: "ассоциация история миссия команда" },
  { title: "Членство", href: "/membership", keywords: "вступить тарифы цены членство" },
  { title: "Каталог франшиз", href: "/franchise-opportunities", keywords: "каталог франшизы найти купить" },
  { title: "Обзор франчайзинга", href: "/franchising-overview", keywords: "что такое франчайзинг основы" },
  { title: "Образование", href: "/education", keywords: "курсы обучение сертификация CFE" },
  { title: "Мероприятия", href: "/events", keywords: "выставка конференция форум expo" },
  { title: "Поддержка", href: "/advocacy", keywords: "юридическая защита законодательство" },
  { title: "Программы", href: "/programs", keywords: "менторство стипендии сообщество" },
  { title: "Новости", href: "/news", keywords: "новости статьи блог" },
  { title: "Контакты", href: "/contact", keywords: "связаться адрес телефон email" },
];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? pages.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.keywords.toLowerCase().includes(query.toLowerCase())
      )
    : pages;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по сайту..."
            className="flex-1 py-4 text-sm outline-none bg-transparent placeholder:text-gray-400"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              Ничего не найдено по запросу &laquo;{query}&raquo;
            </p>
          ) : (
            filtered.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-[#3ECF8E]/10 hover:text-[#2A9D6F] transition-colors"
              >
                {page.title}
              </Link>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">Ctrl</kbd>
          {" + "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">K</kbd>
          {" для быстрого поиска"}
        </div>
      </div>
    </div>
  );
}

export function SearchTrigger() {
  const [, setForceRender] = useState(0);

  const handleClick = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
    );
    setForceRender((n) => n + 1);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Поиск"
      className="hover:text-[#3ECF8E] transition-colors"
    >
      <Search className="w-4 h-4" />
    </button>
  );
}
