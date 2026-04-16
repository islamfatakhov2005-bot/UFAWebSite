import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function EventsSpotlight() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1 rounded-[3px]">
            <Image
              src="/images/hero-events.jpg"
              alt="Franchise Expo Tashkent 2026"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow text-[#3ECF8E] mb-4">Главное событие года</span>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0B2645] leading-[1.15] tracking-[-0.01em] mt-3 mb-6">
              Franchise Expo Tashkent 2026
            </h2>
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-3 text-[#0B2645]">
                <Calendar className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" />
                <span className="text-sm font-semibold">15–17 мая 2026 года</span>
              </div>
              <div className="flex items-center gap-3 text-[#0B2645]">
                <MapPin className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" />
                <span className="text-sm font-semibold">Tashkent City Convention Center</span>
              </div>
            </div>
            <p className="text-[15px] text-[#4A5568] leading-[1.7] mb-8">
              Крупнейшая франчайзинговая выставка Центральной Азии объединяет
              150+ брендов из 25 стран, 3000+ посетителей, инвесторов, СМИ и
              регуляторов. Три дня демо-стендов, инвестиционных сессий и прямых
              переговоров с владельцами брендов.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link href="/events" className="btn btn-primary">
                Зарегистрироваться
              </Link>
              <Link href="/events" className="btn btn-outline-green">
                Все мероприятия
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
