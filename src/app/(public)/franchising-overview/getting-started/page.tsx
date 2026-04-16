import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Начало работы во франчайзинге",
  description: "6 шагов к запуску собственной франшизы: самооценка, исследование, FDD, разговоры с франчайзи, финансирование, подписание.",
};

const steps = [
  {
    title: "Самооценка",
    items: [
      "Готовность работать 50+ часов в неделю первые 2 года",
      "Наличие стартового капитала от 10 млн сум без кредитного плеча",
      "Психологическая готовность следовать стандартам франчайзера",
      "Понимание отрасли, в которой вы планируете работать",
      "Поддержка семьи и близких",
    ],
  },
  {
    title: "Исследование",
    items: [
      "Изучение отраслевых отчётов UFA Impact Report",
      "Сравнение минимум 3 франчайзинговых брендов в категории",
      "Анализ конкурентов на целевой локации",
      "Посещение действующих точек сети как клиент",
      "Участие в Franchise Expo Tashkent и отраслевых мероприятиях",
    ],
  },
  {
    title: "Изучение FDD",
    items: [
      "Получение Franchise Disclosure Document от франчайзера",
      "Проверка финансовой отчётности сети за 3 года",
      "Изучение списка действующих и вышедших франчайзи",
      "Анализ пунктов о роялти, маркетинговом сборе и ограничениях",
      "Консультация с отраслевым юристом",
    ],
  },
  {
    title: "Разговоры с франчайзи",
    items: [
      "Не менее 5 действующих франчайзи сети",
      "Обязательно 1-2 вышедших из сети франчайзи",
      "Вопросы о фактических оборотах, не только обещаниях франчайзера",
      "Обсуждение качества поддержки центрального офиса",
      "Визит в 2-3 точки сети в рабочее время",
    ],
  },
  {
    title: "Обеспечение финансирования",
    items: [
      "Подсчёт полного бюджета: паушальный, ремонт, оборудование, оборотка",
      "Резерв 20-30% от плана на непредвиденные расходы",
      "Рассмотрение банковских программ под франчайзинг",
      "Партнёрство с инвестором как альтернатива кредиту",
      "Утверждение сметы у франчайзера",
    ],
  },
  {
    title: "Подписание договора",
    items: [
      "Ревизия договора юристом, знакомым с франчайзингом",
      "Уточнение территориальной эксклюзивности",
      "Фиксация условий продления и выхода",
      "Обязательная регистрация договора коммерческой концессии",
      "План открытия с чёткими сроками и ответственными",
    ],
  },
];

export default function GettingStartedPage() {
  return (
    <SubPageLayout
      hero={{
        title: "Начало работы во франчайзинге",
        image: "/images/hero-franchise.jpg",
        subtitle: "Шесть последовательных шагов, через которые проходит каждый будущий франчайзи — от самооценки до подписания договора.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/getting-started"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-10">
        {steps.map((step, i) => (
          <section key={step.title}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#3ECF8E] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                {i + 1}
              </div>
              <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-[#1A2332]">
                {step.title}
              </h2>
            </div>
            <ul className="space-y-3 pl-16">
              {step.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#020409] text-sm leading-[1.8]"
                >
                  <span className="w-2 h-2 bg-[#3ECF8E] rounded-full flex-shrink-0 mt-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </SubPageLayout>
  );
}
