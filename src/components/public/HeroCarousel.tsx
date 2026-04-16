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
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [next, paused]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative w-full h-[440px] md:h-[520px] lg:h-[580px] overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Баннер-карусель"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2645]/85 via-[#0B2645]/55 to-[#0B2645]/25" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1200px] mx-auto px-6 w-full">
              <div className="max-w-xl">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#3ECF8E] mb-5">
                  Ассоциация Франчайзинга Узбекистана
                </span>
                <h1 className="text-[28px] md:text-4xl lg:text-[42px] font-extrabold text-white leading-[1.12] mb-5 tracking-[-0.01em]">
                  {slide.title}
                </h1>
                <p className="text-base md:text-[17px] text-white/85 leading-[1.6] mb-8 max-w-lg">
                  {slide.subtitle}
                </p>
                <Link href={slide.buttonUrl} className="btn btn-primary">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-white/25 border border-white/30 text-white transition-colors flex items-center justify-center"
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-white/25 border border-white/30 text-white transition-colors flex items-center justify-center"
        aria-label="Следующий слайд"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[3px] transition-all duration-300 ${
              index === current
                ? "bg-[#3ECF8E] w-10"
                : "bg-white/50 hover:bg-white/75 w-6"
            }`}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
