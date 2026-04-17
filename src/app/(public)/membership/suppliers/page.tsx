import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Членство для поставщиков",
  description: "Для юристов, IT-компаний, маркетологов, финансистов и других поставщиков услуг франчайзинговой отрасли — прямой выход на лиц, принимающих решения.",
};

const benefits = [
  {
    title: "Продажи",
    items: [
      "Размещение в справочнике Preferred Vendors UFA",
      "Лиды от франчайзеров и франчайзи напрямую",
      "Возможность спонсорства мероприятий и конференций",
      "Публикация экспертных материалов в журнале UFA",
      "Участие в B2B-встречах и закрытых сессиях",
    ],
  },
  {
    title: "Экспертиза",
    items: [
      "Доступ к исследованиям и отчётам UFA",
      "Участие в рабочих группах по регулированию",
      "Вебинары с аналитикой рынка для поставщиков",
      "Образовательные программы UFA Academy",
      "Сертификация Preferred Supplier Badge",
    ],
  },
  {
    title: "Сообщество",
    items: [
      "Эксклюзивный Suppliers Council — встречи 4 раза в год",
      "Региональные нетворкинги с владельцами сетей",
      "Ежегодная конвенция UFA — ваша аудитория на одной площадке",
      "Закрытые WhatsApp и Telegram группы участников",
      "Знакомства с международными партнёрами через WFC",
    ],
  },
  {
    title: "Влияние",
    items: [
      "Участие в выработке отраслевых стандартов",
      "Обратная связь по регуляторным инициативам",
      "Присутствие на Advocacy Summit как спикер",
      "Возможность предлагать темы для отраслевых исследований",
      "Представление интересов в отраслевой повестке",
    ],
  },
];

const categories = [
  "Юридические услуги",
  "Финансы и банки",
  "IT и разработка",
  "Маркетинг и реклама",
  "Консалтинг",
  "Коммерческая недвижимость",
  "Оборудование и мебель",
  "HR и рекрутинг",
  "Образование",
  "Дизайн интерьеров",
];

const team = [
  { role: "Менеджер для поставщиков", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Координатор Preferred Vendors", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Менеджер спонсорства", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
];

export default function SuppliersMembershipPage() {
  return (
    <>
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-membership.jpg"
          alt="Членство для поставщиков"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/75" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.2] mb-4">
            Членство для поставщиков
          </h1>
          <div className="w-16 h-1 bg-[#3ECF8E] mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/90 leading-[1.7] mb-8 max-w-3xl mx-auto">
            Для компаний, обслуживающих франчайзинговую отрасль. Прямой выход
            на 500+ брендов и 1200+ владельцев точек — самая концентрированная
            B2B-аудитория страны.
          </p>
          <Link
            href="/registration"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Подать заявку
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Кого мы принимаем
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-[#F4F4F4] rounded-lg p-4 text-center text-sm font-semibold text-[#0B2645]"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Четыре категории преимуществ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((cat) => (
              <div key={cat.title} className="bg-white rounded-lg p-8">
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-4">
                  {cat.title}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[#020409] text-sm leading-[1.8]"
                    >
                      <span className="w-2 h-2 bg-[#3ECF8E] rounded-full flex-shrink-0 mt-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading green-underline-center mb-4">
            Стоимость членства
          </h2>
          <div className="bg-[#F4F4F4] rounded-lg p-10 mt-8">
            <p className="text-[#020409] text-sm leading-[1.8] mb-6">
              Взнос для поставщиков
            </p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-[#3ECF8E]">
                15 000 000
              </span>
              <span className="text-lg text-gray-500 ml-3">сум / год</span>
            </div>
            <p className="text-[#020409] text-sm leading-[1.8] mb-8">
              Включает все преимущества членства и приоритетное размещение в
              справочнике Preferred Vendors UFA. Дополнительные пакеты
              спонсорства обсуждаются индивидуально.
            </p>
            <Link
              href="/registration"
              className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Подать заявку
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Контакты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.email}
                className="bg-white rounded-lg p-6"
              >
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
