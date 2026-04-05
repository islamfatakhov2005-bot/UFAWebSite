"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;

    const animate = () => {
      scrollPos += 0.5;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    let paused = false;
    animationId = requestAnimationFrame(animate);

    const pauseScroll = () => {
      paused = true;
      cancelAnimationFrame(animationId);
    };
    const resumeScroll = () => {
      if (paused) {
        paused = false;
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
  }, []);

  // Double the array for infinite scroll effect
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2332] green-underline-center text-center mb-12">
          Компании-участники
        </h2>
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
