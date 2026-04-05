"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 pt-3"
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
    >
      <Link
        href="/membership"
        className="block w-full text-center bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white py-3.5 rounded-lg font-semibold text-base shadow-sm transition-all"
      >
        Вступить в UFA
      </Link>
      <p className="text-center text-xs text-gray-500 mt-1.5">
        Бесплатная консультация · Без обязательств
      </p>
    </div>
  );
}
