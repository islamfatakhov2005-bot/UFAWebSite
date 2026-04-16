import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className="py-20 bg-[#0B2645]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
          Присоединяйтесь
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.3] mb-6">
          Станьте частью сообщества UFA
        </h2>
        <p className="text-white/80 text-base leading-[1.8] max-w-2xl mx-auto mb-10">
          Получите доступ к каталогу франшиз, образовательным программам,
          мероприятиям и сети из 1200+ лидеров отрасли. Первичная консультация
          бесплатна.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/membership/apply"
            className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Подать заявку
          </Link>
          <Link
            href="/membership"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#0B2645] px-10 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors"
          >
            Условия членства
          </Link>
        </div>
      </div>
    </section>
  );
}
