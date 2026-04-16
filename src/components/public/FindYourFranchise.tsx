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
    <section className="relative py-20 overflow-hidden">
      <Image
        src="/images/hero-franchise.jpg"
        alt="Найдите свою франшизу"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0B2645]/85" />
      <div className="relative max-w-[900px] mx-auto px-6 text-center">
        <span className="eyebrow text-[#3ECF8E] mb-4">Каталог франшиз UFA</span>
        <h2 className="text-[28px] md:text-[36px] font-extrabold text-white leading-[1.15] tracking-[-0.01em] mt-3 mb-5">
          Найдите франшизу, которая подходит вам
        </h2>
        <p className="text-[15px] md:text-base text-white/85 leading-[1.65] mb-8 max-w-xl mx-auto">
          Более 500 франшиз из 40+ стран. Фильтруйте по категории, региону и
          объёму инвестиций — от 10 млн сум до крупных международных сетей.
        </p>

        <form
          action="/franchise-opportunities"
          className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto mb-6"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5568]" />
            <input
              type="search"
              name="q"
              placeholder="Например, кофейня или детский сад"
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-[3px] bg-white text-sm text-[#0B2645] focus:outline-none focus:border-[#3ECF8E] focus:ring-1 focus:ring-[#3ECF8E]"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Найти
          </button>
        </form>

        <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center items-center">
          <span className="text-white/60 text-[11px] font-bold uppercase tracking-[0.16em]">
            Популярные
          </span>
          {popularCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/franchise-opportunities?category=${cat.slug}`}
              className="text-white text-sm hover:text-[#3ECF8E] transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
