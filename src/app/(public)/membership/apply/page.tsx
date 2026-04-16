import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ApplyForm from "@/components/public/ApplyForm";

export const metadata: Metadata = {
  title: "Подать заявку на членство",
  description: "Заполните заявку на членство в UFA — выберите тип членства и укажите контактные данные. Менеджер свяжется с вами в течение рабочего дня.",
};

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src="/images/hero-apply.jpg"
          alt="Заявка на членство UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Заявка на членство UFA
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Заполните короткую форму — менеджер команды членства свяжется с
            вами в течение рабочего дня, уточнит детали и поможет подобрать
            оптимальный тариф.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-[#F4F4F4] rounded-lg p-8 md:p-10">
            <ApplyForm />
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            Отправляя заявку, вы соглашаетесь с{" "}
            <Link href="/privacy" className="text-[#3ECF8E] hover:underline">
              политикой конфиденциальности
            </Link>{" "}
            и{" "}
            <Link href="/terms" className="text-[#3ECF8E] hover:underline">
              условиями использования
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Contact alt */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            Предпочитаете позвонить?
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mb-8 mt-8">
            Команда членства UFA отвечает с понедельника по пятницу с 9:00 до
            18:00. Первичная консультация бесплатна.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+998712345679"
              className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              +998 71 234 56 79
            </a>
            <a
              href="mailto:membership@ufa.uz"
              className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              membership@ufa.uz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
