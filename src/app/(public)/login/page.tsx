import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description: "Войдите в аккаунт UFA — получите доступ к членской зоне, каталогу франшиз, UFA Academy и эксклюзивным материалам.",
};

export default function LoginPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16 overflow-hidden">
        <Image
          src="/images/hero-login.jpg"
          alt="Вход UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1A2332]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white" style={{ fontSize: "1.5rem" }}>
            Вход для участников
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-[#F4F4F4] rounded-lg p-8 md:p-10">
            <form className="space-y-5" action="/api/auth/login" method="post">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-2">
                  Email или логин
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/40 focus:border-[#3ECF8E] transition-colors text-sm"
                  placeholder="name@company.uz"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]/40 focus:border-[#3ECF8E] transition-colors text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#020409]">
                  <input
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 rounded border-gray-300 text-[#3ECF8E] focus:ring-[#3ECF8E]"
                  />
                  Запомнить меня
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[#3ECF8E] hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3ECF8E] hover:bg-[#35B67A] text-white py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
              >
                Войти
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[#020409] mt-6">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-[#3ECF8E] hover:underline font-semibold">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
