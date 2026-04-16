import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import FranchiseCard from "@/components/public/FranchiseCard";
import FeaturedCarousel from "@/components/public/FeaturedCarousel";
import FranchiseFilters from "@/components/public/FranchiseFilters";
import { Select } from "@/components/ui/select";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Каталог франшиз | UFA",
  description:
    "Найдите лучшие франшизы для инвестирования. Полный каталог франчайзинговых возможностей.",
};

const ITEMS_PER_PAGE = 12;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FranchiseDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const query = typeof params.q === "string" ? params.q.toLowerCase() : "";
  const category = typeof params.category === "string" ? params.category : "";
  const sortBy = typeof params.sort === "string" ? params.sort : "featured";
  const page = typeof params.page === "string" ? Math.max(1, parseInt(params.page, 10) || 1) : 1;

  // Build Prisma where clause
  const where: Record<string, unknown> = { isActive: true };
  if (query) {
    where.name = { contains: query, mode: "insensitive" };
  }
  if (category) {
    where.category = category;
  }

  // Build orderBy
  let orderBy: Record<string, string>[] = [];
  if (sortBy === "alpha") {
    orderBy = [{ name: "asc" }];
  } else if (sortBy === "new") {
    orderBy = [{ createdAt: "desc" }];
  } else {
    orderBy = [{ isFeatured: "desc" }, { sortOrder: "asc" }, { name: "asc" }];
  }

  let franchises: { id: number; name: string; slug: string; logo: string | null; category: string; isFeatured: boolean }[] = [];
  let totalCount = 0;
  let featuredFranchises: { id: number; name: string; slug: string; logo: string | null }[] = [];

  try {
    [franchises, totalCount, featuredFranchises] = await Promise.all([
      prisma.franchise.findMany({
        where,
        orderBy,
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        select: { id: true, name: true, slug: true, logo: true, category: true, isFeatured: true },
      }),
      prisma.franchise.count({ where }),
      prisma.franchise.findMany({
        where: { isActive: true, isFeatured: true },
        orderBy: { sortOrder: "asc" },
        take: 10,
        select: { id: true, name: true, slug: true, logo: true },
      }),
    ]);
  } catch {
    // DB unavailable — show empty state
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  function buildUrl(overrides: Record<string, string>): string {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (category) p.set("category", category);
    if (sortBy && sortBy !== "featured") p.set("sort", sortBy);
    Object.entries(overrides).forEach(([k, v]) => {
      if (v) p.set(k, v);
      else p.delete(k);
    });
    const str = p.toString();
    return `/franchise-opportunities${str ? `?${str}` : ""}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0B2645] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Каталог франшиз
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mt-3" />
          <p className="text-white/70 mt-3 text-lg">
            Найди��е идеальную франшизу для вашего бизнеса
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Suspense fallback={null}>
            <FranchiseFilters />
          </Suspense>

          <div className="flex-1 min-w-0">
            {featuredFranchises.length > 0 && (
              <FeaturedCarousel franchises={featuredFranchises} />
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Найдено: <span className="font-medium text-[#333333]">{totalCount}</span> франшиз
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Сортировать по:</span>
                <SortSelect currentSort={sortBy} />
              </div>
            </div>

            {franchises.length > 0 ? (
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
              >
                {franchises.map((franchise) => (
                  <FranchiseCard
                    key={franchise.id}
                    name={franchise.name}
                    slug={franchise.slug}
                    logo={franchise.logo || "/complogo/1.png"}
                    category={franchise.category}
                    isFeatured={franchise.isFeatured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  Франшизы не найдены. Попробуйте изменить фильтры.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-10">
                {currentPage > 1 && (
                  <Link
                    href={buildUrl({ page: String(currentPage - 1) })}
                    className="px-3 py-2 text-sm rounded-lg border border-[#e5e7eb] text-[#333333] hover:bg-gray-100 transition-colors"
                  >
                    Назад
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={buildUrl({ page: String(pageNum) })}
                    className={
                      pageNum === currentPage
                        ? "px-3 py-2 text-sm rounded-lg bg-[#3ECF8E] text-white font-medium"
                        : "px-3 py-2 text-sm rounded-lg border border-[#e5e7eb] text-[#333333] hover:bg-gray-100 transition-colors"
                    }
                  >
                    {pageNum}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link
                    href={buildUrl({ page: String(currentPage + 1) })}
                    className="px-3 py-2 text-sm rounded-lg border border-[#e5e7eb] text-[#333333] hover:bg-gray-100 transition-colors"
                  >
                    Далее
                  </Link>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SortSelect({ currentSort }: { currentSort: string }) {
  return (
    <form>
      <Select name="sort" defaultValue={currentSort}>
        <option value="featured">Рекомендуемые</option>
        <option value="alpha">По алфавиту</option>
        <option value="new">Новые</option>
      </Select>
    </form>
  );
}
