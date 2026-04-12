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
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/80 via-[#1A2332]/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl mx-auto text-center lg:mx-0 lg:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-3">
                  {slide.title}
                </h1>
                <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6 mx-auto lg:mx-0" />
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link
                    href={slide.buttonUrl}
                    className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
                  >
                    {slide.buttonText}
                  </Link>
                  <Link
                    href="/membership"
                    className="inline-block border-2 border-white/60 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                  >
                    Узнать о членстве
                  </Link>
                </div>
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-[#3ECF8E] w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
