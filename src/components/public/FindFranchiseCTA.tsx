import Link from "next/link";

export default function FindFranchiseCTA() {
  return (
    <section className="py-20 bg-[#1A2332]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          НАЙТИ ФРАНШИЗУ
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Просмотрите каталог франшиз и найдите идеальную возможность для бизнеса
        </p>
        <Link
          href="/franchise-opportunities"
          className="inline-block bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
        >
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
}
