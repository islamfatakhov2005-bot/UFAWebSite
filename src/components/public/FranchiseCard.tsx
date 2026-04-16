import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FranchiseCardProps {
  name: string;
  slug: string;
  logo?: string | null;
  category: string;
  isFeatured?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export default function FranchiseCard({
  name,
  slug,
  logo,
  category,
  isFeatured = false,
}: FranchiseCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#e5e7eb] rounded-xl p-5 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg",
        isFeatured && "ring-2 ring-[#3ECF8E]/30"
      )}
    >
      {logo ? (
        <div className="relative w-full h-16 mb-3">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-[#0B2645] flex items-center justify-center mb-3">
          <span className="text-white font-semibold text-sm">
            {getInitials(name)}
          </span>
        </div>
      )}

      <Link
        href={`/franchise-opportunities/${slug}`}
        className="font-semibold text-[#333333] hover:text-[#3ECF8E] transition-colors leading-tight mb-2"
      >
        {name}
      </Link>

      <span className="text-sm text-gray-500 mb-2">{category}</span>

      {isFeatured && <Badge variant="default">Рекомендуемая</Badge>}
    </div>
  );
}
