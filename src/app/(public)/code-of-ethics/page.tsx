import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  FileCheck,
  Scale,
  Users,
  Eye,
  Lock,
  Handshake,
  BookOpen,
  Leaf,
  Heart,
  ClipboardCheck,
  CalendarCheck,
  MessageSquare,
  Gavel,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кодекс этики — UFA",
  description:
    "Кодекс этики франчайзинга Ассоциации Франчайзинга Узбекистана. Принципы добросовестности, прозрачности и ответственного ведения франчайзингового бизнеса.",
};

const principles = [
  {
    icon: Eye,
    title: "Добросовестное раскрытие информации",
    description:
      "Франчайзеры обязаны предоставлять потенциальным франчайзи полную и достоверную информацию о бизнес-модели, финансовых показателях и условиях договора. Любые существенные факты, влияющие на принятие решения, должны быть раскрыты до подписания соглашения.",
  },
  {
    icon: FileCheck,
    title: "Прозрачность финансовых отношений",
    description:
      "Все финансовые обязательства, включая роялти, рекламные взносы и иные платежи, должны быть чётко определены и обоснованы. Франчайзеры обязаны регулярно отчитываться об использовании маркетинговых фондов и общих финансовых средств.",
  },
  {
    icon: Shield,
    title: "Защита интеллектуальной собственности",
    description:
      "Участники обязуются уважать и защищать интеллектуальную собственность друг друга. Товарные знаки, ноу-хау и конфиденциальная информация должны использоваться строго в рамках франчайзингового соглашения.",
  },
  {
    icon: Users,
    title: "Поддержка франчайзи",
    description:
      "Франчайзеры принимают на себя обязательства по обучению, консультированию и операционной поддержке франчайзи. Система поддержки должна быть доступна на всех этапах — от запуска до масштабирования бизнеса.",
  },
  {
    icon: Scale,
    title: "Ответственный маркетинг",
    description:
      "Запрещается использование вводящих в заблуждение заявлений о доходах, успешности или перспективах франшизы. Вся маркетинговая информация должна быть подтверждена реальными данными и соответствовать действительности.",
  },
  {
    icon: Lock,
    title: "Конфиденциальность",
    description:
      "Стороны обязуются обеспечивать конфиденциальность коммерческой информации, персональных данных и деловой переписки. Раскрытие информации третьим лицам допускается только с согласия сторон или по требованию закона.",
  },
  {
    icon: Handshake,
    title: "Разрешение споров",
    description:
      "При возникновении разногласий стороны обязуются прибегать к переговорам, медиации и арбитражу до обращения в суд. UFA предоставляет механизмы досудебного урегулирования для своих членов.",
  },
  {
    icon: BookOpen,
    title: "Соблюдение законодательства",
    description:
      "Все участники обязаны соблюдать законодательство Республики Узбекистан, международные стандарты франчайзинга и внутренние правила UFA. Незнание закона не освобождает от ответственности.",
  },
  {
    icon: Leaf,
    title: "Устойчивое развитие",
    description:
      "Участники стремятся к устойчивому развитию бизнеса, учитывая экологические и социальные факторы. Ответственное отношение к ресурсам и окружающей среде является неотъемлемой частью этичного ведения бизнеса.",
  },
  {
    icon: Heart,
    title: "Социальная ответственность",
    description:
      "Члены UFA признают свою ответственность перед обществом и содействуют развитию местных сообществ. Франчайзинговый бизнес должен создавать рабочие места, способствовать развитию предпринимательства и повышению качества жизни.",
  },
];

const compliance = [
  {
    icon: ClipboardCheck,
    title: "Обязательство при вступлении",
    description:
      "Каждый новый член UFA подписывает обязательство о соблюдении Кодекса этики при вступлении в ассоциацию. Это является обязательным условием членства.",
  },
  {
    icon: CalendarCheck,
    title: "Ежегодная аттестация",
    description:
      "Члены ассоциации ежегодно проходят аттестацию на соответствие стандартам Кодекса. Результаты аттестации влияют на статус членства и участие в программах UFA.",
  },
  {
    icon: MessageSquare,
    title: "Процедура рассмотрения жалоб",
    description:
      "UFA принимает жалобы на нарушение Кодекса от франчайзи, потребителей и третьих лиц. Каждая жалоба рассматривается в установленные сроки комитетом по этике.",
  },
  {
    icon: Gavel,
    title: "Медиация и арбитраж",
    description:
      "Для разрешения споров UFA предоставляет услуги профессиональных медиаторов и арбитров. Процедура является конфиденциальной и направлена на справедливое разрешение конфликтов.",
  },
];

export default function CodeOfEthicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <Image
          src="/images/hero-advocacy.jpg"
          alt="Кодекс этики франчайзинга"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2645]/90 via-[#0B2645]/70 to-[#0B2645]/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Кодекс этики франчайзинга
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
            Этические стандарты, которые объединяют франчайзинговое сообщество
            Узбекистана и обеспечивают честные, прозрачные и взаимовыгодные
            отношения между всеми участниками рынка.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#0B2645] green-underline-center text-center mb-8">
            Зачем нужен Кодекс этики
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              Франчайзинг строится на доверии. Франчайзер доверяет франчайзи свой
              бренд и бизнес-модель, а франчайзи инвестирует средства и усилия в
              развитие общего дела. Без чётких этических стандартов это доверие
              невозможно.
            </p>
            <p>
              Кодекс этики UFA устанавливает единые правила поведения для всех
              участников франчайзингового рынка Узбекистана. Он разработан на
              основе международных стандартов с учётом местной специфики и
              направлен на создание здоровой, конкурентной и справедливой
              бизнес-среды.
            </p>
            <p>
              Соблюдение Кодекса является обязательным условием членства в
              Ассоциации Франчайзинга Узбекистана и свидетельствует о
              приверженности компании высоким стандартам ведения бизнеса.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#0B2645] green-underline-center text-center mb-4">
            Основные принципы
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Десять ключевых принципов, которым обязаны следовать все члены
            Ассоциации Франчайзинга Узбекистана
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center relative">
                        <Icon className="w-6 h-6 text-white" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#0B2645] text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0B2645] mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#0B2645] green-underline-center text-center mb-4">
            Контроль соблюдения
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            UFA обеспечивает соблюдение Кодекса этики через систему контроля и
            поддержки
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {compliance.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2645] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "Членов подписали Кодекс" },
              { value: "10", label: "Ключевых принципов" },
              { value: "95%", label: "Успешных медиаций" },
              { value: "24ч", label: "Срок ответа на жалобы" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#0B2645] mb-4">
            Присоединяйтесь к ответственному франчайзингу
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Станьте частью сообщества, которое ценит честность, прозрачность и
            взаимное уважение. Членство в UFA — знак качества и надёжности вашего
            франчайзингового бизнеса.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#3ECF8E]/25"
          >
            Стать членом UFA
          </Link>
        </div>
      </section>
    </>
  );
}
