import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import StyleShowcase from "@/components/landing/StyleShowcase";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import NoorAppPromo from "@/components/landing/NoorAppPromo";

export const metadata: Metadata = {
  title: "نور Cards — Digital Islamic Wedding Invitations",
  description:
    "Beautiful digital wedding invitations with Arabic calligraphy, Quranic verses, Hijri dates, RSVP, and countdown timers. Crafted for Muslim couples.",
  openGraph: {
    title: "نور Cards — Digital Wedding Invitations",
    description: "Create your beautiful digital wedding invitation in minutes.",
    url: "https://cards.noorapp.app",
    siteName: "نور Cards",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f1f17" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StyleShowcase />
        <FeaturesSection />
        <PricingSection />
        <NoorAppPromo />
      </main>
      <Footer />
    </div>
  );
}
