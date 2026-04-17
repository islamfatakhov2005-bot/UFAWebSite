import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ALL_FRANCHISES, type FranchiseItem } from "@/lib/franchises-data";

type FranchiseView = {
  name: string;
  slug: string;
  logo: string | null;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  description: string | null;
  headquarters: string | null;
  startupCost: string | null;
  totalInvestment: string | null;
  franchisingSince: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  websiteUrl: string | null;
  veteransDiscount?: boolean | null;
  discountDetails?: string | null;
};

function staticToView(item: FranchiseItem): FranchiseView {
  return {
    name: item.name,
    slug: item.slug,
    logo: item.logo,
    category: item.category,
    isActive: true,
    isFeatured: item.isFeatured,
    description: item.description,
    headquarters: item.headquarters,
    startupCost: item.startupCost,
    totalInvestment: item.totalInvestment,
    franchisingSince: item.franchisingSince,
    contactPhone: item.phone,
    contactEmail: item.email,
    websiteUrl: item.website,
    veteransDiscount: null,
    discountDetails: null,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let franchise: FranchiseView | null = null;
  try {
    franchise = (await prisma.franchise.findUnique({ where: { slug } })) as FranchiseView | null;
  } catch {
    /* fall through */
  }
  if (!franchise) {
    const fb = ALL_FRANCHISES.find((f) => f.slug === slug);
    franchise = fb ? staticToView(fb) : null;
  }
  if (!franchise) return { title: "Франшиза не найдена | UFA" };
  return {
    title: `${franchise.name} — Франшиза | UFA`,
    description: (franchise.description || "").slice(0, 160),
  };
}

export default async function FranchiseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let franchise: FranchiseView | null = null;
  try {
    franchise = (await prisma.franchise.findUnique({
      where: { slug },
    })) as FranchiseView | null;
  } catch {
    /* fall through to static fallback */
  }

  if (!franchise) {
    const fb = ALL_FRANCHISES.find((f) => f.slug === slug);
    if (fb) franchise = staticToView(fb);
  }

  if (!franchise || !franchise.isActive) notFound();

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
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {franchise.startupCost && (
                <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent">{franchise.startupCost}</div>
                  <div className="text-sm text-gray-500 mt-1">Начальные затраты</div>
                </div>
              )}
              {franchise.totalInvestment && (
                <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent">{franchise.totalInvestment}</div>
                  <div className="text-sm text-gray-500 mt-1">Общие инвестиции</div>
                </div>
              )}
              {franchise.franchisingSince && (
                <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#4AADAD] bg-clip-text text-transparent">{franchise.franchisingSince}</div>
                  <div className="text-sm text-gray-500 mt-1">Франчайзинг с</div>
                </div>
              )}
            </div>

            <Link href="/contact">
              <Button size="lg" className="w-full mb-3 h-14 text-base font-semibold">Запросить информацию</Button>
            </Link>
            {franchise.websiteUrl && (
              <div className="text-center mb-8">
                <a href={franchise.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#3ECF8E] hover:underline">Посетить сайт</a>
              </div>
            )}

            {franchise.description && (
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-[#333333] mb-4">О компании</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{franchise.description}</p>
              </div>
            )}

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#333333] mb-4">Детали</h2>
              <dl className="space-y-3">
                {franchise.headquarters && (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">Штаб-квартира:</dt>
                    <dd className="text-sm text-[#333333]">{franchise.headquarters}</dd>
                  </div>
                )}
                {franchise.contactPhone && (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">Телефон:</dt>
                    <dd className="text-sm text-[#333333]"><a href={`tel:${franchise.contactPhone}`} className="hover:text-[#3ECF8E]">{franchise.contactPhone}</a></dd>
                  </div>
                )}
                {franchise.contactEmail && (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">Email:</dt>
                    <dd className="text-sm text-[#333333]"><a href={`mailto:${franchise.contactEmail}`} className="hover:text-[#3ECF8E]">{franchise.contactEmail}</a></dd>
                  </div>
                )}
                {franchise.veteransDiscount && franchise.discountDetails && (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-sm font-medium text-gray-500 sm:w-40">Скидка для ветеранов:</dt>
                    <dd className="text-sm text-[#333333]">{franchise.discountDetails}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[35%]">
            {franchise.logo && (
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-8 mb-6 flex items-center justify-center">
                <div className="relative w-full h-32">
                  <Image src={franchise.logo} alt={`${franchise.name} logo`} fill className="object-contain" unoptimized />
                </div>
              </div>
            )}

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Связаться</h3>
              <div className="space-y-3 text-sm">
                {franchise.contactPhone && (
                  <div>
                    <span className="text-gray-500">Телефон:</span><br />
                    <a href={`tel:${franchise.contactPhone}`} className="text-[#333333] hover:text-[#3ECF8E]">{franchise.contactPhone}</a>
                  </div>
                )}
                {franchise.contactEmail && (
                  <div>
                    <span className="text-gray-500">Email:</span><br />
                    <a href={`mailto:${franchise.contactEmail}`} className="text-[#333333] hover:text-[#3ECF8E]">{franchise.contactEmail}</a>
                  </div>
                )}
                {franchise.websiteUrl && (
                  <div>
                    <span className="text-gray-500">Сайт:</span><br />
                    <a href={franchise.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#3ECF8E] hover:underline">{franchise.websiteUrl}</a>
                  </div>
                )}
              </div>
              <Link href="/contact">
                <Button size="lg" className="w-full mt-5">Запросить информацию</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
