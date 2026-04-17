import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className="py-20 bg-[#0B2645]">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <span className="eyebrow text-[#3ECF8E] mb-3">Присоединяйтесь</span>
        <h2 className="text-[28px] md:text-[36px] font-extrabold text-white leading-[1.15] tracking-[-0.01em] mt-2 mb-5">
          Станьте частью сообщества UFA
        </h2>
        <p className="text-[15px] md:text-base text-white/80 leading-[1.7] max-w-xl mx-auto mb-10">
          Получите доступ к каталогу франшиз, образовательным программам,
          мероприятиям и сети из 1200+ лидеров отрасли. Первичная консультация
          бесплатна.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/registration" className="btn btn-primary">
            Подать заявку
          </Link>
          <Link href="/membership" className="btn btn-outline-white">
            Условия членства
          </Link>
        </div>
      </div>
    </section>
  );
}
