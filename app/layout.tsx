import type { Metadata } from "next";
import { Amiri, Lora, Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  variable: "--font-amiri-var",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora-var",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-var",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoorCards — Beautiful Digital Wedding Invitations",
  description: "Create stunning digital wedding invitations. Islamic, Hindu, Christian & Modern styles. RSVP management, countdown timers, and more.",
  metadataBase: new URL("https://cards.noorapp.app"),
  openGraph: {
    title: "NoorCards — Digital Wedding Invitations",
    description: "Beautiful digital wedding invitations for every tradition.",
    url: "https://cards.noorapp.app",
    siteName: "NoorCards",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${amiri.variable} ${lora.variable} ${inter.variable} ${pinyonScript.variable}`}>
      <body className="min-h-screen bg-bg text-ivory font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
