import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Типы франчайзинговых инвестиций",
  description: "Single-Unit, Multi-Unit, Master-Franchising, Area Representative и альтернативные структуры — как выбрать подходящий формат.",
};

const types = [
  {
    title: "Single-Unit (одиночная франшиза)",
    text: "Классический формат: вы открываете и управляете одной точкой. Минимальные стартовые инвестиции, но ограниченный потенциал масштабирования. Подходит для первой франшизы.",
  },
  {
    title: "Multi-Unit (мультиюнит)",
    text: "Вы приобретаете права на открытие нескольких точек в определённом регионе — обычно 3-10 точек с графиком запуска по годам. Скидка на паушальный взнос со второй точки.",
  },
  {
    title: "Master Franchising (мастер-франшиза)",
    text: "Эксклюзивное право развивать сеть в стране или крупном регионе. Мастер-франчайзи выступает как мини-франчайзер: продаёт суб-франшизы, собирает роялти и обучает партнёров.",
  },
  {
    title: "Area Representative (региональный представитель)",
    text: "Гибрид: вы продаёте франшизы в регионе, поддерживаете суб-франчайзи и получаете процент от их оборота. Не требует крупных инвестиций в точки.",
  },
  {
    title: "Conversion Franchise (конверсионная)",
    text: "Франчайзер приобретает существующий независимый бизнес и «конвертирует» его во франшизу. Подходит владельцам действующих кафе, салонов, магазинов.",
  },
];

export default function InvestmentTypesPage() {
  return (
    <SubPageLayout
      hero={{
        title: "Типы франчайзинговых инвестиций",
        image: "/images/hero-franchise.jpg",
        subtitle: "Разные форматы участия во франчайзинге — от одной точки до эксклюзивного развития сети в стране.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/investment-types"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-8">
        {types.map((type) => (
          <section
            key={type.title}
            className="bg-[#F4F4F4] rounded-lg p-8 border-l-4 border-[#3ECF8E]"
          >
            <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-4">
              {type.title}
            </h2>
            <p className="text-[#020409] text-sm leading-[1.8]">{type.text}</p>
          </section>
        ))}
      </article>
    </SubPageLayout>
  );
}
