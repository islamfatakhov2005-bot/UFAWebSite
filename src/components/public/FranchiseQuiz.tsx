"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const steps = [
  {
    question: "Какой у вас бюджет для инвестиций?",
    options: [
      { label: "До 50 млн сум", value: "low" },
      { label: "50–150 млн сум", value: "medium" },
      { label: "150–500 млн сум", value: "high" },
      { label: "Более 500 млн сум", value: "premium" },
    ],
  },
  {
    question: "Какая сфера вас интересует?",
    options: [
      { label: "Общепит / Рестораны", value: "food" },
      { label: "Ритейл / Магазины", value: "retail" },
      { label: "Образование", value: "education" },
      { label: "Красота / Здоровье", value: "beauty" },
      { label: "IT / Услуги", value: "services" },
    ],
  },
  {
    question: "У вас есть опыт в бизнесе?",
    options: [
      { label: "Нет, это мой первый бизнес", value: "none" },
      { label: "Да, до 3 лет", value: "some" },
      { label: "Да, более 3 лет", value: "experienced" },
    ],
  },
  {
    question: "В каком регионе планируете открытие?",
    options: [
      { label: "Ташкент", value: "tashkent" },
      { label: "Самарканд / Бухара", value: "samarkand" },
      { label: "Другой город", value: "other" },
      { label: "Несколько городов", value: "multi" },
    ],
  },
];

interface QuizResult {
  title: string;
  description: string;
  count: string;
  catalogHref: string;
  categories: string[];
}

function getRecommendation(answers: string[]): QuizResult {
  const [budget, interest, experience, location] = answers;

  // Premium investor profile
  if ((budget === "premium" || budget === "high") && experience === "experienced") {
    return {
      title: "Премиум-франшизы для опытных инвесторов",
      description: "Вам подходят крупные сетевые франшизы с высоким потенциалом прибыли и масштабирования.",
      count: "8+",
      catalogHref: "/franchise-opportunities?investmentMax=premium",
      categories: interest === "food"
        ? ["Рестораны полного цикла", "Сетевые кафе", "Премиум-фастфуд"]
        : interest === "retail"
        ? ["Крупный ритейл", "Торговые сети", "Маркетплейсы"]
        : ["Крупные сетевые франшизы", "Мастер-франшизы"],
    };
  }

  // Beginner-friendly profile
  if (experience === "none" && (budget === "low" || budget === "medium")) {
    return {
      title: "Франшизы для начинающих предпринимателей",
      description: "Мы подобрали франшизы с сильной поддержкой, обучением и доступным порогом входа — идеально для первого бизнеса.",
      count: "15+",
      catalogHref: "/franchise-opportunities?investmentMax=medium",
      categories: interest === "education"
        ? ["Детские центры", "Языковые школы", "Онлайн-образование"]
        : interest === "beauty"
        ? ["Салоны красоты", "Барбершопы", "Студии маникюра"]
        : interest === "services"
        ? ["IT-курсы", "Клининг", "Доставка"]
        : ["Микро-франшизы", "Мобильный бизнес", "Островки в ТЦ"],
    };
  }

  // Regional expansion profile
  if (location === "multi" || (location === "other" && budget !== "low")) {
    return {
      title: "Франшизы для регионального развития",
      description: "Отличный выбор для открытия бизнеса за пределами столицы или масштабирования в нескольких городах.",
      count: "10+",
      catalogHref: "/franchise-opportunities",
      categories: interest === "food"
        ? ["Фастфуд", "Пекарни", "Кофейни"]
        : interest === "retail"
        ? ["Продуктовые магазины", "Минимаркеты", "Дрогери"]
        : ["Сетевые франшизы", "Франшизы с доставкой", "Образовательные центры"],
    };
  }

  // Mid-budget interest-specific profile
  if (budget === "medium" || budget === "high") {
    const industryMap: Record<string, QuizResult> = {
      food: {
        title: "Франшизы в сфере общепита",
        description: "Сфера общепита — одна из самых динамичных в Узбекистане. Мы нашли варианты под ваш бюджет.",
        count: "12+",
        catalogHref: "/franchise-opportunities?category=food",
        categories: ["Кофейни", "Фастфуд", "Пекарни", "Рестораны"],
      },
      retail: {
        title: "Франшизы в ритейле",
        description: "Розничная торговля остаётся надёжным направлением. Вот лучшие варианты для вас.",
        count: "9+",
        catalogHref: "/franchise-opportunities?category=retail",
        categories: ["Магазины одежды", "Продуктовый ритейл", "Дрогери"],
      },
      education: {
        title: "Образовательные франшизы",
        description: "Спрос на качественное образование растёт. Эти франшизы помогут вам войти в перспективную нишу.",
        count: "7+",
        catalogHref: "/franchise-opportunities?category=education",
        categories: ["Детские центры", "Языковые школы", "IT-курсы"],
      },
      beauty: {
        title: "Франшизы в сфере красоты",
        description: "Индустрия красоты показывает стабильный рост. Подобрали лучшие варианты.",
        count: "8+",
        catalogHref: "/franchise-opportunities?category=beauty",
        categories: ["Салоны красоты", "Барбершопы", "Фитнес-студии"],
      },
      services: {
        title: "Франшизы в IT и услугах",
        description: "Сектор услуг и IT активно развивается в Узбекистане. Вот подходящие франшизы.",
        count: "6+",
        catalogHref: "/franchise-opportunities?category=services",
        categories: ["IT-компании", "Клининг", "Логистика"],
      },
    };
    if (interest && industryMap[interest]) return industryMap[interest];
  }

  // Default fallback
  return {
    title: "Франшизы для вас подобраны!",
    description: "На основе ваших ответов мы нашли несколько подходящих вариантов в нашем каталоге.",
    count: "12+",
    catalogHref: "/franchise-opportunities",
    categories: ["Общепит", "Ритейл", "Услуги"],
  };
}

export default function FranchiseQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setDone(true);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setDone(false);
  };

  const result = done ? getRecommendation(answers) : null;
  const progress = done ? 100 : ((currentStep) / steps.length) * 100;

  return (
    <section className="py-20 bg-gradient-to-br from-[#1A2332] to-[#2A3A4F]">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#3ECF8E]" />
            <span className="text-[#3ECF8E] text-sm font-semibold uppercase tracking-wider">
              Подбор франшизы
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Какая франшиза подходит именно вам?
          </h2>
          <p className="text-gray-400">
            Ответьте на 4 вопроса и получите персональную подборку
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full mb-8">
          <div
            className="h-full bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          {!done ? (
            <>
              <p className="text-xs text-gray-400 mb-2">
                Вопрос {currentStep + 1} из {steps.length}
              </p>
              <h3 className="text-xl font-bold text-[#1A2332] mb-6">
                {steps[currentStep].question}
              </h3>
              <div className="space-y-3">
                {steps[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all text-sm font-medium ${
                      answers[currentStep] === opt.value
                        ? "border-[#3ECF8E] bg-[#3ECF8E]/5 text-[#2A9D6F]"
                        : "border-gray-200 hover:border-[#3ECF8E]/50 text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {currentStep > 0 && (
                <button
                  onClick={goBack}
                  className="mt-4 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Назад
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#3ECF8E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#3ECF8E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-2">
                {result!.title}
              </h3>
              <p className="text-gray-600 mb-2">{result!.description}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {result!.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-block bg-[#3ECF8E]/10 text-[#2A9D6F] text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <p className="text-3xl font-extrabold gradient-text mb-6">
                {result!.count} подходящих франшиз
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={result!.catalogHref}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
                >
                  Смотреть каталог
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-[#3ECF8E] hover:text-[#2A9D6F] px-8 py-3.5 rounded-lg font-semibold transition-all"
                >
                  Пройти заново
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
