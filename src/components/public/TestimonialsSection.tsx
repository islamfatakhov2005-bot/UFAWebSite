"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Азиз Каримов",
    role: "Основатель, Apex Pizza",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
    text: "Благодаря UFA мы нашли надёжных партнёров и масштабировали нашу франшизу с 3 до 12 точек за 18 месяцев. Экспертная поддержка ассоциации была бесценна.",
    metric: "С 3 до 12 точек за 18 месяцев",
  },
  {
    name: "Малика Рахимова",
    role: "CEO, EduFranch",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80",
    text: "Членство в UFA открыло доступ к международным контактам и лучшим практикам. Наша образовательная франшиза теперь работает в 5 городах Узбекистана.",
    metric: "5 городов за 2 года",
  },
  {
    name: "Дмитрий Ли",
    role: "Директор по развитию, FoodMaster",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80",
    text: "Юридическая поддержка UFA помогла нам правильно структурировать франчайзинговый договор. Это сэкономило нам месяцы работы и миллионы сумов.",
    metric: "Экономия 40+ млн сум на юридических услугах",
  },
  {
    name: "Нодира Усманова",
    role: "Франчайзи, Beauty Lab",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80",
    text: "Как начинающий предприниматель, я не знала с чего начать. Менторская программа UFA связала меня с опытным наставником, и через 6 месяцев я открыла свою первую точку.",
    metric: "От идеи до открытия за 6 месяцев",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-[#0B2645] green-underline-center text-center mb-12">
          Истории наших участников
        </h2>

        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 relative">
          <Quote className="w-10 h-10 text-[#3ECF8E]/20 absolute top-6 left-6" />

          <div className="text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-2xl mx-auto relative z-10">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="inline-block bg-[#3ECF8E]/10 text-[#2A9D6F] text-sm font-semibold px-4 py-2 rounded-lg mb-6">
              {t.metric}
            </div>

            <div className="flex items-center justify-center gap-4">
              <Image
                src={t.image}
                alt={t.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover"
                unoptimized
              />
              <div className="text-left">
                <p className="font-bold text-[#0B2645]">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-[#3ECF8E] w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
