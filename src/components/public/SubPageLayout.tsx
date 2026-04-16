import Image from "next/image";
import Link from "next/link";

interface SidebarLink {
  label: string;
  href: string;
}

interface SubPageLayoutProps {
  hero: {
    title: string;
    image: string;
    subtitle?: string;
  };
  sidebar: SidebarLink[];
  sidebarTitle?: string;
  activeHref: string;
  children: React.ReactNode;
  exploreMore?: {
    title: string;
    text: string;
    href: string;
  }[];
}

export default function SubPageLayout({
  hero,
  sidebar,
  sidebarTitle = "Раздел",
  activeHref,
  children,
  exploreMore,
}: SubPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1A2332]/75" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.2] mb-4">
            {hero.title}
          </h1>
          <div className="w-16 h-1 bg-[#3ECF8E] mx-auto" />
          {hero.subtitle && (
            <p className="text-base md:text-lg text-white/90 leading-[1.7] mt-8 max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-[#F4F4F4] rounded-lg p-6 lg:sticky lg:top-24">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A2332] mb-4">
                  {sidebarTitle}
                </h3>
                <nav className="space-y-1">
                  {sidebar.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block text-sm py-2 px-3 rounded transition-colors ${
                        link.href === activeHref
                          ? "bg-[#3ECF8E] text-white font-semibold"
                          : "text-[#020409] hover:bg-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex-1 min-w-0 space-y-10">{children}</div>
          </div>
        </div>
      </section>

      {exploreMore && exploreMore.length > 0 && (
        <section className="py-20 bg-[#F4F4F4]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="section-heading green-underline-center text-center mb-12">
              Узнайте больше
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exploreMore.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-white rounded-lg p-8 block hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-[#1A2332] mb-3 group-hover:text-[#3ECF8E] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#020409] text-sm leading-[1.8] mb-4">
                    {card.text}
                  </p>
                  <span className="text-[#2A9D6F] text-sm font-semibold uppercase tracking-[0.08em] group-hover:underline">
                    Подробнее →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
