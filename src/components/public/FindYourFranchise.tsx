import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const popularCategories = [
  { label: "Еда и напитки", slug: "food" },
  { label: "Образование", slug: "education" },
  { label: "Красота и здоровье", slug: "beauty" },
  { label: "Ритейл", slug: "retail" },
  { label: "Авто-услуги", slug: "automotive" },
  { label: "Спорт и фитнес", slug: "fitness" },
];

export default function FindYourFranchise() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Image
        src="/images/hero-franchise.jpg"
        alt="Найдите свою франшизу"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#1A2332]/80" />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
          Каталог франшиз UFA
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.3] mb-6">
          Найдите франшизу, которая подходит вам
        </h2>
        <p className="text-white/85 text-base md:text-lg leading-[1.7] mb-10 max-w-2xl mx-auto">
          Более 500 франшиз из 40+ стран. Фильтруйте по категории, региону и
          объёму инвестиций — от 10 млн сум до крупных международных сетей.
        </p>

        <form
          action="/franchise-opportunities"
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              name="q"
              placeholder="Например, кофейня или детский сад"
              className="w-full pl-12 pr-4 py-4 rounded bg-white text-[#020409] text-sm focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors whitespace-nowrap"
          >
            Найти
          </button>
        </form>

        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-white/70 text-sm font-semibold uppercase tracking-[0.08em] mr-2">
            Популярные:
          </span>
          {popularCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/franchise-opportunities?category=${cat.slug}`}
              className="text-white/90 hover:text-[#3ECF8E] text-sm underline underline-offset-4 decoration-white/40 hover:decoration-[#3ECF8E] transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
