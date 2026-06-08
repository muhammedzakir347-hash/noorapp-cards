"use client";

import { MapPin, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import PhotoSlideshow from "@/components/invitation/PhotoSlideshow";
import GuestInbox from "@/components/invitation/GuestInbox";
import HijriDate from "@/components/invitation/HijriDate";
import MusicPlayer from "@/components/invitation/MusicPlayer";

/* ── Islamic geometric SVG border ────────────────────────────── */
function IslamicBorder({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="100%" height="32" viewBox="0 0 400 32" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="geo" width="40" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M20 2 L30 16 L20 30 L10 16 Z M0 16 L10 2 M30 2 L40 16 M10 30 L0 16 M30 30 L40 16"
            fill="none" stroke={color} strokeWidth="0.8" opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  );
}

function CrescentDivider({ color = "#C9A84C" }: { color?: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: `${color}40` }} />
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <path
          d="M24 16a8 8 0 1 1-8-8 6 6 0 0 0 8 8z"
          fill="none" stroke={color} strokeWidth="1.5"
        />
        <circle cx="22" cy="10" r="1.5" fill={color} />
      </svg>
      <div className="flex-1 h-px" style={{ background: `${color}40` }} />
    </div>
  );
}

/* ── Props ────────────────────────────────────────────────────── */
export interface IslamicTemplateProps {
  invitationId: string;
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venue: string;
  venueAddress?: string;
  venueMapUrl?: string;
  photos?: string[];
  quranVerse?: { arabic: string; english: string; reference: string };
  showHijriDate?: boolean;
  events?: { name: string; date: Date; venue: string }[];
  musicUrl?: string;
  dressCode?: string;
  transport?: string;
  colors?: { bg: string; card: string; accent: string };
  shareUrl?: string;
}

const DEFAULT_VERSE = {
  arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  english: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you affection and mercy.",
  reference: "Quran 30:21",
};

export default function IslamicTemplate({
  invitationId, groomName, brideName, weddingDate, venue, venueAddress,
  venueMapUrl, photos = [], quranVerse, showHijriDate = true, events = [],
  musicUrl, dressCode, transport,
  colors = { bg: "#0f1f17", card: "#1a3a2a", accent: "#C9A84C" },
  shareUrl,
}: IslamicTemplateProps) {
  const [copied, setCopied] = useState(false);
  const verse = quranVerse ?? DEFAULT_VERSE;
  const accent = colors.accent;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl ?? window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `You're invited to the wedding of ${groomName} & ${brideName}! 🌙\n${shareUrl ?? window.location.href}`
  )}`;

  return (
    <div className="min-h-screen w-full" style={{ background: colors.bg }}>
      {/* Music */}
      {musicUrl && <MusicPlayer trackUrl={musicUrl} accent={accent} />}

      {/* Outer border pattern */}
      <IslamicBorder color={accent} />

      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">

        {/* ── 1. Bismillah ─────────────────────────────────── */}
        <div className="text-center pt-4">
          <p
            className="font-amiri text-3xl sm:text-4xl leading-relaxed"
            dir="rtl"
            style={{ color: accent }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        <CrescentDivider color={accent} />

        {/* ── 2. Quran Verse ────────────────────────────────── */}
        <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
          <p
            className="font-amiri text-xl sm:text-2xl leading-[2] text-right mb-4"
            dir="rtl"
            style={{ color: accent }}
          >
            {verse.arabic}
          </p>
          <p className="text-sm italic leading-relaxed" style={{ color: "#FAF6EF99" }}>
            "{verse.english}"
          </p>
          <p className="text-xs mt-2" style={{ color: `${accent}80` }}>{verse.reference}</p>
        </div>

        {/* ── 3. Names ──────────────────────────────────────── */}
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: `${accent}70` }}>
            With the blessings of Allah
          </p>
          <div className="space-y-1">
            <h1 className="font-amiri text-4xl sm:text-5xl" style={{ color: accent }}>
              {groomName}
            </h1>
            <p className="font-lora text-lg" style={{ color: "#FAF6EF80" }}>&</p>
            <h1 className="font-amiri text-4xl sm:text-5xl" style={{ color: accent }}>
              {brideName}
            </h1>
          </div>
          <p className="font-lora text-sm tracking-wide" style={{ color: "#FAF6EFaa" }}>
            are joyfully united in marriage
          </p>
        </div>

        <CrescentDivider color={accent} />

        {/* ── 4. Date ───────────────────────────────────────── */}
        <div className="text-center rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: `${accent}70` }}>Wedding Date</p>
          <p className="font-lora text-2xl sm:text-3xl font-semibold mb-1" style={{ color: "#FAF6EF" }}>
            {weddingDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="font-lora text-base" style={{ color: `${accent}80` }}>
            {weddingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
          {showHijriDate && (
            <p className="font-amiri text-base mt-2">
              <HijriDate date={weddingDate} accent={accent} />
            </p>
          )}
        </div>

        {/* ── 5. Countdown ──────────────────────────────────── */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}70` }}>Counting Down</p>
          <CountdownTimer targetDate={weddingDate} accent={accent} />
        </div>

        {/* ── 6. Venue ──────────────────────────────────────── */}
        <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
          <div className="flex items-start gap-3">
            <MapPin size={20} style={{ color: accent }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-lora text-lg font-medium" style={{ color: "#FAF6EF" }}>{venue}</p>
              {venueAddress && (
                <p className="text-sm mt-1" style={{ color: "#FAF6EF80" }}>{venueAddress}</p>
              )}
              {venueMapUrl && (
                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium rounded-lg px-3 py-1.5 transition-colors"
                  style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}
                >
                  <MapPin size={13} />
                  Get Directions
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── 7. Photos ─────────────────────────────────────── */}
        {photos.length > 0 && (
          <div>
            <p className="text-center text-xs uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}70` }}>
              Our Moments
            </p>
            <PhotoSlideshow photos={photos} accent={accent} />
          </div>
        )}

        {/* ── 8. Pre-wedding Events ─────────────────────────── */}
        {events.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
            <p className="font-lora text-base font-semibold mb-4" style={{ color: accent }}>Wedding Events</p>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3 pb-3 last:pb-0 border-b last:border-0" style={{ borderColor: `${accent}20` }}>
                  <div className="w-1 rounded-full shrink-0" style={{ background: accent }} />
                  <div>
                    <p className="font-medium text-sm" style={{ color: "#FAF6EF" }}>{ev.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#FAF6EF70" }}>
                      {ev.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {ev.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 9. Dress Code & Transport ─────────────────────── */}
        {(dressCode || transport) && (
          <div className="grid grid-cols-2 gap-3">
            {dressCode && (
              <div className="rounded-xl p-4 text-center" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${accent}70` }}>Dress Code</p>
                <p className="text-sm font-medium" style={{ color: "#FAF6EF" }}>{dressCode}</p>
              </div>
            )}
            {transport && (
              <div className="rounded-xl p-4 text-center" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${accent}70` }}>Transport</p>
                <p className="text-sm font-medium" style={{ color: "#FAF6EF" }}>{transport}</p>
              </div>
            )}
          </div>
        )}

        <CrescentDivider color={accent} />

        {/* ── 10. Guest Inbox ───────────────────────────────── */}
        <GuestInbox invitationId={invitationId} accent={accent} />

        {/* ── 11. Share ─────────────────────────────────────── */}
        <div>
          <p className="text-center text-xs uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}70` }}>
            Share Invitation
          </p>
          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <Share2 size={15} />
              WhatsApp
            </a>
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border transition-colors"
              style={{ borderColor: `${accent}50`, color: accent }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* ── 12. Footer ────────────────────────────────────── */}
        <div className="text-center py-4 space-y-2">
          <p className="font-amiri text-lg" style={{ color: `${accent}80` }}>
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="text-xs" style={{ color: "#FAF6EF50" }}>
            Create yours at{" "}
            <a href="https://cards.noorapp.app" className="underline hover:opacity-80" style={{ color: accent }}>
              cards.noorapp.app
            </a>
            {" "}· Download{" "}
            <a href="https://noorapp.app" className="underline hover:opacity-80" style={{ color: accent }}>
              NoorApp
            </a>
          </p>
        </div>
      </div>

      <IslamicBorder color={accent} />
    </div>
  );
}
