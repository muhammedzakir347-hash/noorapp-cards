"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { STYLE_META, TEMPLATES, type TemplateStyle } from "@/lib/templates";

const STYLE_PREVIEWS: Record<TemplateStyle, { bg: string; accent: string; arabicOrSymbol: string; label: string }> = {
  islamic:   { bg: "#0f1f17", accent: "#C9A84C", arabicOrSymbol: "بِسْمِ اللَّهِ", label: "Arabic calligraphy & Quranic verses" },
  hindu:     { bg: "#1a0a00", accent: "#FF8C00", arabicOrSymbol: "ॐ",             label: "Auspicious motifs & vibrant colors"  },
  christian: { bg: "#0a1628", accent: "#D4AF37", arabicOrSymbol: "✝",             label: "Scripture & timeless elegance"       },
  modern:    { bg: "#0f0f0f", accent: "#C9A84C", arabicOrSymbol: "✦",             label: "Minimalist & contemporary designs"   },
};

function MiniCard({ style }: { style: TemplateStyle }) {
  const p = STYLE_PREVIEWS[style];
  const template = TEMPLATES.find((t) => t.style === style);
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{ background: p.bg, border: `1px solid ${p.accent}30`, minHeight: 240 }}
    >
      <div className="h-1" style={{ background: p.accent }} />
      <div className="p-5 text-center space-y-3">
        <p
          className="font-amiri text-2xl leading-relaxed"
          style={{ color: p.accent }}
          dir={style === "islamic" ? "rtl" : undefined}
        >
          {p.arabicOrSymbol}
        </p>
        <div style={{ background: `${p.accent}15`, borderRadius: 12, padding: "8px 12px" }}>
          <p className="font-lora text-base font-semibold" style={{ color: "#FAF6EF" }}>
            {template?.name ?? "Template"}
          </p>
        </div>
        <div className="text-center space-y-0.5">
          <p className="font-amiri text-xl" style={{ color: p.accent }}>Ahmad & Mariam</p>
          <p className="text-xs" style={{ color: "#FAF6EF60" }}>Saturday, 14 Dhul Hijjah 1447</p>
        </div>
        <div
          className="rounded-xl p-2 text-xs"
          style={{ background: `${p.accent}10`, border: `1px solid ${p.accent}25`, color: "#FAF6EF80" }}
        >
          Al-Baraka Hall, Dubai
        </div>
      </div>
    </div>
  );
}

export default function StyleShowcase() {
  const styles = Object.keys(STYLE_META) as TemplateStyle[];
  const [active, setActive] = useState<TemplateStyle>("islamic");

  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#0f1f17" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#C9A84C70" }}>
            For every faith, for every family
          </p>
          <h2 className="font-amiri text-4xl sm:text-5xl mb-3" style={{ color: "#FAF6EF" }}>
            4 Beautiful Styles
          </h2>
          <p className="font-lora text-base max-w-lg mx-auto" style={{ color: "#b8b4aa" }}>
            Choose a template that reflects your faith and culture. Every detail crafted with love.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="flex rounded-2xl p-1.5 mb-10 overflow-x-auto"
          style={{ background: "#1a3a2a", border: "1px solid #234d38" }}
        >
          {styles.map((style) => {
            const meta = STYLE_META[style];
            const preview = STYLE_PREVIEWS[style];
            return (
              <button
                key={style}
                onClick={() => setActive(style)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-sm font-medium whitespace-nowrap transition-all"
                style={
                  active === style
                    ? { background: preview.accent, color: "#0f1f17" }
                    : { color: "#b8b4aa" }
                }
              >
                <span>{meta.icon}</span>
                <span className="hidden sm:inline">{meta.label}</span>
                <span className="sm:hidden">{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 gap-6 items-start"
          >
            {/* Card preview */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <MiniCard style={active} />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{STYLE_META[active].icon}</span>
                  <h3 className="font-amiri text-3xl" style={{ color: "#FAF6EF" }}>
                    {STYLE_META[active].label} Templates
                  </h3>
                </div>
                <p className="font-lora text-base" style={{ color: "#b8b4aa" }}>
                  {STYLE_PREVIEWS[active].label}
                </p>
              </div>

              {/* Feature bullets */}
              <ul className="space-y-2.5">
                {TEMPLATES.filter((t) => t.style === active).map((t) => (
                  <li key={t.id} className="flex items-start gap-3">
                    <span className="text-xl">{t.emoji}</span>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#FAF6EF" }}>{t.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#b8b4aa" }}>{t.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href={`/templates?style=${active}`}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
                style={{ background: STYLE_PREVIEWS[active].accent, color: "#0f1f17" }}
              >
                View {STYLE_META[active].label} Templates →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
