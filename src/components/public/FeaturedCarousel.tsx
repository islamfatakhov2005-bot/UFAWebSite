"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedFranchise {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
}

interface FeaturedCarouselProps {
  franchises: FeaturedFranchise[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export default function FeaturedCarousel({ franchises }: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;
      const scrollAmount = 300;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateScrollState, 350);
    },
    [updateScrollState]
  );

  if (franchises.length === 0) return null;

  return (
    <section className="bg-[#1A2332] rounded-xl p-8 mb-8">
      <div className="mb-6">
        <h2
          className="text-white text-sm font-bold uppercase tracking-[0.2em] relative pb-4
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1.5 after:bg-[#3ECF8E] after:rounded-full"
        >
          Рекомендуемые франшизы
        </h2>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {franchises.map((franchise) => (
            <Link
              key={franchise.id}
              href={`/franchise-opportunities/${franchise.slug}`}
              className="flex-shrink-0 w-[200px] bg-white rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              {franchise.logo ? (
                <div className="relative w-full h-14">
                  <Image
                    src={franchise.logo}
                    alt={`${franchise.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#1A2332] flex items-center justify-center">
                  <span className="text-white font-semibold text-base">
                    {getInitials(franchise.name)}
                  </span>
                </div>
              )}
              <span className="mt-3 text-sm font-medium text-[#333333] text-center leading-tight">
                {franchise.name}
              </span>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
}
