"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 lg:p-6 mb-[env(safe-area-inset-bottom)]">
      <div className="max-w-3xl mx-auto mb-24 lg:mb-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed">
            Мы используем файлы cookie для улучшения работы сайта и аналитики.
            Продолжая использовать сайт, вы соглашаетесь с{" "}
            <Link href="/privacy" className="text-[#2A9D6F] underline">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Отклонить
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
