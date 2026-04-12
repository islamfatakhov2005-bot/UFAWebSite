"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  title: string;
  url: string;
  type: string;
}

interface SearchResponse {
  news: SearchResult[];
  events: SearchResult[];
  franchises: SearchResult[];
  pages: SearchResult[];
}

const groupOrder: { key: keyof SearchResponse; label: string }[] = [
  { key: "pages", label: "Страницы" },
  { key: "news", label: "Новости" },
  { key: "events", label: "Мероприятия" },
  { key: "franchises", label: "Франшизы" },
];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback((q: string) => {
    // Cancel any in-flight request
    abortRef.current?.abort();

    if (!q.trim()) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    fetch(`/api/search?q=${encodeURIComponent(q.trim())}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: SearchResponse) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setLoading(false);
        }
      });
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(value), 300);
  };

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
      setResults(null);
      setLoading(false);
      abortRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    }
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (!open) return null;

  const hasResults =
    results &&
    (results.pages.length > 0 ||
      results.news.length > 0 ||
      results.events.length > 0 ||
      results.franchises.length > 0);

  const showEmpty = query.trim() && !loading && results && !hasResults;

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
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Поиск по сайту..."
            className="flex-1 py-4 text-sm outline-none bg-transparent placeholder:text-gray-400"
          />
          {loading && (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin flex-shrink-0" />
          )}
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {showEmpty && (
            <p className="text-sm text-gray-400 text-center py-8">
              Ничего не найдено по запросу &laquo;{query}&raquo;
            </p>
          )}

          {!query.trim() && !results && (
            <p className="text-sm text-gray-400 text-center py-8">
              Начните вводить для поиска...
            </p>
          )}

          {hasResults &&
            groupOrder.map(({ key, label }) => {
              const items = results[key];
              if (!items || items.length === 0) return null;
              return (
                <div key={key} className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {label}
                  </p>
                  {items.map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-[#3ECF8E]/10 hover:text-[#2A9D6F] transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              );
            })}
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
