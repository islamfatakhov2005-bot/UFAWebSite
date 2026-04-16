"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Partner {
  id: string | number;
  name: string;
  logo: string;
  website?: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Don't animate if user prefers reduced motion or manually paused
    if (reducedMotion || userPaused) return;

    let animationId: number;
    let scrollPos = container.scrollLeft;

    const animate = () => {
      scrollPos += 0.5;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    let hoverPaused = false;
    animationId = requestAnimationFrame(animate);

    const pauseScroll = () => {
      hoverPaused = true;
      cancelAnimationFrame(animationId);
    };
    const resumeScroll = () => {
      if (hoverPaused) {
        hoverPaused = false;
        animationId = requestAnimationFrame(animate);
      }
    };

    // Pause when tab is hidden to prevent CPU waste
    const handleVisibility = () => {
      if (document.hidden) {
        pauseScroll();
      } else {
        resumeScroll();
      }
    };

    container.addEventListener("mouseenter", pauseScroll);
    container.addEventListener("mouseleave", resumeScroll);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pauseScroll);
      container.removeEventListener("mouseleave", resumeScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion, userPaused]);

  // Double the array for infinite scroll effect
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2645] green-underline-center text-center">
            Компании-участники
          </h2>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused || reducedMotion ? "Возобновить прокрутку" : "Остановить прокрутку"}
            className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-full px-3 py-1 transition-colors"
          >
            {userPaused || reducedMotion ? "▶ Возобновить" : "⏸ Пауза"}
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="overflow-hidden whitespace-nowrap"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="inline-flex items-center gap-8 px-4">
          {doubledPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-32 h-20 relative grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 cursor-pointer"
              title={partner.name}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
