import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import RegisterForm from "@/components/public/RegisterForm";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Создайте аккаунт UFA — получите доступ к членской зоне, каталогу франшиз, UFA Academy и эксклюзивному контенту.",
};

export default function RegisterPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16 overflow-hidden">
        <Image
          src="/images/hero-register.jpg"
          alt="Регистрация UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-6" style={{ fontSize: "1.5rem" }}>
            Создайте аккаунт UFA
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Бесплатная регистрация даёт доступ к базовому каталогу франшиз,
            отраслевым новостям и открытым мероприятиям ассоциации.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-[#F4F4F4] rounded-lg p-8 md:p-10">
            <RegisterForm />
          </div>
          <p className="text-center text-sm text-[#020409] mt-6">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-[#3ECF8E] hover:underline font-semibold">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
