"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter",
          email,
          subject: "newsletter",
          message: "Подписка на рассылку",
          phone: "",
          company: "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#3ECF8E]/10 rounded-xl p-6 text-center">
        <p className="text-[#2A9D6F] font-semibold">Вы подписаны!</p>
        <p className="text-sm text-gray-600 mt-1">Первое письмо придёт в течение недели.</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#1A2332]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#3ECF8E]/20 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#3ECF8E]" />
          </div>
          <h3 className="text-xl font-bold text-white">Рассылка UFA</h3>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          Аналитика рынка франшиз, анонсы мероприятий и полезные материалы. Без спама — только важное.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.uz"
            required
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/50 focus:border-[#3ECF8E] text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25 disabled:opacity-50"
          >
            {status === "loading" ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Подписаться
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">Не удалось подписаться. Попробуйте позже.</p>
        )}
        <p className="text-gray-500 text-xs mt-3">
          Мы не передаём ваши данные третьим лицам
        </p>
      </div>
    </section>
  );
}
