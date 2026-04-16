import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Должная осмотрительность",
  description: "Шесть этапов проверки франшизы — от анализа FDD до визитов в действующие точки. Чек-лист due diligence для будущих франчайзи.",
};

const steps = [
  {
    title: "Анализ FDD",
    text: "Franchise Disclosure Document — главный документ сделки. Изучите финансовые показатели сети, список франчайзи, судебные разбирательства, обязательные поставщики и ограничения. Обязательно с юристом.",
  },
  {
    title: "Разговоры с франчайзи",
    text: "Минимум 5 действующих партнёров и 1-2 вышедших. Реальные обороты, сезонность, конфликты с центральным офисом, скрытые расходы — всё, о чём не пишут в презентациях.",
  },
  {
    title: "Оценка полных затрат",
    text: "Считайте не только паушальный взнос. Добавьте ремонт, оборудование, первоначальный закуп, маркетинг открытия, зарплаты первых 3 месяцев и личный резерв.",
  },
  {
    title: "Анализ рынка",
    text: "Сколько конкурентов на вашей локации? Какой платёжеспособный спрос? Есть ли сезонность? Изучите Impact Report UFA и отраслевые данные по вашему городу.",
  },
  {
    title: "Оценка поддержки",
    text: "Команда центрального офиса, частота обучающих программ, маркетинговый календарь, IT-системы. Посетите головной офис франчайзера и посмотрите внутреннюю кухню.",
  },
  {
    title: "Консультации специалистов",
    text: "Юрист (договор коммерческой концессии), налоговый консультант, отраслевой эксперт UFA, банкир по финансированию. Не экономьте на профессиональных консультациях.",
  },
];

export default function DiligencePage() {
  return (
    <SubPageLayout
      hero={{
        title: "Должная осмотрительность во франчайзинге",
        image: "/images/hero-franchise.jpg",
        subtitle: "Шесть шагов проверки, через которые должен пройти каждый будущий франчайзи — до того, как вы подпишете договор и внесёте средства.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/diligence"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-6">
        {steps.map((step, i) => (
          <section
            key={step.title}
            className="bg-[#F4F4F4] rounded-lg p-8"
          >
            <div className="flex items-start gap-6">
              <div className="text-5xl font-bold text-[#3ECF8E] leading-none flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                  {step.title}
                </h2>
                <p className="text-[#020409] text-sm leading-[1.8]">
                  {step.text}
                </p>
              </div>
            </div>
          </section>
        ))}
      </article>
    </SubPageLayout>
  );
}
