import EventPageLayout from "@/components/public/EventPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise Expo 2026",
  description: "Главная франчайзинговая выставка Центральной Азии — 150+ брендов, 3000+ посетителей, два дня демо-стендов и инвестиционных сессий в Hyatt Regency Tashkent.",
};

export default function ExpoPage() {
  return (
    <EventPageLayout
      hero={{
        title: "Franchise Expo 2026",
        subtitle: "Крупнейшая франчайзинговая выставка Центральной Азии. 150+ брендов из 25 стран, 3000+ посетителей, инвестиционные сессии.",
        image: "/images/hero-events.jpg",
      }}
      meta={{
        date: "18–19 апреля 2026",
        location: "Hyatt Regency Tashkent",
        audience: "Франчайзеры, инвесторы, регуляторы",
      }}
      intro="Franchise Expo 2026 — главное событие для поиска или представления франшизы в Узбекистане. Два дня в Hyatt Regency Tashkent, демо-стенды брендов, инвестиционные сессии с лидами на месте, деловые переговоры с регуляторами."
      sections={[
        {
          title: "Для посетителей",
          items: [
            "Более 150 брендов из 25 стран на одной площадке",
            "Инвестиционные сессии 1:1 с командой каждой сети",
            "Open Franchise Day — экскурсия в действующие точки участников",
            "Бесплатные консультации юристов, финансистов, брокеров",
            "Лотерея — грант 50 млн сум на запуск франшизы",
          ],
        },
        {
          title: "Для брендов",
          items: [
            "Стенд 6–24 м² с брендированием",
            "Pitch-session на главной сцене",
            "Включение в каталог Expo и рассылку 30K+ подписчиков",
            "Матчмейкинг: UFA связывает вас с целевой аудиторией потенциальных франчайзи",
            "Публикация кейса в журнале «Франчайзинг» по итогам выставки",
          ],
        },
      ]}
      resources={[
        {
          title: "Спонсорские пакеты",
          text: "От бронзового стенда до титульного спонсора — индивидуальные условия.",
          href: "mailto:sales@uzfranchise.uz",
          cta: "Запросить брошюру",
        },
        {
          title: "Билеты для посетителей",
          text: "Однодневный вход: 100 000 сум. 3 дня: 250 000 сум. Члены UFA — бесплатно.",
          href: "/contact",
          cta: "Купить билет",
        },
        {
          title: "Autumn Expo",
          text: "20 ноября 2026 — второй выпуск выставки в этом году.",
          href: "/events/calendar",
          cta: "Календарь",
        },
      ]}
      cta={{
        title: "Забронировать стенд",
        text: "Ранние тарифы действуют до 28 февраля 2026. После — стандартная сетка цен.",
        buttonText: "Забронировать",
        buttonHref: "mailto:expo@uzfranchise.uz",
      }}
      contacts={[
        { role: "Менеджер выставок", email: "expo@uzfranchise.uz", phone: "+998 99 200 8272" },
        { role: "Спонсорство", email: "sales@uzfranchise.uz", phone: "+998 99 200 8272" },
        { role: "Регистрация", email: "registration@uzfranchise.uz", phone: "+998 99 200 8272" },
      ]}
    />
  );
}
