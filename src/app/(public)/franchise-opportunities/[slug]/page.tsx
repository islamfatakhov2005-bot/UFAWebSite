import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_FRANCHISES, getFranchiseBySlug } from "@/lib/franchises-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const franchise = getFranchiseBySlug(slug);
  if (!franchise) return { title: "Франшиза не найдена | UFA" };
  return {
    title: `${franchise.name} — Франшиза | UFA`,
    description: franchise.description.slice(0, 160),
  };
}

export function generateStaticParams() {
  return ALL_FRANCHISES.map((f) => ({ slug: f.slug }));
}

export default async function FranchiseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const franchise = getFranchiseBySlug(slug);

  if (!franchise) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#3ECF8E] transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/franchise-opportunities" className="hover:text-[#3ECF8E] transition-colors">Каталог франшиз</Link>
            <span>/</span>
            <Link href={`/franchise-opportunities?category=${encodeURIComponent(franchise.category)}`} className="hover:text-[#3ECF8E] transition-colors">{franchise.category}</Link>
            <span>/</span>
            <span className="text-[#333333]">{franchise.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-[65%]">
            <Badge variant="secondary" className="mb-3">{franchise.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-5">{franchise.name}</h1>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent">{franchise.startupCost}</div>
                <div className="text-sm text-gray-500 mt-1">Начальные затраты</div>
              </div>
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent">{franchise.totalInvestment}</div>
                <div className="text-sm text-gray-500 mt-1">Общие инвестиции</div>
              </div>
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent">{franchise.franchisingSince}</div>
                <div className="text-sm text-gray-500 mt-1">Франчайзинг с</div>
              </div>
            </div>

            <Button size="lg" className="w-full mb-3 h-14 text-base font-semibold">Запросить информацию</Button>
            <div className="text-center mb-8">
              <a href={franchise.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#3ECF8E] hover:underline">Посетить сайт</a>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-[#333333] mb-4">О компании</h2>
              <p className="text-gray-600 leading-relaxed">{franchise.description}</p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#333333] mb-4">Детали</h2>
              <dl className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">Штаб-квартира:</dt>
                  <dd className="text-sm text-[#333333]">{franchise.headquarters}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">Телефон:</dt>
                  <dd className="text-sm text-[#333333]"><a href={`tel:${franchise.phone}`} className="hover:text-[#3ECF8E]">{franchise.phone}</a></dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">Email:</dt>
                  <dd className="text-sm text-[#333333]"><a href={`mailto:${franchise.email}`} className="hover:text-[#3ECF8E]">{franchise.email}</a></dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[35%]">
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-8 mb-6 flex items-center justify-center">
              <div className="relative w-full h-32">
                <Image src={franchise.logo} alt={`${franchise.name} logo`} fill className="object-contain" unoptimized />
              </div>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Связаться</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Телефон:</span><br />
                  <a href={`tel:${franchise.phone}`} className="text-[#333333] hover:text-[#3ECF8E]">{franchise.phone}</a>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span><br />
                  <a href={`mailto:${franchise.email}`} className="text-[#333333] hover:text-[#3ECF8E]">{franchise.email}</a>
                </div>
                <div>
                  <span className="text-gray-500">Сайт:</span><br />
                  <a href={franchise.website} target="_blank" rel="noopener noreferrer" className="text-[#3ECF8E] hover:underline">{franchise.website}</a>
                </div>
              </div>
              <Button size="lg" className="w-full mt-5">Запросить информацию</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
