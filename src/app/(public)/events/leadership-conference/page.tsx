import EventPageLayout from "@/components/public/EventPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Конференция лидерства",
  description: "Для CEO, владельцев и топ-менеджмента. Стратегия, корпоративное управление, преемственность и построение культуры.",
};

export default function LeadershipConferencePage() {
  return (
    <EventPageLayout
      hero={{
        title: "Leadership Development Conference",
        subtitle: "Для CEO, владельцев и топ-менеджмента франчайзинговых сетей — стратегия, корпоративное управление, преемственность, культура.",
        image: "/images/hero-events.jpg",
      }}
      meta={{
        date: "14 октября 2026",
        location: "Бухара, Amulet Hotel",
        audience: "CEO, founders, топ-менеджмент",
      }}
      intro="Leadership Conference — закрытое мероприятие для первых лиц франчайзинговых компаний. Один день, 60 участников, глубокие разговоры о стратегии, преемственности и построении устойчивого бизнеса."
      sections={[
        {
          title: "Ключевые темы",
          items: [
            "Стратегия роста на горизонте 5–10 лет",
            "Корпоративное управление: совет директоров, комитеты, отчётность",
            "Преемственность власти: передача бизнеса следующему поколению",
            "Построение корпоративной культуры через масштабирование",
            "Выход из операционного управления: перевод на профессиональный менеджмент",
          ],
        },
        {
          title: "Формат",
          items: [
            "Keynote + 3 панельных дискуссии",
            "Закрытая мастер-группа на 10 человек по запросу",
            "Кофе-брейки для нетворкинга",
            "Gala-ужин в историческом центре Бухары",
          ],
        },
      ]}
      cta={{
        title: "Приглашение только",
        text: "Участие по приглашению. Если вас заинтересовала программа — напишите нам.",
        buttonText: "Подать заявку",
        buttonHref: "mailto:leadership@uzfranchise.uz",
      }}
      contacts={[
        { role: "Координатор", email: "events@uzfranchise.uz", phone: "+998 99 200 8272" },
      ]}
    />
  );
}
