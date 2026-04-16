import SubPageLayout from "@/components/public/SubPageLayout";
import {
  franchisingSidebar,
  franchisingExploreMore,
} from "@/lib/franchising-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Гид по продавцам франшиз",
  description: "Познакомьтесь с тремя типами продавцов франшиз: менеджер франчайзера, независимый брокер и франчайзинговая организация продаж.",
};

const sellers = [
  {
    title: "Менеджер франчайзера",
    text: "Сотрудник центрального офиса франчайзера, работающий на бренд. Знает продукт глубоко, заинтересован в долгосрочных партнёрах. Прозрачная зарплата или процент от успешной сделки.",
    icon: "01",
  },
  {
    title: "Независимый брокер",
    text: "Агент, работающий с несколькими брендами. Получает комиссию от франчайзера при успешной продаже. Может быть полезен для сравнения вариантов, но имеет конфликт интересов — продаёт то, что лучше оплачивается.",
    icon: "02",
  },
  {
    title: "Франчайзинговая организация продаж (FSO)",
    text: "Специализированная компания, которую франчайзер нанимает для масштабных продаж франшиз. Работает по тем же принципам, что брокер, но с корпоративной структурой и обязательствами.",
    icon: "03",
  },
];

const questions = [
  "Вы работаете напрямую на франчайзера или как независимый посредник?",
  "Как рассчитывается ваше вознаграждение за эту сделку?",
  "Сколько франшиз этого бренда вы продали за последний год?",
  "Можете ли вы связать меня с 3 франчайзи, купившими через вас?",
  "Какие 2-3 альтернативы в категории вы считаете сильными конкурентами?",
  "Каким был последний случай, когда вы отговорили кого-то от покупки?",
  "Что произойдёт с нашими отношениями после подписания договора?",
];

const verification = [
  {
    title: "Проверка лицензий",
    text: "Запросите регистрационные документы компании-посредника и подтверждение её полномочий от франчайзера.",
  },
  {
    title: "Проверка истории",
    text: "Поищите информацию о продавце в UFA, у действующих франчайзи и через открытые источники.",
  },
  {
    title: "Подтверждение у бренда",
    text: "Позвоните напрямую в головной офис франчайзера и уточните, действительно ли этот человек уполномочен продавать франшизы.",
  },
];

export default function SellersGuidePage() {
  return (
    <SubPageLayout
      hero={{
        title: "Познакомьтесь с продавцами вашей франшизы",
        image: "/images/hero-franchise.jpg",
        subtitle: "Понимание того, кто и как продаёт вам франшизу — ключ к безопасной сделке и долгосрочным отношениям с брендом.",
      }}
      sidebar={franchisingSidebar}
      activeHref="/franchising-overview/sellers-guide"
      exploreMore={franchisingExploreMore}
    >
      <article className="space-y-12">
        <section>
          <h2 className="section-heading green-underline mb-6">
            Три типа продавцов
          </h2>
          <div className="space-y-4 mt-6">
            {sellers.map((seller) => (
              <div
                key={seller.title}
                className="bg-[#F4F4F4] rounded-lg p-8 flex gap-6 items-start"
              >
                <div className="text-4xl font-bold text-[#3ECF8E] leading-none flex-shrink-0">
                  {seller.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-3">
                    {seller.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8]">
                    {seller.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Семь вопросов продавцу
          </h2>
          <ol className="space-y-3 mt-6">
            {questions.map((q, i) => (
              <li
                key={i}
                className="flex gap-4 bg-[#F4F4F4] rounded-lg p-5"
              >
                <span className="text-2xl font-bold text-[#3ECF8E] leading-none flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-[#020409] text-sm leading-[1.8]">{q}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="section-heading green-underline mb-6">
            Три шага верификации
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {verification.map((step, i) => (
              <div
                key={step.title}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="text-3xl font-bold text-[#3ECF8E] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#020409] text-sm leading-[1.8]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </SubPageLayout>
  );
}
