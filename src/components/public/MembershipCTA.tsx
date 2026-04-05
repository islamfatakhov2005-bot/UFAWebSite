import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Станьте участником UFA
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Получите доступ к эксклюзивным ресурсам, образовательным программам,
          мероприятиям и сообществу профессионалов франчайзинга
        </p>
        <Link
          href="/membership"
          className="inline-block bg-white text-[#1A2332] hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          Начать моё членство
        </Link>
      </div>
    </section>
  );
}
