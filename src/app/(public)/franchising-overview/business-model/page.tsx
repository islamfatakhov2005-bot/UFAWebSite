import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Введение в бизнес-модель франчайзинга",
  description: "Как работает франчайзинг: 5 преимуществ, консистентность бренда, юридическая база и 6-шаговый Roadmap для старта.",
};

const advantages = [
  {
    title: "Проверенная модель",
    text: "Вы начинаете с системы, которая уже прошла проверку рынком. Это снижает предпринимательский риск в первые 3 года работы.",
  },
  {
    title: "Узнаваемый бренд",
    text: "Клиенты приходят к вам потому, что знают и доверяют бренду франчайзера. Не нужно выстраивать узнаваемость с нуля.",
  },
  {
    title: "Централизованный маркетинг",
    text: "Франчайзер отвечает за национальные рекламные кампании, цифровое продвижение и PR — вы получаете поток клиентов.",
  },
  {
    title: "Обучение и поддержка",
    text: "Вы не остаётесь один на один с операционными вопросами. Команда франчайзера обучает персонал и помогает на старте.",
  },
  {
    title: "Закупочные условия",
    text: "Оптовые цены от поставщиков благодаря объёму всей сети. Это даёт запас прочности в себестоимости и рентабельности.",
  },
];

const roadmap = [
  "Самооценка: готовы ли вы к модели франчайзинга",
  "Исследование рынка и выбор категории",
  "Изучение FDD (Franchise Disclosure Document)",
  "Разговоры с 5-10 действующими франчайзи сети",
  "Обеспечение финансирования",
  "Подписание договора с юристом и открытие точки",
];

export default function BusinessModelPage() {
  return (
    <SubPageLayout
      hero={{
        title: "Введение в бизнес-модель франчайзинга",
        image: "/images/hero-franchise.jpg",
        subtitle: "Франчайзинг — проверенная бизнес-модель для тех, кто хочет начать собственное дело с минимальным риском и максимальной поддержкой.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/business-model"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-10">
        <section>
          <h2 className="section-heading green-underline mb-6">Как работает</h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6">
            Франчайзер разрабатывает и оттачивает бизнес-модель, строит бренд и
            создаёт операционные стандарты. Затем, вместо того чтобы открывать
            все точки самостоятельно, продаёт право использовать систему
            предпринимателям — франчайзи. Франчайзи инвестируют собственные
            средства в открытие точек и ведут ежедневные операции, а франчайзер
            получает паушальный взнос и регулярные роялти.
          </p>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Пять преимуществ для франчайзи
          </h2>
          <div className="space-y-4 mt-6">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="flex gap-4 bg-[#F4F4F4] rounded-lg p-5"
              >
                <div className="w-10 h-10 bg-[#3ECF8E] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {adv.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Консистентность бренда
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6">
            Ключевая ценность франчайзинга — единый клиентский опыт во всех
            точках сети. Клиент в Ташкенте получает ту же продукцию и уровень
            сервиса, что и клиент в Самарканде или Фергане. Это достигается
            жёсткими стандартами операций, регулярными аудитами и обязательным
            обучением персонала.
          </p>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Юридическая база в Узбекистане
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6">
            В Узбекистане франчайзинговые отношения регулируются главой 54
            Гражданского кодекса («Коммерческая концессия») и нормативными
            актами о защите товарных знаков. Договор коммерческой концессии
            подлежит обязательной регистрации. UFA работает над полноценным
            отраслевым законом, который введёт стандарты раскрытия информации
            (FDD) по международным практикам.
          </p>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Getting Started Roadmap: 6 шагов
          </h2>
          <div className="space-y-4 mt-6">
            {roadmap.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[#3ECF8E] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-[#020409] text-sm leading-[1.8] pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </SubPageLayout>
  );
}
