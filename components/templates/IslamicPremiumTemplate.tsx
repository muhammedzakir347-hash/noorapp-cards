"use client";

import { useState } from "react";
import { MapPin, Share2, Copy, Check } from "lucide-react";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import PhotoSlideshow from "@/components/invitation/PhotoSlideshow";
import GuestInbox from "@/components/invitation/GuestInbox";
import HijriDate from "@/components/invitation/HijriDate";
import MusicPlayer from "@/components/invitation/MusicPlayer";

/* ── SVG Decorative Elements ─────────────────────────────────── */

function MughalArch({ color = "#C9A84C" }: { color?: string }) {
  const w = 358;
  const h = 480;
  const cx = w / 2;

  const outer = `M 20,${h} L 20,${h * 0.45} Q 20,${h * 0.15} ${cx},20 Q ${w - 20},${h * 0.15} ${w - 20},${h * 0.45} L ${w - 20},${h} Z`;
  const inner = `M 34,${h} L 34,${h * 0.46} Q 34,${h * 0.18} ${cx},34 Q ${w - 34},${h * 0.18} ${w - 34},${h * 0.46} L ${w - 34},${h} Z`;

  return (
    <svg
      width="100%" height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 w-full"
      style={{ top: 0, left: 0 }}
      aria-hidden
    >
      {/* Filled arch interior */}
      <path d={outer} fill="#062e1d" opacity="0.6" />

      {/* Outer arch border */}
      <path d={outer} fill="none" stroke={color} strokeWidth="2" opacity="0.7" />

      {/* Inner arch border */}
      <path d={inner} fill="none" stroke={color} strokeWidth="1" opacity="0.35" />

      {/* Top-left arabesque corner */}
      <g transform="translate(10, 10)" opacity="0.55">
        <path d="M0,50 Q0,0 50,0" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,50 Q12,12 50,0" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx="9"  cy="9"  r="2.5" fill={color} />
        <circle cx="24" cy="5"  r="1.5" fill={color} opacity="0.6" />
        <circle cx="5"  cy="24" r="1.5" fill={color} opacity="0.6" />
        <circle cx="18" cy="18" r="1"   fill={color} opacity="0.4" />
      </g>

      {/* Top-right arabesque corner (mirrored) */}
      <g transform={`translate(${w - 10}, 10) scale(-1,1)`} opacity="0.55">
        <path d="M0,50 Q0,0 50,0" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,50 Q12,12 50,0" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx="9"  cy="9"  r="2.5" fill={color} />
        <circle cx="24" cy="5"  r="1.5" fill={color} opacity="0.6" />
        <circle cx="5"  cy="24" r="1.5" fill={color} opacity="0.6" />
        <circle cx="18" cy="18" r="1"   fill={color} opacity="0.4" />
      </g>

      {/* Dots along left arch spine */}
      {[0.18, 0.32, 0.48, 0.64, 0.78].map((t, i) => {
        const x = 20 + (cx - 20) * t;
        const y = h * 0.45 - (h * 0.45 - 20) * Math.sin((t * Math.PI) / 2);
        return <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.35" />;
      })}

      {/* Dots along right arch spine (mirrored) */}
      {[0.18, 0.32, 0.48, 0.64, 0.78].map((t, i) => {
        const x = w - 20 - (cx - 20) * t;
        const y = h * 0.45 - (h * 0.45 - 20) * Math.sin((t * Math.PI) / 2);
        return <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.35" />;
      })}

      {/* 8-pointed star at arch apex */}
      <g transform={`translate(${cx}, 23)`}>
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle) => (
          <line
            key={angle}
            x1="0" y1="-8" x2="0" y2="8"
            stroke={color} strokeWidth="1"
            transform={`rotate(${angle})`}
            opacity="0.75"
          />
        ))}
        <circle cx="0" cy="0" r="3.5" fill={color} opacity="0.95" />
      </g>

      {/* Scalloped arch base — decorative row of small arches at bottom of frame */}
      <g transform={`translate(20, ${h - 2})`} opacity="0.4">
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M ${i * 36},0 Q ${i * 36 + 18},-14 ${i * 36 + 36},0`}
            fill="none" stroke={color} strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}

function GoldRings({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="60" height="34" viewBox="0 0 60 34" aria-hidden className="mx-auto">
      <circle cx="21" cy="17" r="13" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="21" cy="17" r="9"  fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="39" cy="17" r="13" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="39" cy="17" r="9"  fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Overlap correction — redraw left ring's right edge over right ring */}
      <path d="M 30,5 Q 26,17 30,29" fill="none" stroke={color} strokeWidth="3.5" />
    </svg>
  );
}

function ArabesqueDivider({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="100%" height="22" viewBox="0 0 300 22" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line x1="0"   y1="11" x2="118" y2="11" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="182" y1="11" x2="300" y2="11" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <g transform="translate(150,11)">
        <path
          d="M-9,0 Q-5,-6 0,-4 Q5,-6 9,0 Q5,6 0,4 Q-5,6 -9,0 Z"
          fill={color} opacity="0.5"
        />
        <circle cx="0"   cy="0"  r="2.5" fill={color} opacity="0.95" />
        <circle cx="-18" cy="0"  r="1.5" fill={color} opacity="0.5"  />
        <circle cx="18"  cy="0"  r="1.5" fill={color} opacity="0.5"  />
        <circle cx="-28" cy="0"  r="1"   fill={color} opacity="0.3"  />
        <circle cx="28"  cy="0"  r="1"   fill={color} opacity="0.3"  />
      </g>
    </svg>
  );
}

function CoupleSilhouette({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="180" height="100" viewBox="0 0 180 100" aria-hidden className="mx-auto">
      {/* ── Groom (left) ── */}
      <ellipse cx="58" cy="15" rx="11" ry="12" fill={color} opacity="0.75" />
      {/* Kufi cap */}
      <rect x="48" y="6" width="20" height="6" rx="3" fill={color} opacity="0.95" />
      {/* Thobe */}
      <path d="M42,26 Q58,21 74,26 L78,92 L38,92 Z" fill={color} opacity="0.7" />
      {/* Left arm */}
      <path d="M42,34 Q30,46 32,62" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      {/* Right arm reaching toward bride */}
      <path d="M74,34 Q84,48 82,62" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.7" />

      {/* ── Bride (right) ── */}
      <ellipse cx="122" cy="14" rx="11" ry="11" fill={color} opacity="0.75" />
      {/* Hijab draped over head and shoulders */}
      <path d="M106,12 Q122,3 138,12 L144,46 Q122,52 100,46 Z" fill={color} opacity="0.9" />
      {/* Abaya */}
      <path d="M100,44 Q122,38 144,44 L150,92 L90,92 Z" fill={color} opacity="0.7" />
      {/* Left arm reaching toward groom */}
      <path d="M100,46 Q92,58 94,66" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.7" />

      {/* Joined hands in center */}
      <path d="M82,60 Q90,66 98,60" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.85" />

      {/* Ground line */}
      <line x1="24" y1="93" x2="156" y2="93" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

const DEFAULT_VERSE = {
  arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  english: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you affection and mercy.",
  reference: "Quran 30:21",
};

/* ── Props ────────────────────────────────────────────────────── */
export interface IslamicPremiumTemplateProps {
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

/* ── Component ────────────────────────────────────────────────── */
export default function IslamicPremiumTemplate({
  invitationId, groomName, brideName, weddingDate, venue, venueAddress,
  venueMapUrl, photos = [], quranVerse, showHijriDate = true, events = [],
  musicUrl, dressCode, transport,
  colors = { bg: "#0a5c3a", card: "#0d7048", accent: "#C9A84C" },
  shareUrl,
}: IslamicPremiumTemplateProps) {
  const [copied, setCopied] = useState(false);
  const accent = colors.accent;
  const verse = quranVerse ?? DEFAULT_VERSE;

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
      {musicUrl && <MusicPlayer trackUrl={musicUrl} accent={accent} />}

      <div className="max-w-[390px] mx-auto px-4 py-8 space-y-6">

        {/* ── 1. Mughal Arch Header ──────────────────────────── */}
        <div className="relative" style={{ minHeight: 480 }}>
          <MughalArch color={accent} />

          {/* Content inside arch */}
          <div className="relative z-10 text-center pt-10 pb-8 px-8 space-y-4">
            <GoldRings color={accent} />

            {/* Bismillah */}
            <p
              className="font-amiri text-2xl sm:text-3xl leading-relaxed"
              dir="rtl"
              style={{ color: accent }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <ArabesqueDivider color={accent} />

            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: `${accent}70` }}>
              With the blessings of Allah
            </p>

            {/* Couple names — Pinyon Script cursive */}
            <div className="space-y-1">
              <p className="font-pinyon text-6xl leading-tight" style={{ color: "#FAF6EF" }}>
                {groomName}
              </p>
              <p className="font-amiri text-lg" style={{ color: `${accent}80` }}>
                &
              </p>
              <p className="font-pinyon text-6xl leading-tight" style={{ color: "#FAF6EF" }}>
                {brideName}
              </p>
            </div>

            <ArabesqueDivider color={accent} />

            {/* Date */}
            <div>
              <p className="font-lora text-base font-semibold" style={{ color: "#FAF6EF" }}>
                {weddingDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
              <p className="font-lora text-sm mt-0.5" style={{ color: `${accent}90` }}>
                {weddingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </p>
              {showHijriDate && (
                <p className="font-amiri text-sm mt-1">
                  <HijriDate date={weddingDate} accent={accent} />
                </p>
              )}
            </div>

            {/* Venue inside arch */}
            <div className="flex items-center justify-center gap-1.5">
              <MapPin size={13} style={{ color: accent }} />
              <p className="font-lora text-sm" style={{ color: "#FAF6EFaa" }}>{venue}</p>
            </div>
          </div>
        </div>

        {/* ── 2. Quran Verse ────────────────────────────────── */}
        <div className="rounded-2xl p-5 text-center" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
          <p
            className="font-amiri text-xl sm:text-2xl leading-[2] text-right mb-3"
            dir="rtl"
            style={{ color: accent }}
          >
            {verse.arabic}
          </p>
          <p className="font-lora text-xs italic leading-relaxed" style={{ color: "#FAF6EF99" }}>
            "{verse.english}"
          </p>
          <p className="text-xs mt-1.5" style={{ color: `${accent}60` }}>{verse.reference}</p>
        </div>

        {/* ── 3. Countdown ──────────────────────────────────── */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}70` }}>
            Counting Down
          </p>
          <CountdownTimer targetDate={weddingDate} accent={accent} />
        </div>

        {/* ── 4. Full venue card ────────────────────────────── */}
        {(venueAddress || venueMapUrl) && (
          <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
            <div className="flex items-start gap-3">
              <MapPin size={18} style={{ color: accent }} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-lora font-medium" style={{ color: "#FAF6EF" }}>{venue}</p>
                {venueAddress && <p className="text-sm mt-0.5" style={{ color: "#FAF6EF80" }}>{venueAddress}</p>}
                {venueMapUrl && (
                  <a
                    href={venueMapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium rounded-lg px-3 py-1.5"
                    style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}
                  >
                    <MapPin size={12} /> Get Directions
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 5. Photo Slideshow ────────────────────────────── */}
        {photos.length > 0 && (
          <div>
            <p className="text-center text-xs uppercase tracking-[0.2em] mb-3" style={{ color: `${accent}70` }}>
              Our Moments
            </p>
            <PhotoSlideshow photos={photos} accent={accent} />
          </div>
        )}

        {/* ── 6. Events ─────────────────────────────────────── */}
        {events.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
            <p className="font-lora font-semibold mb-4" style={{ color: accent }}>Wedding Events</p>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3 pb-3 last:pb-0 border-b last:border-0" style={{ borderColor: `${accent}20` }}>
                  <div className="w-1 rounded-full shrink-0" style={{ background: accent }} />
                  <div>
                    <p className="font-medium text-sm" style={{ color: "#FAF6EF" }}>{ev.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#FAF6EF70" }}>
                      {ev.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {ev.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 7. Dress Code & Transport ─────────────────────── */}
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

        {/* ── 8. Couple Silhouette ──────────────────────────── */}
        <div className="py-4">
          <ArabesqueDivider color={accent} />
          <div className="py-5">
            <CoupleSilhouette color={accent} />
          </div>
          <ArabesqueDivider color={accent} />
        </div>

        {/* ── 9. RSVP ───────────────────────────────────────── */}
        <GuestInbox invitationId={invitationId} accent={accent} />

        {/* ── 10. Share ─────────────────────────────────────── */}
        <div>
          <p className="text-center text-xs uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}70` }}>
            Share Invitation
          </p>
          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <Share2 size={14} /> WhatsApp
            </a>
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border"
              style={{ borderColor: `${accent}50`, color: accent }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* ── 11. Footer ────────────────────────────────────── */}
        <div className="text-center py-4 space-y-2">
          <ArabesqueDivider color={accent} />
          <p className="font-amiri text-lg pt-3" style={{ color: `${accent}80` }}>
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="text-xs" style={{ color: "#FAF6EF40" }}>
            Created with{" "}
            <a href="https://cards.noorapp.app" className="underline" style={{ color: accent }}>
              نور Cards
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
