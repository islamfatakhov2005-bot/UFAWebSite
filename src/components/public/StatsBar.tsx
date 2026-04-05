"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

function parseNumber(value: string): { num: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^\d]*)(\d[\d\s]*)(.*)$/);
  if (!match) return null;
  const num = parseInt(match[2].replace(/\s/g, ""), 10);
  if (isNaN(num)) return null;
  return { num, prefix: match[1], suffix: match[3] };
}

function formatNumber(n: number, original: string): string {
  const parsed = parseNumber(original);
  if (!parsed) return original;

  // Preserve space-separated formatting (e.g., "1 200")
  if (original.includes(" ") && !original.includes("трлн") && !original.includes("млн")) {
    return parsed.prefix + n.toLocaleString("ru-RU").replace(/,/g, " ") + parsed.suffix;
  }
  return parsed.prefix + n + parsed.suffix;
}

function AnimatedStat({ value, label }: Stat) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const parsed = parseNumber(value);
          if (!parsed || parsed.num === 0) {
            setDisplay(value);
            return;
          }

          const duration = 1500;
          const startTime = performance.now();
          const target = parsed.num;

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(formatNumber(current, value));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold gradient-text mb-2">
        {display}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-[#f5f7fa] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
