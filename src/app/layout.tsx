import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://ufa.gmlb.ru";

export const metadata: Metadata = {
  title: {
    default: "UFA — Ассоциация Франчайзинга Узбекистана",
    template: "%s | UFA",
  },
  description:
    "Ассоциация Франчайзинга Узбекистана — развитие франчайзинга, образование, мероприятия, поддержка бизнеса и членство для 500+ компаний.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "UFA — Ассоциация Франчайзинга Узбекистана",
    title: "UFA — Ассоциация Франчайзинга Узбекистана",
    description:
      "Вступайте в крупнейшую ассоциацию франчайзинга Узбекистана. 500+ компаний-членов, образовательные программы, мероприятия и поддержка бизнеса.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "UFA — Ассоциация Франчайзинга Узбекистана",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UFA — Ассоциация Франчайзинга Узбекистана",
    description:
      "Вступайте в крупнейшую ассоциацию франчайзинга Узбекистана. 500+ компаний-членов.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NGO"],
  name: "Ассоциация Франчайзинга Узбекистана",
  alternateName: "UFA",
  url: siteUrl,
  logo: `${siteUrl}/logos/logo.png`,
  description:
    "Ведущая организация по развитию и поддержке франчайзинга в Узбекистане. 500+ компаний-членов.",
  foundingDate: "2019",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Амира Темура, 107Б",
    addressLocality: "Ташкент",
    addressCountry: "UZ",
  },
  telephone: "+998712345678",
  email: "info@ufa.uz",
  sameAs: [
    "https://t.me/ufa_uz",
    "https://instagram.com/ufa_uz",
    "https://facebook.com/ufa.uz",
    "https://linkedin.com/company/ufa-uz",
    "https://youtube.com/@ufa_uz",
  ],
  areaServed: {
    "@type": "Country",
    name: "Uzbekistan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`h-full antialiased ${plusJakartaSans.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
