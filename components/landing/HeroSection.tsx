"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

/* Floating preview card of an Islamic invitation */
function FloatingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{ perspective: "1200px" }}
      className="w-full max-w-xs mx-auto"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "#0f1f17", border: "1px solid #C9A84C40" }}
      >
        {/* Geometric top bar */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #e4c97a, #C9A84C)" }} />

        <div className="px-6 py-7 text-center space-y-4">
          {/* Bismillah */}
          <p className="font-amiri text-lg leading-relaxed" style={{ color: "#C9A84C" }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: "#C9A84C30" }} />
            <span style={{ color: "#C9A84C" }}>🌙</span>
            <div className="flex-1 h-px" style={{ background: "#C9A84C30" }} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#C9A84C60" }}>
              With the blessings of Allah
            </p>
            <p className="font-amiri text-3xl" style={{ color: "#C9A84C" }}>Ahmad</p>
            <p className="font-lora text-base my-1" style={{ color: "#FAF6EF60" }}>&</p>
            <p className="font-amiri text-3xl" style={{ color: "#C9A84C" }}>Mariam</p>
            <p className="font-lora text-xs mt-2 tracking-wide" style={{ color: "#FAF6EFaa" }}>
              are joyfully united in marriage
            </p>
          </div>

          {/* Date card */}
          <div className="rounded-xl p-3" style={{ background: "#1a3a2a", border: "1px solid #C9A84C30" }}>
            <p className="font-lora text-sm font-semibold" style={{ color: "#FAF6EF" }}>
              Saturday, 14 Dhul Hijjah 1447
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#C9A84C80" }}>7:00 PM onwards</p>
          </div>

          {/* Venue */}
          <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: "#FAF6EF70" }}>
            <MapPin size={11} style={{ color: "#C9A84C" }} />
            <span>Al-Baraka Banquet Hall, Dubai</span>
          </div>
        </div>

        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #e4c97a, #C9A84C)" }} />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0f1f17" }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-geo" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 5L47 30L72 30L52 47L60 72L40 57L20 72L28 47L8 30L33 30Z" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-geo)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A84C08 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-6 border"
            style={{ background: "#C9A84C15", borderColor: "#C9A84C40", color: "#C9A84C" }}
          >
            🌙 Digital Islamic Wedding Invitations
          </div>

          <h1 className="font-amiri text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4" style={{ color: "#FAF6EF" }}>
            Share Your{" "}
            <span style={{ color: "#C9A84C" }}>Nikkah</span>{" "}
            With the World
          </h1>

          <p className="font-lora text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: "#b8b4aa" }}>
            Beautiful digital wedding invitations with Arabic calligraphy, Quranic verses,
            countdown timers, and RSVP — crafted for Muslim couples.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-colors"
              style={{ background: "#C9A84C", color: "#0f1f17" }}
            >
              Browse Templates
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/i/demo-ahmad-mariam"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold transition-colors"
              style={{ borderColor: "#C9A84C50", color: "#FAF6EF" }}
            >
              View Live Demo
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
            <div className="text-center">
              <p className="font-lora text-2xl font-bold" style={{ color: "#C9A84C" }}>500+</p>
              <p className="text-xs" style={{ color: "#b8b4aa" }}>Invitations sent</p>
            </div>
            <div className="w-px h-8" style={{ background: "#234d38" }} />
            <div className="text-center">
              <p className="font-lora text-2xl font-bold" style={{ color: "#C9A84C" }}>4</p>
              <p className="text-xs" style={{ color: "#b8b4aa" }}>Template styles</p>
            </div>
            <div className="w-px h-8" style={{ background: "#234d38" }} />
            <div className="text-center">
              <p className="font-lora text-2xl font-bold" style={{ color: "#C9A84C" }}>Free</p>
              <p className="text-xs" style={{ color: "#b8b4aa" }}>Basic plan</p>
            </div>
          </div>
        </motion.div>

        {/* Right — floating card */}
        <div className="flex items-center justify-center">
          <FloatingCard />
        </div>
      </div>
    </section>
  );
}
