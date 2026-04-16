import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Что такое франшиза",
  description: "Определение франшизы, формат бизнеса, дистрибуция продукции и контрактные отношения — подробный разбор от UFA.",
};

const stats = [
  { value: "90%", label: "довольны работой франчайзи" },
  { value: "88%", label: "довольны выбором сети" },
  { value: "85%", label: "позитивно оценивают бренд" },
  { value: "82%", label: "повторно выбрали бы франшизу" },
];

const support = [
  "Стандартизированные процессы и операционные инструкции",
  "Обучение команды перед открытием и на ежегодной основе",
  "Маркетинг и PR-активность централизованного офиса",
  "Единая CRM, ERP и система отчётности",
  "Закупочные условия от проверенных поставщиков",
  "Юридическая и налоговая поддержка",
];

export default function WhatIsAFranchisePage() {
  return (
    <SubPageLayout
      hero={{
        title: "Что такое франшиза",
        image: "/images/hero-franchise.jpg",
        subtitle: "Франшиза — это система, в которой владелец бренда передаёт проверенную бизнес-модель предпринимателям в обмен на паушальный взнос и роялти.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/what-is-a-franchise"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-10">
        <section>
          <h2 className="section-heading green-underline mb-6">Определение</h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6">
            Франшиза — это коммерческое соглашение и тип деловых отношений, при
            которых одна сторона (франчайзер) предоставляет другой стороне
            (франчайзи) право использовать её торговую марку, систему ведения
            бизнеса и операционные стандарты. Франчайзер получает доход от
            паушального взноса и регулярных роялти, а франчайзи — готовый
            бизнес с проверенной моделью и поддержкой.
          </p>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Формат бизнеса (Business Format)
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6">
            Самый распространённый тип франшизы в Узбекистане. Франчайзер
            предоставляет не только бренд, но и полную операционную систему:
            технологические карты, стандарты обслуживания, планировку помещения,
            закупочные контракты, маркетинговые материалы, обучение персонала
            и централизованную поддержку.
          </p>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Дистрибуция продукции (Product Distribution)
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6">
            Формат, при котором франчайзи продаёт продукцию франчайзера под его
            брендом — автодилеры, автозаправочные станции, дистрибьюторы
            напитков. Отношения ближе к традиционному дистрибьюторству, чем к
            полноформатной франшизе.
          </p>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Поддержка франчайзера
          </h2>
          <ul className="space-y-3 mt-6">
            {support.map((item) => (
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

        <section>
          <h2 className="section-heading green-underline mb-6">
            Статистика удовлетворённости
          </h2>
          <p className="text-[#020409] text-sm leading-[1.8] mt-6 mb-6">
            Исследование UFA Franchise Business Review 2025 показывает, что
            подавляющее большинство франчайзи в Узбекистане положительно
            оценивают выбор франчайзинговой модели.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#F4F4F4] rounded-lg p-6 text-center"
              >
                <div className="text-3xl font-bold text-[#3ECF8E] mb-2">
                  {stat.value}
                </div>
                <p className="text-[#020409] text-xs leading-[1.6]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </SubPageLayout>
  );
}
