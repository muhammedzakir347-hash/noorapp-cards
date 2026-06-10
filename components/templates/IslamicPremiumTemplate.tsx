"use client";

import { useState, useRef } from "react";
import { Share2, Copy, Check, Download, MapPin } from "lucide-react";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import PhotoSlideshow from "@/components/invitation/PhotoSlideshow";
import GuestInbox from "@/components/invitation/GuestInbox";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import HijriDate from "@/components/invitation/HijriDate";

/* ── Helpers ──────────────────────────────────────────────────── */

function ordinalSuffix(n: number): string {
  if ([11, 12, 13].includes(n % 100)) return "TH";
  if (n % 10 === 1) return "ST";
  if (n % 10 === 2) return "ND";
  if (n % 10 === 3) return "RD";
  return "TH";
}

function getEventEmoji(name: string): string {
  const l = name.toLowerCase();
  if (l.includes("nikah") || l.includes("nikkah")) return "💍";
  if (l.includes("walima") || l.includes("waleema")) return "🎉";
  if (l.includes("mehendi") || l.includes("mehndi")) return "💄";
  if (l.includes("reception")) return "🥂";
  if (l.includes("ring")) return "💒";
  return "📅";
}

/* ── SVG: Corner Mandala ──────────────────────────────────────── */

function CornerMandala() {
  const petal = "rgba(4,30,18,0.55)";
  const line  = "rgba(201,168,76,0.28)";
  const a8    = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="180" height="180" viewBox="-90 -90 180 180" aria-hidden>
      {a8.map(a => (
        <ellipse key={`a${a}`} cx="0" cy="65" rx="18" ry="50"
          fill={petal} stroke={line} strokeWidth="0.8" transform={`rotate(${a})`} />
      ))}
      {a8.map(a => (
        <ellipse key={`b${a}`} cx="0" cy="42" rx="13" ry="33"
          fill={petal} stroke={line} strokeWidth="0.6" transform={`rotate(${a + 22.5})`} />
      ))}
      {a8.map(a => (
        <ellipse key={`c${a}`} cx="0" cy="24" rx="8" ry="18"
          fill={petal} stroke={line} strokeWidth="0.5" transform={`rotate(${a})`} />
      ))}
      {a8.map(a => (
        <ellipse key={`d${a}`} cx="0" cy="13" rx="5" ry="10"
          fill={petal} stroke={line} strokeWidth="0.4" transform={`rotate(${a + 22.5})`} />
      ))}
      <circle cx="0" cy="0" r="80" fill="none" stroke={line} strokeWidth="0.5" />
      <circle cx="0" cy="0" r="58" fill="none" stroke={line} strokeWidth="0.4" />
      <circle cx="0" cy="0" r="36" fill="none" stroke={line} strokeWidth="0.4" />
      <circle cx="0" cy="0" r="17" fill="none" stroke={line} strokeWidth="0.5" />
      {a8.map(a => (
        <line key={`s${a}`} x1="0" y1="-8" x2="0" y2="8"
          stroke={line} strokeWidth="0.5" transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="10" fill={petal} stroke={line} strokeWidth="0.8" />
      <circle cx="0" cy="0" r="5" fill="rgba(201,168,76,0.20)" />
    </svg>
  );
}

/* ── SVG: Mughal Arch Frame ───────────────────────────────────── */

function MughalArchFrame({ color = "#C9A84C" }: { color?: string }) {
  const W = 330, H = 580;
  const cx = W / 2;
  const springY = 215;
  const apexY   = 12;

  const outerPath = [
    `M 8,${H}`, `L 8,${springY}`,
    `C 8,80 100,${apexY} ${cx},${apexY}`,
    `C ${W - 100},${apexY} ${W - 8},80 ${W - 8},${springY}`,
    `L ${W - 8},${H}`,
  ].join(" ");

  const innerPath = [
    `M 28,${H}`, `L 28,${springY + 6}`,
    `C 28,96 110,${apexY + 26} ${cx},${apexY + 26}`,
    `C ${W - 110},${apexY + 26} ${W - 28},96 ${W - 28},${springY + 6}`,
    `L ${W - 28},${H}`,
  ].join(" ");

  const diamonds = Array.from({ length: 17 }, (_, i) => 222 + i * 21);
  const scallops = Array.from({ length: 13 }, (_, i) => 29 + i * 21);

  const curveDots = [0.25, 0.5, 0.75].map(t => {
    const mt = 1 - t;
    return {
      lx: mt ** 3 * 8 + 3 * mt ** 2 * t * 8 + 3 * mt * t ** 2 * 100 + t ** 3 * cx,
      ly: mt ** 3 * springY + 3 * mt ** 2 * t * 80 + 3 * mt * t ** 2 * apexY + t ** 3 * apexY,
      rx: W - (mt ** 3 * 8 + 3 * mt ** 2 * t * 8 + 3 * mt * t ** 2 * 100 + t ** 3 * cx),
    };
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
         className="absolute inset-0 pointer-events-none" aria-hidden>
      <path d={outerPath} fill="rgba(6,46,29,0.50)" />
      <path d={outerPath} fill="none" stroke={color} strokeWidth="2.5" opacity="0.92" />
      <path d={innerPath} fill="none" stroke={color} strokeWidth="1"   opacity="0.38" />
      {diamonds.map(y => (
        <g key={y}>
          <polygon points={`18,${y - 7} 24,${y} 18,${y + 7} 12,${y}`}
                   fill={color} opacity="0.52" />
          <polygon points={`${W - 18},${y - 7} ${W - 12},${y} ${W - 18},${y + 7} ${W - 24},${y}`}
                   fill={color} opacity="0.52" />
        </g>
      ))}
      {scallops.map(x => (
        <path key={x} d={`M ${x},${springY} Q ${x + 10.5},${springY - 14} ${x + 21},${springY}`}
              fill="none" stroke={color} strokeWidth="0.9" opacity="0.38" />
      ))}
      {curveDots.map(({ lx, ly, rx }, i) => (
        <g key={i}>
          <circle cx={lx} cy={ly} r="2.5" fill={color} opacity="0.55" />
          <circle cx={rx} cy={ly} r="2.5" fill={color} opacity="0.55" />
        </g>
      ))}
      <g transform={`translate(${cx},${apexY})`}>
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map(a => (
          <line key={a} x1="0" y1="-9" x2="0" y2="9" stroke={color} strokeWidth="1.2"
                transform={`rotate(${a})`} opacity="0.82" />
        ))}
        <circle cx="0" cy="0" r="4.5" fill={color} opacity="0.96" />
      </g>
      <circle cx="8"      cy={springY} r="4" fill={color} opacity="0.75" />
      <circle cx={W - 8}  cy={springY} r="4" fill={color} opacity="0.75" />
      <line x1="8"     y1={springY} x2="28"     y2={springY} stroke={color} strokeWidth="1" opacity="0.42" />
      <line x1={W - 28} y1={springY} x2={W - 8} y2={springY} stroke={color} strokeWidth="1" opacity="0.42" />
      <line x1="28"    y1={H - 8}   x2={W - 28} y2={H - 8}   stroke={color} strokeWidth="0.8" opacity="0.28" />
    </svg>
  );
}

/* ── SVG: Interlocked Gold Rings ──────────────────────────────── */

function GoldRings({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="60" height="34" viewBox="0 0 60 34" aria-hidden className="mx-auto">
      <circle cx="20" cy="17" r="13" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="20" cy="17" r="9"  fill="none" stroke={color} strokeWidth="0.8" opacity="0.28" />
      <circle cx="40" cy="17" r="13" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="40" cy="17" r="9"  fill="none" stroke={color} strokeWidth="0.8" opacity="0.28" />
    </svg>
  );
}

/* ── SVG: Ornamental Divider ──────────────────────────────────── */

function OrnamentDivider({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="200" height="18" viewBox="0 0 200 18" aria-hidden className="mx-auto">
      <line x1="0"   y1="9" x2="82"  y2="9" stroke={color} strokeWidth="0.8" opacity="0.38" />
      <line x1="118" y1="9" x2="200" y2="9" stroke={color} strokeWidth="0.8" opacity="0.38" />
      <g transform="translate(100,9)">
        <path d="M-10,0 Q-6,-7 0,-5 Q6,-7 10,0 Q6,7 0,5 Q-6,7 -10,0 Z" fill={color} opacity="0.42" />
        <circle cx="0"   cy="0" r="2.5" fill={color} />
        <circle cx="-17" cy="0" r="1.5" fill={color} opacity="0.50" />
        <circle cx="17"  cy="0" r="1.5" fill={color} opacity="0.50" />
        <circle cx="-26" cy="0" r="1"   fill={color} opacity="0.28" />
        <circle cx="26"  cy="0" r="1"   fill={color} opacity="0.28" />
      </g>
    </svg>
  );
}

/* ── Couple Illustration ──────────────────────────────────────── */

function CoupleIllustration({ imageUrl, color = "#C9A84C" }: { imageUrl?: string; color?: string }) {
  if (imageUrl) {
    return (
      <div className="mx-auto" style={{ maxWidth: 210 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="Couple"
             className="w-full rounded-xl"
             style={{ filter: "sepia(0.45) saturate(1.3) brightness(0.88)" }} />
      </div>
    );
  }
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" aria-hidden className="mx-auto">
      {/* Groom */}
      <ellipse cx="70" cy="14" rx="11" ry="12" fill={color} opacity="0.72" />
      <rect x="60" y="6" width="20" height="6" rx="2" fill={color} opacity="0.90" />
      <path d="M52,26 Q70,20 88,26 L92,95 L48,95 Z" fill={color} opacity="0.65" />
      <path d="M52,32 Q40,46 42,62" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.65" />
      <path d="M88,32 Q100,46 98,62" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.65" />
      {/* Bride */}
      <ellipse cx="130" cy="13" rx="11" ry="11" fill={color} opacity="0.72" />
      <path d="M113,11 Q130,2 147,11 L153,44 Q130,52 107,44 Z" fill={color} opacity="0.88" />
      <path d="M107,42 Q130,36 153,42 L160,95 L96,95 Z" fill={color} opacity="0.65" />
      <path d="M107,44 Q99,57 101,66" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.65" />
      {/* Joined hands */}
      <path d="M96,60 Q100,68 104,60" fill="none" stroke={color} strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
      {/* Ground line */}
      <line x1="35" y1="96" x2="165" y2="96" stroke={color} strokeWidth="1" opacity="0.28" />
    </svg>
  );
}

/* ── Default Quran verse ──────────────────────────────────────── */

const DEFAULT_VERSE = {
  arabic:    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  english:   "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
  reference: "Quran 30:21",
};

/* ── Props ────────────────────────────────────────────────────── */

export interface IslamicPremiumTemplateProps {
  invitationId?: string;
  groomName: string;
  brideName: string;
  weddingDate: Date;
  startTime?: string;
  endTime?: string;
  venue: string;
  venueAddress?: string;
  venueMapUrl?: string;
  coupleImageUrl?: string;
  photos?: string[];
  quranVerse?: { arabic: string; english: string; reference: string };
  showHijriDate?: boolean;
  events?: Array<{ name: string; date: Date; venue: string }>;
  musicUrl?: string;
  dressCode?: string;
  transport?: string;
  language?: string;
  colors?: { bg?: string; card?: string; accent?: string; text?: string };
  shareUrl?: string;
}

/* ── Component ────────────────────────────────────────────────── */

export default function IslamicPremiumTemplate({
  invitationId,
  groomName,
  brideName,
  weddingDate,
  startTime,
  endTime,
  venue,
  venueAddress,
  venueMapUrl,
  coupleImageUrl,
  photos,
  quranVerse,
  showHijriDate = true,
  events,
  musicUrl,
  dressCode,
  transport,
  colors,
  shareUrl,
}: IslamicPremiumTemplateProps) {
  const [copied, setCopied]         = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const bg     = colors?.bg     ?? "#0a5c3a";
  const accent = colors?.accent ?? "#C9A84C";
  const ivory  = "#FAF6EF";

  const verse    = quranVerse ?? DEFAULT_VERSE;
  const imageUrl = coupleImageUrl ?? photos?.[0];

  /* Time display */
  const timeFrom    = startTime ?? weddingDate.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });
  const timeDisplay = endTime ? `${timeFrom} – ${endTime}` : timeFrom;

  /* Date parts */
  const dateNum = weddingDate.getDate();

  /* Actions */
  const url = shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, allowTaint: true, scale: 2, backgroundColor: bg,
      });
      const a = document.createElement("a");
      a.download = `${groomName}-${brideName}-invitation.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    } catch (e) {
      console.error("Download failed:", e);
    } finally {
      setDownloading(false);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `🌙 You're invited to the wedding of ${groomName} & ${brideName}!\n${url}`
  )}`;

  const cardBg     = "rgba(6,46,29,0.85)";
  const cardBorder = "rgba(201,168,76,0.20)";

  return (
    <div style={{ background: bg }} className="min-h-screen">
      {musicUrl && <MusicPlayer trackUrl={musicUrl} accent={accent} />}

      {/* ── Above-fold invitation card ─────────────────────── */}
      <div
        ref={cardRef}
        className="max-w-[390px] mx-auto relative overflow-hidden"
        style={{ minHeight: 700, background: bg }}
      >
        {/* Corner mandalas — center of each SVG sits exactly at the card corner */}
        {[
          { top:    0, left:  0, transform: "translate(-90px,-90px)" },
          { top:    0, right: 0, transform: "translate(90px,-90px)"  },
          { bottom: 0, left:  0, transform: "translate(-90px,90px)"  },
          { bottom: 0, right: 0, transform: "translate(90px,90px)"   },
        ].map((style, i) => (
          <div key={i} className="absolute pointer-events-none"
               style={{ width: 180, height: 180, ...style }}>
            <CornerMandala />
          </div>
        ))}

        {/* Arch + content */}
        <div className="flex justify-center py-7">
          <div className="relative" style={{ width: "87%", minHeight: 620 }}>
            <MughalArchFrame color={accent} />

            <div className="relative z-10 text-center"
                 style={{ paddingTop: 82, paddingBottom: 44, paddingLeft: 30, paddingRight: 30 }}>

              <GoldRings color={accent} />

              <p className="font-amiri mt-3 leading-[1.7]" dir="rtl"
                 style={{ color: accent, fontSize: 26 }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <p className="font-lora italic mt-3 leading-relaxed"
                 style={{ color: `${ivory}bb`, fontSize: 12 }}>
                With the blessings of Allah we are delighted
                <br />to invite you to the Nikah ceremony of:
              </p>

              <div className="mt-4">
                <p className="font-great-vibes" style={{ color: accent, fontSize: 38, lineHeight: 1.15 }}>
                  {groomName}
                </p>
                <p className="font-lora italic"
                   style={{ color: `${accent}90`, fontSize: 14, marginTop: 2 }}>
                  and
                </p>
                <p className="font-great-vibes" style={{ color: accent, fontSize: 38, lineHeight: 1.15 }}>
                  {brideName}
                </p>
              </div>

              <div className="mt-5"><OrnamentDivider color={accent} /></div>

              <p className="font-lora font-bold mt-4"
                 style={{ color: ivory, fontSize: 13, letterSpacing: "0.05em" }}>
                {weddingDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()},&nbsp;
                {dateNum}{ordinalSuffix(dateNum)}&nbsp;
                {weddingDate.toLocaleDateString("en-US", { month: "long" }).toUpperCase()}&nbsp;
                {weddingDate.getFullYear()}
              </p>

              {showHijriDate && (
                <p className="font-amiri mt-1 text-sm">
                  <HijriDate date={weddingDate} accent={accent} />
                </p>
              )}

              <p className="font-lora font-bold mt-1.5" style={{ color: ivory, fontSize: 15 }}>
                {timeDisplay}
              </p>

              <div className="mt-4"><OrnamentDivider color={accent} /></div>

              <div className="mt-4 space-y-0.5">
                <p className="font-lora font-medium" style={{ color: ivory, fontSize: 14 }}>{venue}</p>
                {venueAddress && (
                  <p className="font-inter text-xs" style={{ color: `${ivory}80` }}>{venueAddress}</p>
                )}
              </div>

              <div className="mt-6">
                <CoupleIllustration imageUrl={imageUrl} color={accent} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Below-fold sections ─────────────────────────────── */}
      <div className="max-w-[390px] mx-auto px-4 pb-16 pt-6 space-y-5">

        {/* Countdown */}
        <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="font-lora font-semibold text-base text-center mb-5" style={{ color: ivory }}>
            Counting Down to the Big Day
          </p>
          <CountdownTimer targetDate={weddingDate} accent={accent} />
        </div>

        {/* Quran verse */}
        <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="font-amiri text-xl leading-[2] text-right mb-3" dir="rtl" style={{ color: accent }}>
            {verse.arabic}
          </p>
          <p className="font-lora text-xs italic leading-relaxed text-center"
             style={{ color: `${ivory}99` }}>
            &ldquo;{verse.english}&rdquo;
          </p>
          <p className="text-center text-xs mt-2" style={{ color: `${accent}60` }}>
            {verse.reference}
          </p>
        </div>

        {/* Photo slideshow */}
        {photos && photos.length > 0 && (
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
            <p className="font-lora font-semibold text-sm p-4 pb-2"
               style={{ color: ivory, background: cardBg }}>
              Photos from our journey
            </p>
            <PhotoSlideshow photos={photos} accent={accent} />
          </div>
        )}

        {/* Pre-wedding events */}
        {events && events.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
            <p className="font-lora font-semibold text-base mb-4" style={{ color: ivory }}>
              Pre-Wedding Events
            </p>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3 items-start pb-3 border-b last:border-0 last:pb-0"
                     style={{ borderColor: `${accent}20` }}>
                  <span className="text-2xl shrink-0 mt-0.5">{getEventEmoji(ev.name)}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: ivory }}>{ev.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: `${ivory}70` }}>
                      {ev.date.toLocaleDateString("en-US", {
                        weekday: "short", month: "short", day: "numeric",
                      })}
                    </p>
                    {ev.venue && (
                      <p className="text-xs" style={{ color: `${ivory}55` }}>{ev.venue}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Venue */}
        <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="font-lora font-semibold text-base mb-4" style={{ color: ivory }}>Venue</p>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                 style={{ background: `${accent}20` }}>
              <MapPin size={18} style={{ color: accent }} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm" style={{ color: ivory }}>{venue}</p>
              {venueAddress && (
                <p className="text-xs mt-1" style={{ color: `${ivory}70` }}>{venueAddress}</p>
              )}
              {venueMapUrl && (
                <a href={venueMapUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium rounded-lg px-3 py-1.5"
                   style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
                  <MapPin size={11} /> Get Directions
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dress code + Transport */}
        {(dressCode || transport) && (
          <div className={`grid gap-3 ${dressCode && transport ? "grid-cols-2" : "grid-cols-1"}`}>
            {dressCode && (
              <div className="rounded-2xl p-4 text-center"
                   style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <span className="text-2xl">👗</span>
                <p className="text-xs mt-1" style={{ color: `${ivory}70` }}>Dress Code</p>
                <p className="font-medium text-sm mt-0.5" style={{ color: ivory }}>{dressCode}</p>
              </div>
            )}
            {transport && (
              <div className="rounded-2xl p-4 text-center"
                   style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <span className="text-2xl">🚌</span>
                <p className="text-xs mt-1" style={{ color: `${ivory}70` }}>Transport</p>
                <p className="font-medium text-sm mt-0.5" style={{ color: ivory }}>{transport}</p>
              </div>
            )}
          </div>
        )}

        {/* RSVP */}
        {invitationId && (
          <GuestInbox invitationId={invitationId} accent={accent} />
        )}

        {/* Share */}
        <div className="rounded-2xl p-5" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="font-lora font-semibold text-base mb-4" style={{ color: ivory }}>
            Share Invitation
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
               className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 text-xs font-semibold"
               style={{ background: "#25D366", color: "#fff" }}>
              <Share2 size={18} />
              WhatsApp
            </a>
            <button onClick={handleCopy}
                    className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 text-xs font-semibold border"
                    style={{ borderColor: `${accent}50`, color: accent }}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button onClick={handleDownload} disabled={downloading}
                    className="flex flex-col items-center gap-1.5 rounded-xl py-3 px-2 text-xs font-semibold disabled:opacity-50"
                    style={{ background: `${accent}20`, color: accent }}>
              <Download size={18} />
              {downloading ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 space-y-3">
          <p className="font-amiri text-lg" style={{ color: `${accent}80` }}>
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="text-xs" style={{ color: `${ivory}50` }}>
            Created with{" "}
            <a href="https://cards.noorapp.app" className="underline" style={{ color: accent }}>
              نور Cards
            </a>
          </p>
          <a href="https://noorapp.app" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-1.5 text-xs rounded-full px-4 py-2"
             style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}>
            Download NoorApp →
          </a>
        </div>

      </div>
    </div>
  );
}
