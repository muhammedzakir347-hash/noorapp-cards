"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FEATURES = [
  { emoji: "📖", label: "Quran Reader" },
  { emoji: "🧭", label: "Qibla Compass" },
  { emoji: "🕌", label: "Prayer Times" },
  { emoji: "📿", label: "Dhikr Counter" },
  { emoji: "📚", label: "Hadith Library" },
  { emoji: "🌙", label: "Ramadan Guide" },
];

export default function NoorAppPromo() {
  return (
    <section className="py-20 px-4 sm:px-6 overflow-hidden" style={{ background: "#1a3a2a" }}>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden" style={{ background: "#0f1f17", border: "1px solid #C9A84C30" }}>
          {/* Gold radial glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #C9A84C10 0%, transparent 70%)" }}
          />

          <div className="relative z-10 grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#C9A84C70" }}>
                Also from the makers
              </p>
              <h2 className="font-amiri text-4xl sm:text-5xl mb-3" style={{ color: "#FAF6EF" }}>
                Download{" "}
                <span style={{ color: "#C9A84C" }}>نور</span>
                {" "}NoorApp
              </h2>
              <p className="font-lora text-base leading-relaxed mb-6" style={{ color: "#b8b4aa" }}>
                Your complete Islamic companion. Prayer times, Quran, Qibla,
                daily dhikr, and hadith — all in one beautiful app.
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {FEATURES.map((f) => (
                  <span
                    key={f.label}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
                    style={{ background: "#1a3a2a", color: "#FAF6EF", border: "1px solid #234d38" }}
                  >
                    {f.emoji} {f.label}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Link
                  href="https://noorapp.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{ background: "#C9A84C", color: "#0f1f17" }}
                >
                  Visit NoorApp.app →
                </Link>
              </div>
            </div>

            {/* App mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div
                className="rounded-3xl overflow-hidden shadow-2xl w-52 sm:w-64"
                style={{ background: "#1a3a2a", border: "1px solid #C9A84C40" }}
              >
                <div className="p-5 text-center space-y-4">
                  <p className="font-amiri text-4xl" style={{ color: "#C9A84C" }}>نور</p>
                  <p className="font-lora text-sm font-semibold" style={{ color: "#FAF6EF" }}>NoorApp</p>
                  <div className="space-y-2">
                    {[
                      { icon: "🕌", label: "Fajr — 5:14 AM" },
                      { icon: "☀️", label: "Dhuhr — 12:30 PM" },
                      { icon: "📖", label: "Al-Baqarah 2:255" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-left"
                        style={{ background: "#0f1f17", color: "#FAF6EF" }}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="rounded-lg py-2 text-xs font-semibold"
                    style={{ background: "#C9A84C", color: "#0f1f17" }}
                  >
                    Free · No ads
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
