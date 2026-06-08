"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-amiri text-2xl text-gold">نور</span>
          <span className="font-lora text-lg font-semibold text-ivory">Cards</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {[
            { href: "/templates", label: "Templates" },
            { href: "/#pricing", label: "Pricing" },
            { href: "/dashboard", label: "Dashboard" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-lg px-3 py-2 text-sm text-muted hover:text-ivory hover:bg-border transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-bg hover:bg-gold-light transition-colors"
          >
            Create Invitation
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-ivory p-1"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-2">
          {[
            { href: "/templates", label: "Templates" },
            { href: "/#pricing", label: "Pricing" },
            { href: "/dashboard", label: "Dashboard" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:text-ivory hover:bg-border transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/templates"
            onClick={() => setOpen(false)}
            className="block text-center rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-bg hover:bg-gold-light transition-colors mt-2"
          >
            Create Invitation
          </Link>
        </div>
      )}
    </nav>
  );
}
