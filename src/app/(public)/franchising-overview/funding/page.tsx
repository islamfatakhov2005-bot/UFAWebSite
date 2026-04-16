import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Как финансировать франшизу",
  description: "11 способов финансирования франчайзингового бизнеса — от личных накоплений до специальных программ банков и инвесторов.",
};

const options = [
  {
    title: "Личные накопления",
    text: "Самый распространённый способ. Даёт полный контроль и отсутствие долговой нагрузки. Обычно покрывает 40-50% стартового бюджета.",
  },
  {
    title: "Банковские кредиты SMB",
    text: "Узпромстройбанк, Национальный банк, Ипак Йули — предлагают программы для малого бизнеса под 20-28% годовых с залогом.",
  },
  {
    title: "Специальные программы для франчайзинга",
    text: "Некоторые банки в партнёрстве с франчайзерами предлагают льготные условия для покупателей известных брендов.",
  },
  {
    title: "Финансирование от франчайзера",
    text: "Часть крупных сетей даёт рассрочку паушального взноса или помогает с закупкой оборудования. Обсуждается индивидуально.",
  },
  {
    title: "Инвестор-партнёр",
    text: "Частный инвестор вкладывает капитал в обмен на долю в бизнесе. Работает, если у вас есть опыт и готовность делиться управлением.",
  },
  {
    title: "Залог недвижимости",
    text: "Кредит под залог квартиры, коммерческой недвижимости или земли. Ставки ниже беззалоговых, но есть риск потери имущества.",
  },
  {
    title: "Беззалоговый кредит",
    text: "Быстрое оформление, но высокие ставки (25-35%). Подходит как дополнительный источник оборотных средств, не основной.",
  },
  {
    title: "Лизинг оборудования",
    text: "Оборудование, мебель, машины можно взять в лизинг вместо покупки — снижает стартовые расходы, растягивает платежи на 2-5 лет.",
  },
  {
    title: "Лизинг автопарка",
    text: "Для доставки, такси, услуг на выезде. Отдельная категория с упрощённой процедурой оформления.",
  },
  {
    title: "Краудфандинг",
    text: "Платформы сбора средств от сообщества. Работает для проектов с сильной локальной историей и узнаваемой идеей.",
  },
  {
    title: "Альтернативные источники",
    text: "Венчурные фонды, family offices, бизнес-ангелы. Для масштабных планов (мульти-юнит, мастер-франшиза).",
  },
];

export default function FundingPage() {
  return (
    <SubPageLayout
      hero={{
        title: "Как финансировать франшизу",
        image: "/images/hero-franchise.jpg",
        subtitle: "Обычно запуск франшизы сочетает 2-3 источника финансирования. Вот одиннадцать вариантов, которые работают в Узбекистане.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/funding"
      exploreMore={franchisingExploreMore}
    >
      <article>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((option, i) => (
            <div
              key={option.title}
              className="bg-[#F4F4F4] rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#3ECF8E] rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {option.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </SubPageLayout>
  );
}
