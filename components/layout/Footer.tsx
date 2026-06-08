import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-amiri text-2xl text-gold">نور</span>
              <span className="font-lora text-lg font-semibold text-ivory">Cards</span>
            </div>
            <p className="text-muted text-sm max-w-xs">
              Beautiful digital wedding invitations for every tradition. Create yours in minutes.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold text-ivory/50 uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2">
                {[
                  { href: "/templates", label: "Templates" },
                  { href: "/#pricing", label: "Pricing" },
                  { href: "/dashboard", label: "Dashboard" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-muted hover:text-gold transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-ivory/50 uppercase tracking-wider mb-3">NoorApp</p>
              <ul className="space-y-2">
                {[
                  { href: "https://noorapp.app", label: "NoorApp" },
                  { href: "https://noorapp.app/quran", label: "Quran" },
                  { href: "https://noorapp.app/prayer-times", label: "Prayer Times" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      className="text-sm text-muted hover:text-gold transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/60">
            © 2026 NoorCards. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted/60">
            Powered by <Link href="https://noorapp.app" className="text-gold hover:text-gold-light transition-colors">NoorApp</Link>
            <Heart size={11} className="text-gold fill-gold" />
          </p>
        </div>
      </div>
    </footer>
  );
}
