import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Плюсы и минусы покупки франшизы",
  description: "Честный разбор сильных и слабых сторон франчайзинговой модели — что вы получаете и чем жертвуете.",
};

const pros = [
  {
    title: "Узнаваемость бренда",
    text: "Клиенты приходят сразу — не нужно выстраивать известность. В Узбекистане это особенно ценно для региональных городов.",
  },
  {
    title: "Готовая клиентская база",
    text: "Лояльность к бренду переносится с другого города. Ваша задача — удержать стандарт сервиса.",
  },
  {
    title: "Быстрый старт",
    text: "От подписания договора до открытия обычно 3-6 месяцев. Франчайзер помогает с планировкой, закупками, наймом.",
  },
  {
    title: "Постоянная поддержка",
    text: "Централизованный маркетинг, обучение, бизнес-аналитика, закупочные условия и юридическая поддержка.",
  },
];

const cons = [
  {
    title: "Потеря независимости",
    text: "Вы обязаны следовать стандартам франчайзера: меню, дизайн, ценообразование, поставщики. Собственные эксперименты невозможны.",
  },
  {
    title: "Зависимость от бренда",
    text: "Если бренд франчайзера попадает в кризис или скандал, это бьёт по всем точкам сети, включая вашу.",
  },
  {
    title: "Другие франчайзи",
    text: "Неудачные точки в сети влияют на репутацию бренда и ваши продажи. У вас нет контроля над качеством коллег.",
  },
  {
    title: "Завышенные ожидания",
    text: "Обещанные обороты могут не совпасть с реальностью в вашем регионе. Требуется тщательная проверка финансовой модели.",
  },
  {
    title: "Негибкость",
    text: "Изменения в меню, процессах или позиционировании требуют согласования с франчайзером. Быстро адаптироваться к локальному рынку сложно.",
  },
];

export default function ProsAndConsPage() {
  return (
    <SubPageLayout
      hero={{
        title: "Плюсы и минусы покупки франшизы",
        image: "/images/hero-franchise.jpg",
        subtitle: "Честный взгляд на преимущества и компромиссы франчайзинговой модели — чтобы принять взвешенное решение.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/pros-and-cons"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-12">
        <section>
          <h2 className="section-heading green-underline mb-6">
            Преимущества (4)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {pros.map((item) => (
              <div
                key={item.title}
                className="bg-[#F4F4F4] rounded-lg p-6 border-l-4 border-[#3ECF8E]"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Недостатки (5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {cons.map((item) => (
              <div
                key={item.title}
                className="bg-[#F4F4F4] rounded-lg p-6 border-l-4 border-[#0B2645]"
              >
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#0B2645] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </SubPageLayout>
  );
}
