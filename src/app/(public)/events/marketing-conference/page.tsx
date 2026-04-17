import EventPageLayout from "@/components/public/EventPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Конференция роста и маркетинга",
  description: "Для CMO, директоров по развитию и маркетологов. Performance-маркетинг, лидогенерация, брендинг и рекрутинг франчайзи.",
};

export default function MarketingConferencePage() {
  return (
    <EventPageLayout
      hero={{
        title: "Growth & Marketing Conference",
        subtitle: "Ключевое мероприятие для CMO, маркетологов и директоров по развитию сетей. Рекрутинг франчайзи, performance-маркетинг, брендинг.",
        image: "/images/hero-events.jpg",
      }}
      meta={{
        date: "20–22 сентября 2026",
        location: "Hotel Uzbekistan, Ташкент",
        audience: "CMO, маркетинг и развитие",
      }}
      intro="Growth & Marketing Conference — место, где лидеры маркетинга франчайзинговых сетей делятся работающими инструментами. Три дня выступлений, мастер-классов, разбор реальных кампаний с цифрами и бюджетами."
      sections={[
        {
          title: "Треки",
          items: [
            "Рекрутинг франчайзи: воронка от лида до подписанного договора",
            "Performance-маркетинг: Google Ads, Meta, TikTok, Telegram — что работает в UZ",
            "Брендинг сети: как поддерживать единый стандарт через 50+ точек",
            "CRM для франчайзи: инструменты, процессы, роль центрального офиса",
            "Контент-маркетинг: блоги, подкасты, YouTube каналы франчайзеров",
          ],
        },
        {
          title: "Спикеры",
          items: [
            "Марк Тажиев — CMO крупнейшей сети пиццерий в СНГ",
            "Лидия Морозова — основатель Marketing Franchise Collective",
            "Эмма Йылдыз — Head of Growth, международный ритейл-бренд",
            "Абдуррахман Мамедов — CEO digital-агентства для франшиз",
            "Ферузa Давлатова — директор по рекрутингу франчайзи",
          ],
        },
      ]}
      cta={{
        title: "Регистрация открыта",
        text: "Скидка 40% для членов UFA. Мест в зале: 400.",
        buttonText: "Зарегистрироваться",
        buttonHref: "/contact",
      }}
      contacts={[
        { role: "PR и коммуникации", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
        { role: "Директор по мероприятиям", email: "info@uzfranchise.uz", phone: "+998 99 200 8272" },
      ]}
    />
  );
}
