import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import RegisterForm from "@/components/public/RegisterForm";

export const metadata: Metadata = {
  title: "Создать аккаунт",
  description: "Создайте аккаунт на портале UFA — получите доступ к членской зоне, каталогу франшиз, UFA Academy и эксклюзивным материалам.",
};

const benefits = [
  {
    title: "Каталог франшиз",
    text: "Более 500 проверенных франшиз из 40+ стран с фильтрами по категории, региону и инвестициям.",
  },
  {
    title: "Еженедельные рассылки",
    text: "Отраслевые новости, аналитика и приглашения на открытые мероприятия UFA.",
  },
  {
    title: "UFA Academy",
    text: "Бесплатный вводный курс «Основы франчайзинга» сразу после регистрации.",
  },
  {
    title: "Нетворкинг",
    text: "Приглашения на региональные встречи и возможность связаться с другими участниками.",
  },
];

export default function RegisterPage() {
  return (
    <>
      {/* Navy header bar */}
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
              Создайте аккаунт UFA
            </h1>
          </div>
          <Link
            href="/login"
            className="text-sm text-white/80 hover:text-[#3ECF8E] transition-colors"
          >
            Уже есть аккаунт?{" "}
            <span className="font-bold underline underline-offset-4">Войти</span>
          </Link>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="bg-[#F5F6F8] py-14 min-h-[70vh]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="card p-8 md:p-10">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2645] mb-2">
                  Информация об аккаунте
                </h2>
                <p className="text-sm text-[#4A5568] leading-[1.65] mb-8">
                  Поля, отмеченные{" "}
                  <span className="text-red-600 font-bold">*</span>, обязательны
                  для заполнения. Мы не передаём данные третьим лицам.
                </p>
                <RegisterForm />

                <div className="mt-8 pt-6 border-t border-[#D5DCE5] text-xs text-[#4A5568] leading-[1.7]">
                  Регистрируя аккаунт, вы соглашаетесь с{" "}
                  <Link href="/terms" className="text-[#0B2645] font-bold underline hover:text-[#3ECF8E]">
                    Условиями использования
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy" className="text-[#0B2645] font-bold underline hover:text-[#3ECF8E]">
                    Политикой конфиденциальности
                  </Link>
                  .
                </div>
              </div>
            </div>

            {/* Benefits */}
            <aside className="lg:col-span-5">
              <div className="bg-[#0B2645] text-white p-8 md:p-10 h-full rounded-[3px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
                  Что вы получите
                </p>
                <h3 className="text-xl font-extrabold leading-[1.25] mb-8">
                  Бесплатный доступ к порталу франчайзинга Узбекистана
                </h3>
                <ul className="space-y-5">
                  {benefits.map((b, i) => (
                    <li key={b.title} className="flex gap-4">
                      <span className="w-8 h-8 bg-[#3ECF8E] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 rounded-[3px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          {b.title}
                        </h4>
                        <p className="text-[13px] text-white/75 leading-[1.6]">
                          {b.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/15">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-3">
                    Нужно полное членство?
                  </p>
                  <p className="text-[13px] text-white/80 leading-[1.65] mb-4">
                    Регистрация даёт базовый доступ. Для всех преимуществ
                    оформите членство — франчайзер, франчайзи или поставщик.
                  </p>
                  <Link href="/membership/apply" className="btn btn-outline-white text-xs">
                    Подать заявку на членство
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
