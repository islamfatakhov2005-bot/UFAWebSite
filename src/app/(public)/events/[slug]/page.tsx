import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let event;
  try {
    event = await prisma.event.findUnique({ where: { slug } });
  } catch {
    return { title: "Мероприятие не найдено | UFA" };
  }
  if (!event) return { title: "Мероприятие не найдено | UFA" };

  return {
    title: event.title,
    description: event.description.slice(0, 160),
    openGraph: {
      title: event.title,
      description: event.description.slice(0, 160),
      type: "article",
      images: event.image ? [{ url: event.image }] : [],
    },
  };
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let event;
  try {
    event = await prisma.event.findUnique({ where: { slug } });
  } catch {
    notFound();
  }

  if (!event || !event.isPublished) notFound();

  const isUpcoming = event.startDate > new Date();
  const isOngoing = event.startDate <= new Date() && (!event.endDate || event.endDate >= new Date());

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate?.toISOString(),
        location: { "@type": "Place", name: event.location },
        description: event.description,
        organizer: { "@type": "Organization", name: "UFA" },
      }) }} />
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <Image
          src={event.image || "/images/hero-events.jpg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2645]/90 via-[#0B2645]/70 to-[#0B2645]/50" />
        <div className="relative max-w-4xl mx-auto px-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Все мероприятия
          </Link>
          <div className="flex items-center gap-3 mb-4">
            {isUpcoming && (
              <span className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full border border-green-400/30">
                Предстоящее
              </span>
            )}
            {isOngoing && (
              <span className="bg-yellow-500/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400/30">
                Проходит сейчас
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {event.title}
          </h1>
          <div className="w-16 h-1.5 bg-[#3ECF8E] rounded-full mb-6" />
        </div>
      </section>

      {/* Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Дата</div>
                <div className="text-sm font-semibold text-[#0B2645]">
                  {formatDate(event.startDate)}
                  {event.endDate && ` — ${formatDate(event.endDate)}`}
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Время</div>
                <div className="text-sm font-semibold text-[#0B2645]">
                  {formatTime(event.startDate)}
                  {event.endDate && ` — ${formatTime(event.endDate)}`}
                </div>
              </div>
            </div>
            {event.location && (
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3ECF8E] to-[#4AADAD] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Место</div>
                  <div className="text-sm font-semibold text-[#0B2645]">{event.location}</div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-[#0B2645] mb-4">О мероприятии</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </div>

          {/* CTA */}
          {event.registrationUrl && isUpcoming && (
            <div className="bg-gradient-to-r from-[#3ECF8E]/10 to-[#4AADAD]/10 rounded-xl p-8 border border-[#3ECF8E]/20 text-center">
              <h3 className="text-xl font-bold text-[#0B2645] mb-2">
                Хотите принять участие?
              </h3>
              <p className="text-gray-600 mb-6">
                Зарегистрируйтесь сейчас, чтобы гарантировать своё место.
              </p>
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 px-10 text-base font-semibold">
                  Зарегистрироваться <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          )}

          {!event.registrationUrl && isUpcoming && (
            <div className="bg-gradient-to-r from-[#3ECF8E]/10 to-[#4AADAD]/10 rounded-xl p-8 border border-[#3ECF8E]/20 text-center">
              <h3 className="text-xl font-bold text-[#0B2645] mb-2">
                Хотите принять участие?
              </h3>
              <p className="text-gray-600 mb-6">
                Свяжитесь с нами для получения подробной информации.
              </p>
              <Link href="/contact">
                <Button size="lg" className="h-14 px-10 text-base font-semibold">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
