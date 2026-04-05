"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Еда и рестораны",
  "Напитки",
  "Красота и здоровье",
  "Фитнес",
  "Образование",
  "Бизнес-услуги",
  "Автомобили",
  "Детские услуги",
  "Клининг",
  "IT и технологии",
  "Финансовые услуги",
  "Домашние услуги",
  "Розничная торговля",
  "Недвижимость",
  "Развлечения",
  "Логистика",
  "Маркетинг и реклама",
  "Зоо-услуги",
] as const;

const INVESTMENT_OPTIONS = [
  { value: "", label: "Все" },
  { value: "0-10000", label: "До $10K" },
  { value: "10000-50000", label: "$10K-$50K" },
  { value: "50000-100000", label: "$50K-$100K" },
  { value: "100000-500000", label: "$100K-$500K" },
  { value: "500000-", label: "$500K+" },
] as const;

const STARTUP_COST_OPTIONS = [
  { value: "", label: "Все" },
  { value: "0-10000", label: "До $10K" },
  { value: "10000-50000", label: "$10K-$50K" },
  { value: "50000-100000", label: "$50K-$100K" },
  { value: "100000-500000", label: "$100K-$500K" },
  { value: "500000-", label: "$500K+" },
] as const;

export default function FranchiseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("q") || "";
  const currentLocation = searchParams.get("location") || "";
  const currentInvestment = searchParams.get("investment") || "";
  const currentStartupCost = searchParams.get("startupCost") || "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset to page 1 when filters change
      params.delete("page");
      router.push(`/franchise-opportunities?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-2">
          Поиск:
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Название франшизы..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const value = e.target.value;
              // Debounce: only update after user stops typing
              const timeout = setTimeout(() => updateParams("q", value), 400);
              return () => clearTimeout(timeout);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-2">
          Расположение:
        </label>
        <Input
          type="text"
          placeholder="Город или регион..."
          defaultValue={currentLocation}
          onChange={(e) => {
            const value = e.target.value;
            const timeout = setTimeout(
              () => updateParams("location", value),
              400
            );
            return () => clearTimeout(timeout);
          }}
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-3">
          Категории:
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                updateParams("category", currentCategory === cat ? "" : cat)
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                currentCategory === cat
                  ? "bg-[#3ECF8E] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Min Investment */}
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-2">
          Минимальная сумма инвестиций:
        </label>
        <Select
          value={currentInvestment}
          onChange={(e) => updateParams("investment", e.target.value)}
        >
          {INVESTMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Startup Costs */}
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-2">
          Начальные затраты:
        </label>
        <Select
          value={currentStartupCost}
          onChange={(e) => updateParams("startupCost", e.target.value)}
        >
          {STARTUP_COST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </span>
          {mobileOpen ? <X className="w-4 h-4" /> : null}
        </Button>
      </div>

      {/* Mobile filter panel */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[2000px] opacity-100 mb-6" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
          {filterContent}
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-4 bg-white border border-[#e5e7eb] rounded-xl p-5">
          {filterContent}
        </div>
      </aside>
    </>
  );
}
