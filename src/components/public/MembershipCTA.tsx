import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className="py-20 bg-[#1A2332]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="section-heading white-underline-center text-white text-center mb-4">
          Станьте участником UFA
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Получите доступ к эксклюзивным ресурсам, образовательным программам,
          мероприятиям и сообществу профессионалов франчайзинга
        </p>
        <Link
          href="/membership"
          className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-10 py-4 rounded font-bold text-lg transition-colors"
        >
          Начать моё членство
        </Link>
      </div>
    </section>
  );
}
