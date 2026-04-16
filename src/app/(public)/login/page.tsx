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
      <section className="bg-[#0B2645] text-white py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logos/logo.png"
                alt="UFA"
                width={120}
                height={36}
                className="h-9 w-auto object-contain brightness-200"
              />
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold leading-[1.15] tracking-[-0.01em]">
              Членская зона UFA
            </h1>
          </div>
          <Link
            href="/register"
            className="text-sm text-white/80 hover:text-[#3ECF8E] transition-colors"
          >
            Нет аккаунта?{" "}
            <span className="font-bold underline underline-offset-4">Создать</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#F5F6F8] py-14 min-h-[70vh]">
        <div className="max-w-md mx-auto px-6">
          <div className="card p-8 md:p-10">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2645] mb-2">
              Вход в аккаунт
            </h2>
            <p className="text-sm text-[#4A5568] leading-[1.65] mb-8">
              Введите свои учётные данные для доступа к порталу участников UFA.
            </p>

            <form className="space-y-5" action="/api/auth/login" method="post">
              <div>
                <label className="label" htmlFor="login-user">
                  Email или логин<span className="required">*</span>
                </label>
                <input
                  id="login-user"
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  className="input"
                  placeholder="name@company.uz"
                />
              </div>

              <div>
                <label className="label" htmlFor="login-pass">
                  Пароль<span className="required">*</span>
                </label>
                <input
                  id="login-pass"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="input"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#0B2645]">
                  <input
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 rounded-[2px] border-[#D5DCE5] text-[#0B2645] focus:ring-[#0B2645]"
                  />
                  Запомнить меня
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[#2A9D6F] hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-full py-3.5">
                Войти
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[#4A5568] mt-6">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-[#0B2645] font-bold underline hover:text-[#3ECF8E]">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
