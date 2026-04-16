"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string | number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, paused]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative w-full h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Баннер-карусель"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Слайд {current + 1} из {slides.length}: {slides[current]?.title}
      </div>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`Слайд ${index + 1} из ${slides.length}`}
          aria-hidden={index !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            unoptimized={slide.image.endsWith(".svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2645]/85 via-[#0B2645]/55 to-[#0B2645]/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
                  Ассоциация Франчайзинга Узбекистана
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white leading-[1.15] mb-5">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-[1.7] mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.buttonUrl}
                  className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-8 py-3.5 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-colors"
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-colors"
        aria-label="Следующий слайд"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[#3ECF8E] w-8"
                : "bg-white/50 hover:bg-white/75 w-4"
            }`}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
