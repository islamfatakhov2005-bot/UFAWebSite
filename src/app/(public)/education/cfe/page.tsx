import EventPageLayout from "@/components/public/EventPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Программа CFE",
  description: "Certified Franchise Executive — золотой стандарт сертификации в индустрии франчайзинга. Программа UFA признаётся IFA.",
};

export default function CfePage() {
  return (
    <EventPageLayout
      hero={{
        title: "Certified Franchise Executive (CFE)",
        subtitle: "Золотой стандарт профессиональной сертификации во франчайзинге. Программа UFA соответствует стандартам IFA и признаётся в 40+ странах.",
        image: "/images/hero-education.jpg",
      }}
      meta={{
        date: "12–18 месяцев обучения",
        location: "Онлайн + очные модули",
        audience: "Топ-менеджмент, юристы, консультанты",
      }}
      intro="Программа CFE — самая престижная сертификация в отрасли. Она подтверждает экспертизу в юриспруденции, финансах, операциях, маркетинге и международной экспансии франчайзинга. Выпускники получают звание Certified Franchise Executive, признаваемое по всему миру."
      sections={[
        {
          title: "Структура программы",
          items: [
            "Обязательные модули: Fran-Guard (этика) и Foundations (основы) — 40 часов",
            "Элективные курсы: 120 часов из каталога UFA Academy",
            "Участие в мероприятиях: минимум 3 конференции UFA или IFA за 2 года",
            "Итоговый проект: кейс-разбор или исследование по вашей отрасли",
            "Финальный экзамен: 100 вопросов, 3 часа, очно или под прокторингом",
          ],
        },
        {
          title: "Преимущества CFE",
          items: [
            "Признание на международном рынке франчайзинга",
            "Доступ к закрытому сообществу CFE — 30 000+ выпускников по всему миру",
            "Ежегодный CFE Summit в США с приоритетным приглашением",
            "Значок CFE в LinkedIn и подписи в email",
            "Право преподавать в UFA Academy и других программах ассоциации",
          ],
        },
        {
          title: "Как поступить",
          items: [
            "Шаг 1: Регистрация аккаунта на портале UFA",
            "Шаг 2: Заполнение заявки CFE и оплата вступительного взноса",
            "Шаг 3: Прохождение обязательных модулей (Fran-Guard + Foundations)",
            "Шаг 4: Выбор элективных курсов из каталога UFA Academy",
            "Шаг 5: Участие в конференциях и итоговый экзамен",
          ],
        },
      ]}
      resources={[
        {
          title: "Foundations of Franchising",
          text: "Обязательный вводный курс. Доступен всем зарегистрированным.",
          href: "/education",
          cta: "Пройти",
        },
        {
          title: "Fran-Guard",
          text: "Курс по этике и ответственной практике франчайзинга.",
          href: "/education",
          cta: "Записаться",
        },
        {
          title: "CFE Handbook",
          text: "Полное руководство программы — 40 страниц PDF.",
          href: "/resources/cfe-handbook.pdf",
          cta: "Скачать",
        },
      ]}
      cta={{
        title: "Записаться на программу CFE",
        text: "Стоимость для членов UFA: 18 000 000 сум. Для не-членов: 28 000 000 сум. Оплата возможна в рассрочку.",
        buttonText: "Записаться",
        buttonHref: "mailto:cfe@uzfranchise.uz",
      }}
      contacts={[
        { role: "Менеджер программы CFE", email: "cfe@uzfranchise.uz", phone: "+998 99 200 8272" },
        { role: "Директор по образованию", email: "education@uzfranchise.uz", phone: "+998 99 200 8272" },
      ]}
    />
  );
}
