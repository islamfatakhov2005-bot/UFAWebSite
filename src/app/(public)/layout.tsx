import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import StickyMobileCTA from "@/components/public/StickyMobileCTA";
import SearchDialog from "@/components/public/SearchDialog";
import CookieConsent from "@/components/public/CookieConsent";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <SearchDialog />
      <CookieConsent />
    </>
  );
}
