"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    emoji: "🕌",
    title: "Arabic Calligraphy",
    desc: "Beautiful Bismillah, Quranic verses, and Arabic typography rendered in authentic Amiri font.",
  },
  {
    emoji: "📅",
    title: "Hijri Date Display",
    desc: "Automatically shows the Islamic Hijri calendar date alongside the Gregorian date.",
  },
  {
    emoji: "⏱️",
    title: "Live Countdown Timer",
    desc: "A real-time countdown clock ticking down to your wedding day — refreshes every second.",
  },
  {
    emoji: "💌",
    title: "RSVP & Guest Inbox",
    desc: "Guests can RSVP and leave heartfelt messages directly on your invitation page.",
  },
  {
    emoji: "🖼️",
    title: "Photo Slideshow",
    desc: "Upload your couple photos for a beautiful animated slideshow on your invitation.",
  },
  {
    emoji: "📤",
    title: "Share via WhatsApp",
    desc: "One tap to share your invitation link on WhatsApp, copy to clipboard, or embed anywhere.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#1a3a2a" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#C9A84C70" }}>Everything you need</p>
          <h2 className="font-amiri text-4xl sm:text-5xl mb-3" style={{ color: "#FAF6EF" }}>
            Crafted for Muslim Weddings
          </h2>
          <p className="font-lora text-base max-w-md mx-auto" style={{ color: "#b8b4aa" }}>
            Every feature designed with Islamic values and modern aesthetics in mind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl p-5 transition-colors group hover:border-gold"
              style={{ background: "#0f1f17", border: "1px solid #234d38" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ background: "#C9A84C15" }}
              >
                {f.emoji}
              </div>
              <h3 className="font-lora font-semibold mb-2" style={{ color: "#FAF6EF" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#b8b4aa" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
