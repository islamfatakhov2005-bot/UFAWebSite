import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Megaphone,
  Users,
  MapPin,
  TrendingUp,
  BookOpen,
  Network,
  Star,
  Sparkles,
  Heart,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Присоединяйтесь",
  description: "Вы делаете франчайзинг лучше. 6 способов включиться в работу UFA — посещайте мероприятия, адвокатируйте, волонтёрьте, развивайте бизнес.",
};

const ways = [
  {
    icon: Calendar,
    title: "Посещайте мероприятия",
    text: "Конвенция UFA, региональные встречи, конференции и вебинары — более 60 событий в год. Для членов — со скидкой до 60%.",
    cta: "Расписание",
    href: "/events",
  },
  {
    icon: Megaphone,
    title: "Будьте адвокатом",
    text: "Присоединяйтесь к сети действий. Подписывайте петиции, участвуйте в рабочих группах, встречайтесь с законодателями.",
    cta: "Сеть действий",
    href: "/advocacy/action-network",
  },
  {
    icon: Users,
    title: "Волонтёрьте",
    text: "Станьте ментором, участником комитета или спикером. UFA работает силами 300+ активных волонтёров.",
    cta: "Стать волонтёром",
    href: "/get-involved/volunteer",
  },
  {
    icon: MapPin,
    title: "Развивайте регион",
    text: "Организуйте локальное событие UFA в своём городе. Мы поддержим — дадим брендинг, материалы, спикеров.",
    cta: "Региональные сети",
    href: "/events/regional-networks",
  },
  {
    icon: TrendingUp,
    title: "Развивайте бизнес",
    text: "Получайте лиды через каталог UFA, размещайте бренд на портале, участвуйте в выставках — продвигайте свою франшизу.",
    cta: "Для франчайзеров",
    href: "/membership/franchisors",
  },
  {
    icon: BookOpen,
    title: "Расширяйте знания",
    text: "200+ курсов в UFA Academy, живые семинары, программа CFE и сертификации. Первый месяц — бесплатно.",
    cta: "Образование",
    href: "/education",
  },
];

const benefits = [
  {
    icon: Network,
    title: "Нетворкинг",
    text: "Прямой доступ к 1200+ лидерам отрасли и 500+ брендам.",
  },
  {
    icon: Star,
    title: "Рост",
    text: "Практические знания и инструменты для масштабирования бизнеса.",
  },
  {
    icon: Sparkles,
    title: "Видимость",
    text: "Размещение в каталоге UFA, СМИ и отраслевых публикациях.",
  },
  {
    icon: Heart,
    title: "Влияние",
    text: "Формируйте политику, которая определит будущее отрасли.",
  },
];

const team = [
  {
    name: "Феруза Махмудова",
    role: "Директор по взаимодействию",
    email: "involve@ufa.uz",
    phone: "+998 71 234 57 00",
  },
  {
    name: "Хуршид Абдураимов",
    role: "Координатор волонтёрской программы",
    email: "volunteers@ufa.uz",
    phone: "+998 71 234 57 01",
  },
  {
    name: "Севинч Аминова",
    role: "Менеджер комитетов",
    email: "committees@ufa.uz",
    phone: "+998 71 234 57 02",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-get-involved.jpg"
          alt="Присоединяйтесь к UFA"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Вы делаете франчайзинг лучше
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            UFA — это сообщество людей, которые каждый день делают отрасль
            сильнее. Есть шесть способов включиться в работу, независимо от
            масштаба вашего бизнеса и свободного времени. Выберите тот, что
            подходит именно вам.
          </p>
        </div>
      </section>

      {/* 6 Ways */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Шесть способов включиться
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ways.map((way) => {
              const Icon = way.icon;
              return (
                <div
                  key={way.title}
                  className="bg-[#F4F4F4] rounded-lg p-6 flex flex-col"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {way.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8] mb-6 flex-1">
                    {way.text}
                  </p>
                  <Link
                    href={way.href}
                    className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] hover:underline"
                  >
                    {way.cta} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Benefits */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Что вы получаете
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-lg p-6 text-center"
                >
                  <div className="w-14 h-14 bg-[#F4F4F4] rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-7 h-7 text-[#3ECF8E]" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0B2645]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-heading white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Есть вопрос? Напишите нам
          </h2>
          <p className="text-white/90 text-base leading-[1.8] mb-8 mt-8">
            Команда UFA поможет выбрать формат участия, который подойдёт
            именно вам — как профессионалу и как бизнесу. Первичная
            консультация бесплатна.
          </p>
          <Link
            href="mailto:involve@ufa.uz"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Написать
          </Link>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Команда
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.email}
                className="bg-[#F4F4F4] rounded-lg p-6"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-1">
                  {person.name}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                  {person.role}
                </p>
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${person.email}`}
                    className="block text-[#3ECF8E] hover:underline"
                  >
                    {person.email}
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="block text-gray-600 hover:text-[#3ECF8E] transition-colors"
                  >
                    {person.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
