import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function EventsSpotlight() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/hero-events.jpg"
              alt="Franchise Expo Tashkent 2026"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#3ECF8E] mb-4">
              Главное событие года
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2645] leading-[1.25] mb-6">
              Franchise Expo Tashkent 2026
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-[#020409]">
                <Calendar className="w-5 h-5 text-[#3ECF8E] flex-shrink-0" />
                <span className="text-sm">15–17 мая 2026 года</span>
              </div>
              <div className="flex items-center gap-3 text-[#020409]">
                <MapPin className="w-5 h-5 text-[#3ECF8E] flex-shrink-0" />
                <span className="text-sm">Tashkent City Convention Center</span>
              </div>
            </div>
            <p className="text-[#020409] text-base leading-[1.8] mb-8">
              Крупнейшая франчайзинговая выставка Центральной Азии объединяет
              150+ брендов из 25 стран, 3000+ посетителей, инвесторов, СМИ и
              регуляторов. Три дня демо-стендов, инвестиционных сессий и прямых
              переговоров с владельцами брендов.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/events"
                className="inline-block bg-[#3ECF8E] hover:bg-[#35B67A] text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors text-center"
              >
                Зарегистрироваться
              </Link>
              <Link
                href="/events"
                className="inline-block border-2 border-[#3ECF8E] text-[#2A9D6F] hover:bg-[#3ECF8E] hover:text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-[0.08em] transition-colors text-center"
              >
                Все мероприятия
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
