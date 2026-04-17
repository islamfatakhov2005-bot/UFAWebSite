import Image from "next/image";
import ContactForm from "@/components/public/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с Ассоциацией Франчайзинга Узбекистана — email, телефон, адрес офиса и контакты отделов.",
};

const departments = [
  {
    name: "Бухгалтерия",
    email: "accounting@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Платежи, счета, подтверждение занятости",
  },
  {
    
    email: "advertising@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Рекламные запросы, биллинг, продукты",
  },
  {
    name: "Программа CFE",
    email: "cfe@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Регистрация, проверка кредитов, график мероприятий",
  },
  {
    
    email: "foundation@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Стипендии, программы разнообразия, инициативы",
  },
  {
    name: "Мероприятия и конференции",
    email: "events@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Регистрация, запросы спикеров, кредиты",
  },
  {
    name: "Спонсорство и выставки",
    email: "sales@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Возможности спонсорства и участия в выставках",
  },
  {
    name: "Международное развитие",
    email: "international@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Международное право и торговые вопросы",
  },
  {
    name: "Связи с государством",
    email: "gr@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Адвокация и политическое взаимодействие",
  },
  {
    name: "Членство",
    email: "membership@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Вступление, биллинг, преимущества членства",
  },
  {
    name: "Пресса и СМИ",
    email: "press@uzfranchise.uz",
    phone: "+998 99 200 8272",
    handles: "Запросы СМИ и пресс-пропуска",
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
        <div className="absolute inset-0 bg-[#0B2645]/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-heading text-white white-underline-center !text-white mb-8" style={{ fontSize: "1.5rem" }}>
            Контакты
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-[1.8] mt-8">
            Вы можете связаться с нашими офисами по электронной почте, почте или телефону.
          </p>
        </div>
      </section>

      {/* Primary contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-8">
            Ассоциация Франчайзинга Узбекистана
          </h2>
          <div className="space-y-3 text-[#020409] text-sm leading-[1.8] mt-8">
            <p className="font-semibold">
              г. Ташкент, ул. Амира Темура, 107Б
            </p>
            <p>
              Телефон:{" "}
              <a href="tel:+998992008272" className="text-[#3ECF8E] hover:underline">
                +998 99 200 8272
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@uzfranchise.uz" className="text-[#3ECF8E] hover:underline">
                info@uzfranchise.uz
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Отделы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-[#020409] text-sm leading-[1.8] mb-3">{dept.handles}</p>
                <div className="space-y-1 text-sm">
                  <a
                    href={`mailto:${dept.email}`}
                    className="block text-[#3ECF8E] hover:underline"
                  >
                    {dept.email}
                  </a>
                  <a
                    href={`tel:${dept.phone.replace(/\s/g, "")}`}
                    className="block text-gray-600 hover:text-[#3ECF8E] transition-colors"
                  >
                    {dept.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Для всех остальных вопросов пишите на{" "}
            <a href="mailto:info@uzfranchise.uz" className="text-[#3ECF8E] hover:underline">
              info@uzfranchise.uz
            </a>{" "}
            или звоните по номеру{" "}
            <a href="tel:+998992008272" className="text-[#3ECF8E] hover:underline">
              +998 99 200 8272
            </a>
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Напишите нам
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
