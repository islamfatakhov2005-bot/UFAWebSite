import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Членство для франчайзеров",
  description: "Преимущества членства UFA для владельцев брендов — лиды, исследования, маркетинг, юридическая поддержка, голос в отрасли.",
};

const benefits = [
  {
    title: "Развивайте бизнес",
    items: [
      "Размещение бренда в каталоге UFA (более 500 000 просмотров в год)",
      "Лиды от потенциальных франчайзи из 14 регионов страны",
      "Участие в Franchise Expo Tashkent на специальных условиях",
      "Рекомендации для иностранных брендов, выходящих в Узбекистан",
      "Доступ к программе Ascension для ускоренного роста",
    ],
  },
  {
    title: "Исследования и аналитика",
    items: [
      "Ежегодный Franchisor Survey UFA — 1200+ респондентов",
      "Отраслевая аналитика по категориям и регионам",
      "Бенчмаркинг по ключевым операционным метрикам",
      "Data-driven отчёты Impact Report и Economic Outlook",
      "Доступ к международной базе Franchise Business Review",
    ],
  },
  {
    title: "Образование",
    items: [
      "Корпоративные программы Custom Labs под ваши задачи",
      "UFA Academy для всей команды — 200+ курсов",
      "Программа Foundations для новых франчайзеров",
      "Сертификация Fran-Guard по этике и комплаенсу",
      "Signature Series — закрытые сессии от лидеров отрасли",
    ],
  },
  {
    title: "Сообщество",
    items: [
      "Комитеты и рабочие группы по отраслям и темам",
      "Программа менторства FranShip для команды",
      "Региональные встречи в 10 регионах страны",
      "Ежегодная конвенция UFA — 1500+ участников",
      "Global Connections — партнёрство с IFA и WFC",
    ],
  },
  {
    title: "Адвокация",
    items: [
      "Прямое участие в формировании отраслевой повестки",
      "Представление интересов в Олий Мажлисе и министерствах",
      "Юридический центр UFA для сложных кейсов",
      "Законодательные инициативы по налогам и регистрации",
      "Защита модели «независимый франчайзи» в трудовом праве",
    ],
  },
];

const pricing = [
  { tier: "До 5 точек", price: "7 500 000" },
  { tier: "6–15 точек", price: "12 000 000" },
  { tier: "16–30 точек", price: "18 000 000" },
  { tier: "31–60 точек", price: "25 000 000" },
  { tier: "61–100 точек", price: "35 000 000" },
  { tier: "Свыше 100 точек", price: "45 000 000" },
];

const team = [
  { role: "Менеджер для франчайзеров", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Директор по членству", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
  { role: "Специалист по работе с участниками", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
];

export default function FranchisorsMembershipPage() {
  return (
    <>
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-membership.jpg"
          alt="Членство для франчайзеров"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B2645]/75" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.2] mb-4">
            Членство для франчайзеров
          </h1>
          <div className="w-16 h-1 bg-[#3ECF8E] mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/90 leading-[1.7] mb-8 max-w-3xl mx-auto">
            UFA — инструмент роста для владельцев брендов. Прямой выход на
            тысячи потенциальных франчайзи, маркетинговые возможности, данные
            отрасли и голос в политической повестке.
          </p>
          <Link
            href="/membership/apply"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Подать заявку
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-16">
            Пять категорий преимуществ
          </h2>
          <div className="space-y-10">
            {benefits.map((cat) => (
              <div
                key={cat.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <h3 className="md:col-span-4 text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645]">
                  {cat.title}
                </h3>
                <ul className="md:col-span-8 space-y-3">
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

      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-4">
            Тарифы для франчайзеров
          </h2>
          <p className="text-center text-[#020409] text-sm leading-[1.8] mb-12 mt-8">
            Размер взноса зависит от количества действующих точек сети.
            Все тарифы включают полный набор преимуществ членства.
          </p>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0B2645] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.08em]">
                    Размер сети
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.08em]">
                    Ежегодный взнос
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricing.map((row) => (
                  <tr key={row.tier}>
                    <td className="px-6 py-4 text-[#020409] text-sm">
                      {row.tier}
                    </td>
                    <td className="px-6 py-4 text-right text-[#0B2645] font-bold text-sm">
                      {row.price} сум / год
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/membership/apply"
              className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
            >
              Подать заявку
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-heading green-underline-center text-center mb-12">
            Контакты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div
                key={person.email}
                className="bg-[#F4F4F4] rounded-lg p-6"
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
