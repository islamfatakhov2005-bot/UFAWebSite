import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вопросы перед покупкой франшизы",
  description: "15 вопросов, которые нужно задать себе и франчайзеру до подписания договора — шесть личных и девять практических.",
};

const personal = [
  "Готов ли я работать в жёстко стандартизированной системе, где многое уже решено за меня?",
  "Есть ли у меня стартовый капитал + 6 месяцев личной подушки на непредвиденное?",
  "Имею ли я опыт в отрасли или хотя бы сильное понимание её специфики?",
  "Готов ли я лично быть в точке первые 1-2 года, не перепоручая операции?",
  "Поддерживает ли моя семья выбор этого бизнеса и нагрузки, связанной с ним?",
  "Способен ли я следовать стандартам без постоянного желания «улучшить по-своему»?",
];

const practical = [
  "Каковы полные стартовые инвестиции, включая ремонт, оборудование и 3 месяца оборотки?",
  "Какой реальный срок окупаемости по действующим точкам сети в похожих городах?",
  "Сколько процентов составляют роялти и маркетинговый сбор? Как они рассчитываются?",
  "Есть ли территориальная эксклюзивность и на каких условиях?",
  "Какая поддержка оказывается после открытия — обучение, аудиты, маркетинг?",
  "Каковы условия продления договора и выхода из сети до срока?",
  "Сколько франчайзи за последние 3 года вышли из сети и почему?",
  "Есть ли обязательные поставщики и можно ли использовать локальные альтернативы?",
  "Каковы штрафные санкции за нарушение стандартов или просрочку роялти?",
];

export default function QuestionsPage() {
  return (
    <SubPageLayout
      hero={{
        title: "Вопросы перед покупкой франшизы",
        image: "/images/hero-franchise.jpg",
        subtitle: "15 вопросов — 6 себе и 9 франчайзеру — которые помогают принять обоснованное решение и избежать разочарования.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/questions"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-12">
        <section>
          <h2 className="section-heading green-underline mb-6">
            Шесть вопросов себе
          </h2>
          <ol className="space-y-4 mt-6">
            {personal.map((q, i) => (
              <li
                key={i}
                className="flex gap-4 bg-[#F4F4F4] rounded-lg p-5"
              >
                <span className="text-3xl font-bold text-[#3ECF8E] flex-shrink-0 leading-none">
                  {i + 1}
                </span>
                <p className="text-[#020409] text-sm leading-[1.8] pt-1">
                  {q}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Девять вопросов франчайзеру
          </h2>
          <ol className="space-y-4 mt-6">
            {practical.map((q, i) => (
              <li
                key={i}
                className="flex gap-4 bg-[#F4F4F4] rounded-lg p-5"
              >
                <span className="text-3xl font-bold text-[#3ECF8E] flex-shrink-0 leading-none">
                  {i + 1}
                </span>
                <p className="text-[#020409] text-sm leading-[1.8] pt-1">
                  {q}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </SubPageLayout>
  );
}
