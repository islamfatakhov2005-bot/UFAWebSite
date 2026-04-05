"use client";

import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";

const categories = [
  { label: "Общепит / Рестораны", avgMonthlyRevenue: 45000000, avgMargin: 0.2 },
  { label: "Ритейл / Магазины", avgMonthlyRevenue: 35000000, avgMargin: 0.15 },
  { label: "Образование", avgMonthlyRevenue: 25000000, avgMargin: 0.25 },
  { label: "Красота / Здоровье", avgMonthlyRevenue: 20000000, avgMargin: 0.3 },
  { label: "IT / Услуги", avgMonthlyRevenue: 30000000, avgMargin: 0.35 },
  { label: "Другое", avgMonthlyRevenue: 25000000, avgMargin: 0.2 },
];

function formatSum(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} млрд`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} млн`;
  return n.toLocaleString("ru-RU");
}

export default function ROICalculator() {
  const [investment, setInvestment] = useState(50);
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const cat = categories[categoryIdx];
  const investmentSum = investment * 1_000_000;
  const monthlyProfit = cat.avgMonthlyRevenue * cat.avgMargin;
  const paybackMonths = Math.ceil(investmentSum / monthlyProfit);
  const yearlyProfit = monthlyProfit * 12;
  const roi3Years = ((yearlyProfit * 3 - investmentSum) / investmentSum) * 100;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1A2332] mb-3">
            Калькулятор окупаемости франшизы
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Рассчитайте примерный срок окупаемости и доходность на основе средних показателей рынка Узбекистана
          </p>
        </div>

        <div className="bg-[#f5f7fa] rounded-xl p-8">
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория франшизы
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map((c, i) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => { setCategoryIdx(i); setShowResult(false); }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      categoryIdx === i
                        ? "bg-[#3ECF8E] text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#3ECF8E]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Investment slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Начальные инвестиции: <span className="text-[#2A9D6F] font-bold">{formatSum(investmentSum)} сум</span>
              </label>
              <input
                type="range"
                min={10}
                max={500}
                step={5}
                value={investment}
                onChange={(e) => { setInvestment(Number(e.target.value)); setShowResult(false); }}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#3ECF8E]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10 млн</span>
                <span>500 млн</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowResult(true)}
              className="w-full bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white py-3.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
            >
              Рассчитать окупаемость
            </button>
          </div>

          {showResult && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Срок окупаемости</p>
                <p className="text-2xl font-extrabold text-[#1A2332]">
                  ~{paybackMonths} мес
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Прибыль в месяц</p>
                <p className="text-2xl font-extrabold gradient-text">
                  {formatSum(monthlyProfit)} сум
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                <p className="text-sm text-gray-500 mb-1">ROI за 3 года</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#3ECF8E]" />
                  <p className="text-2xl font-extrabold text-[#3ECF8E]">
                    +{Math.round(roi3Years)}%
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 text-center">
                <p className="text-xs text-gray-400 mt-2">
                  * Расчёт основан на средних показателях рынка. Реальные результаты зависят от конкретной франшизы, локации и управления.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
