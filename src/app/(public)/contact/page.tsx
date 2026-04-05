import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/public/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты — UFA",
  description: "Свяжитесь с Ассоциацией Франчайзинга Узбекистана.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Адрес",
    lines: ["г. Ташкент, ул. Амира Темура 68", "Бизнес-центр 'Tashkent City', 12 этаж"],
  },
  {
    icon: Phone,
    title: "Телефон",
    lines: ["+998 71 234 56 78", "+998 90 123 45 67"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@ufa.uz", "membership@ufa.uz"],
  },
  {
    icon: Clock,
    title: "Режим работы",
    lines: ["Пн — Пт: 09:00 — 18:00", "Сб — Вс: выходные"],
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src="/images/hero-contact.jpg"
          alt="Контакты UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2332]/90 via-[#1A2332]/70 to-[#1A2332]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Контакты</h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-4" />
          <p className="text-lg text-white/80 max-w-2xl">
            Свяжитесь с нами — мы с удовольствием ответим на ваши вопросы.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A2332] mb-1">{info.title}</h3>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-gray-600 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-extrabold text-[#1A2332] green-underline mb-8">
                  Напишите нам
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
