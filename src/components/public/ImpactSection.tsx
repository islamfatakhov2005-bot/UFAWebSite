import Link from "next/link";

export default function ImpactSection() {
  return (
    <section className="py-20 bg-[#f5f7fa]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2332] green-underline mb-8">
          Влияние франчайзинга на экономику Узбекистана
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Франчайзинг является одним из наиболее динамично развивающихся
            секторов экономики Узбекистана. Благодаря франшизной модели бизнеса
            тысячи предпринимателей получили доступ к проверенным бизнес-моделям,
            международным стандартам качества и профессиональной поддержке.
          </p>
          <p>
            За последние годы франчайзинг создал более 15 000 рабочих мест,
            привлёк более 200 международных брендов и обеспечил значительный вклад
            в валовой внутренний продукт страны. Франшизы работают в более чем 50
            городах Узбекистана, способствуя экономическому развитию регионов.
          </p>
          <p>
            Узбекская Ассоциация Франчайзинга поддерживает рост отрасли через
            образовательные программы, правовую защиту интересов участников рынка и
            создание благоприятной экосистемы для развития франчайзинга в стране.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-block mt-8 bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] hover:from-[#35B67A] hover:to-[#3E9999] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#3ECF8E]/25"
        >
          Узнать больше
        </Link>
      </div>
    </section>
  );
}
