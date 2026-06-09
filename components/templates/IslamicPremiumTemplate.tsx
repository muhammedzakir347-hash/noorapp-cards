"use client";

/* ── Helpers ─────────────────────────────────────────────────── */
function ordinalSuffix(n: number): string {
  if ([11, 12, 13].includes(n % 100)) return "TH";
  if (n % 10 === 1) return "ST";
  if (n % 10 === 2) return "ND";
  if (n % 10 === 3) return "RD";
  return "TH";
}

/* ── SVG: Corner Mandala ─────────────────────────────────────── */
function CornerMandala() {
  const c = "rgba(212,175,55,1)";
  const a8 = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="140" height="140" viewBox="-70 -70 140 140" aria-hidden>
      {a8.map(a => (
        <ellipse key={`o${a}`} cx="0" cy="52" rx="14" ry="40"
          fill={c} opacity="0.18" transform={`rotate(${a})`} />
      ))}
      {a8.map(a => (
        <ellipse key={`m${a}`} cx="0" cy="34" rx="10" ry="26"
          fill={c} opacity="0.11" transform={`rotate(${a + 22.5})`} />
      ))}
      {a8.map(a => (
        <ellipse key={`i${a}`} cx="0" cy="18" rx="6" ry="14"
          fill={c} opacity="0.14" transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="10" fill={c} opacity="0.22" />
      <circle cx="0" cy="0" r="5"  fill={c} opacity="0.35" />
    </svg>
  );
}

/* ── SVG: Mughal Arch Frame ──────────────────────────────────── */
function MughalArchFrame({ color = "#C9A84C" }: { color?: string }) {
  const W = 330, H = 580;
  const cx = W / 2;
  const springY = 215;
  const apexY   = 12;

  /* Cubic-bezier pointed arch gives the authentic Mughal profile */
  const outerPath = [
    `M 8,${H}`,
    `L 8,${springY}`,
    `C 8,80 100,${apexY} ${cx},${apexY}`,
    `C ${W - 100},${apexY} ${W - 8},80 ${W - 8},${springY}`,
    `L ${W - 8},${H}`,
  ].join(" ");

  const innerPath = [
    `M 28,${H}`,
    `L 28,${springY + 6}`,
    `C 28,96 110,${apexY + 26} ${cx},${apexY + 26}`,
    `C ${W - 110},${apexY + 26} ${W - 28},96 ${W - 28},${springY + 6}`,
    `L ${W - 28},${H}`,
  ].join(" ");

  /* Diamond ornaments on straight side strips */
  const diamonds = Array.from({ length: 17 }, (_, i) => 222 + i * 21);

  /* Scalloped pointed niches at arch spring */
  const scallops = Array.from({ length: 13 }, (_, i) => 29 + i * 21);

  /* Points on left cubic bezier — P0=(8,215) CP1=(8,80) CP2=(100,12) P3=(165,12) */
  const curveDots = [0.25, 0.5, 0.75].map(t => {
    const mt = 1 - t;
    const x = mt**3*8       + 3*mt**2*t*8  + 3*mt*t**2*100    + t**3*cx;
    const y = mt**3*springY + 3*mt**2*t*80 + 3*mt*t**2*apexY  + t**3*apexY;
    return { lx: x, ly: y, rx: W - x };
  });

  return (
    <svg
      width="100%" height="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    >
      {/* Subtle dark fill inside arch for depth */}
      <path d={outerPath} fill="rgba(6,46,29,0.45)" />

      {/* Outer arch border — thick gold */}
      <path d={outerPath} fill="none" stroke={color} strokeWidth="2.5" opacity="0.92" />

      {/* Inner arch border — thin gold */}
      <path d={innerPath} fill="none" stroke={color} strokeWidth="1"   opacity="0.38" />

      {/* Diamond ornaments — left straight side */}
      {diamonds.map(y => (
        <polygon key={`ld${y}`}
          points={`18,${y - 7} 24,${y} 18,${y + 7} 12,${y}`}
          fill={color} opacity="0.52"
        />
      ))}

      {/* Diamond ornaments — right straight side */}
      {diamonds.map(y => (
        <polygon key={`rd${y}`}
          points={`${W-18},${y-7} ${W-12},${y} ${W-18},${y+7} ${W-24},${y}`}
          fill={color} opacity="0.52"
        />
      ))}

      {/* Scalloped pointed niches at arch spring line */}
      {scallops.map(x => (
        <path key={`sc${x}`}
          d={`M ${x},${springY} Q ${x + 10.5},${springY - 14} ${x + 21},${springY}`}
          fill="none" stroke={color} strokeWidth="0.9" opacity="0.38"
        />
      ))}

      {/* Decoration dots along arch curve (left and right, symmetric) */}
      {curveDots.map(({ lx, ly, rx }, i) => (
        <g key={i}>
          <circle cx={lx}  cy={ly} r="2.5" fill={color} opacity="0.55" />
          <circle cx={rx}  cy={ly} r="2.5" fill={color} opacity="0.55" />
        </g>
      ))}

      {/* Apex 8-pointed star */}
      <g transform={`translate(${cx},${apexY})`}>
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map(a => (
          <line key={a}
            x1="0" y1="-9" x2="0" y2="9"
            stroke={color} strokeWidth="1.2"
            transform={`rotate(${a})`} opacity="0.82"
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill={color} opacity="0.96" />
      </g>

      {/* Spring-point circle markers */}
      <circle cx="8"     cy={springY} r="4" fill={color} opacity="0.75" />
      <circle cx={W - 8} cy={springY} r="4" fill={color} opacity="0.75" />

      {/* Short horizontal connectors at spring points */}
      <line x1="8"    y1={springY} x2="28"    y2={springY} stroke={color} strokeWidth="1" opacity="0.42" />
      <line x1={W-28} y1={springY} x2={W - 8} y2={springY} stroke={color} strokeWidth="1" opacity="0.42" />

      {/* Subtle base rule */}
      <line x1="28" y1={H - 8} x2={W - 28} y2={H - 8} stroke={color} strokeWidth="0.8" opacity="0.28" />
    </svg>
  );
}

/* ── SVG: Interlocked Gold Rings ─────────────────────────────── */
function GoldRings({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="68" height="38" viewBox="0 0 68 38" aria-hidden className="mx-auto">
      <circle cx="23" cy="19" r="15" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="23" cy="19" r="11" fill="none" stroke={color} strokeWidth="0.8" opacity="0.28" />
      <circle cx="45" cy="19" r="15" fill="none" stroke={color} strokeWidth="3.5" />
      <circle cx="45" cy="19" r="11" fill="none" stroke={color} strokeWidth="0.8" opacity="0.28" />
      {/* Overlap correction — redraw left ring's right edge over right ring */}
      <path d="M 34,5 Q 30,19 34,33" fill="none" stroke={color} strokeWidth="4.5" />
    </svg>
  );
}

/* ── SVG: Ornamental Divider ─────────────────────────────────── */
function OrnamentDivider({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="210" height="18" viewBox="0 0 210 18" aria-hidden className="mx-auto">
      <line x1="0"   y1="9" x2="88"  y2="9" stroke={color} strokeWidth="0.8" opacity="0.38" />
      <line x1="122" y1="9" x2="210" y2="9" stroke={color} strokeWidth="0.8" opacity="0.38" />
      <g transform="translate(105,9)">
        <path d="M-10,0 Q-6,-7 0,-5 Q6,-7 10,0 Q6,7 0,5 Q-6,7 -10,0 Z"
              fill={color} opacity="0.42" />
        <circle cx="0"   cy="0" r="2.5" fill={color} opacity="1.00" />
        <circle cx="-17" cy="0" r="1.5" fill={color} opacity="0.50" />
        <circle cx="17"  cy="0" r="1.5" fill={color} opacity="0.50" />
        <circle cx="-26" cy="0" r="1"   fill={color} opacity="0.28" />
        <circle cx="26"  cy="0" r="1"   fill={color} opacity="0.28" />
      </g>
    </svg>
  );
}

/* ── Couple Illustration ─────────────────────────────────────── */
function CoupleIllustration({
  imageUrl,
  color = "#C9A84C",
}: {
  imageUrl?: string;
  color?: string;
}) {
  if (imageUrl) {
    return (
      <div className="mx-auto" style={{ maxWidth: 200 }}>
        <img
          src={imageUrl}
          alt="Couple"
          className="w-full rounded-xl"
          style={{ filter: "sepia(0.45) saturate(1.3) brightness(0.88)" }}
        />
      </div>
    );
  }
  return (
    <svg width="180" height="95" viewBox="0 0 180 95" aria-hidden className="mx-auto">
      {/* Groom */}
      <ellipse cx="58" cy="14" rx="10" ry="11" fill={color} opacity="0.72" />
      <rect x="49" y="6" width="18" height="5" rx="2" fill={color} opacity="0.90" />
      <path d="M40,24 Q58,19 76,24 L79,90 L37,90 Z" fill={color} opacity="0.65" />
      <path d="M40,30 Q30,44 32,58" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.65" />
      <path d="M76,30 Q86,44 84,58" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.65" />
      {/* Bride */}
      <ellipse cx="122" cy="13" rx="10" ry="10" fill={color} opacity="0.72" />
      <path d="M107,11 Q122,3 137,11 L143,44 Q122,50 101,44 Z" fill={color} opacity="0.88" />
      <path d="M101,42 Q122,37 143,42 L149,90 L89,90 Z"        fill={color} opacity="0.65" />
      <path d="M101,44 Q94,56 96,64" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.65" />
      {/* Joined hands */}
      <path d="M84,56 Q90,62 96,56" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      {/* Ground */}
      <line x1="28" y1="91" x2="152" y2="91" stroke={color} strokeWidth="1" opacity="0.28" />
    </svg>
  );
}

/* ── Props ───────────────────────────────────────────────────── */
export interface IslamicPremiumTemplateProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venue: string;
  venueAddress?: string;
  startTime?: string;
  endTime?: string;
  coupleImageUrl?: string;
  showBismillah?: boolean;
  /* compat props — accepted from /i/[slug] routing but not rendered */
  invitationId?: string;
  venueMapUrl?: string;
  photos?: string[];
  showHijriDate?: boolean;
  events?: Array<{ name: string; date: Date; venue: string }>;
  musicUrl?: string;
  dressCode?: string;
  transport?: string;
  colors?: { bg?: string; card?: string; accent?: string; text?: string };
  shareUrl?: string;
  quranVerse?: { arabic: string; english: string; reference: string };
}

/* ── Component ───────────────────────────────────────────────── */
export default function IslamicPremiumTemplate({
  groomName,
  brideName,
  weddingDate,
  venue,
  venueAddress,
  startTime,
  endTime,
  coupleImageUrl,
  photos,
  showBismillah = true,
  colors,
}: IslamicPremiumTemplateProps) {
  const bg     = colors?.bg     ?? "#0a5c3a";
  const accent = colors?.accent ?? "#C9A84C";
  const ivory  = "#FAF6EF";

  const day     = weddingDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const dateNum = weddingDate.getDate();
  const month   = weddingDate.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  const year    = weddingDate.getFullYear();
  const dateStr = `${day}, ${dateNum}${ordinalSuffix(dateNum)} ${month} ${year}`;

  const timeFrom = startTime ?? weddingDate.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });
  const timeDisplay = endTime ? `${timeFrom} – ${endTime}` : timeFrom;

  const imageUrl = coupleImageUrl ?? photos?.[0];

  return (
    <div style={{ background: bg }} className="flex justify-center min-h-screen">
      <div
        className="relative w-full max-w-[390px] min-h-[700px] overflow-hidden"
        style={{ background: bg }}
      >

        {/* ── Four corner arabesque mandalas ───────────────── */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <CornerMandala />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none"
             style={{ transform: "scaleX(-1)" }}>
          <CornerMandala />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none"
             style={{ transform: "scaleY(-1)" }}>
          <CornerMandala />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none"
             style={{ transform: "scale(-1)" }}>
          <CornerMandala />
        </div>

        {/* ── Mughal arch + all invitation content ─────────── */}
        <div className="flex justify-center py-8">
          <div className="relative" style={{ width: "87%" }}>

            {/* Arch frame — absolute SVG overlay */}
            <MughalArchFrame color={accent} />

            {/* Invitation content — sits inside the arch */}
            <div
              className="relative z-10 text-center"
              style={{ paddingTop: 78, paddingBottom: 44, paddingLeft: 28, paddingRight: 28 }}
            >

              {/* 1. Interlocked wedding rings */}
              <GoldRings color={accent} />

              {/* 2. Bismillah */}
              {showBismillah && (
                <p
                  className="font-amiri mt-3"
                  dir="rtl"
                  style={{ color: accent, fontSize: 26, lineHeight: 1.7 }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              )}

              {/* 3. Italic preamble */}
              <p
                className="font-lora italic mt-3 leading-relaxed"
                style={{ color: `${ivory}bb`, fontSize: 11.5 }}
              >
                With the blessings of Allah we are delighted to
                <br />
                invite you to the Nikah ceremony of:
              </p>

              {/* 4. Couple names — Great Vibes cursive */}
              <div className="mt-4">
                <p
                  className="font-great-vibes"
                  style={{ color: accent, fontSize: 46, lineHeight: 1.15 }}
                >
                  {groomName}
                </p>
                <p
                  className="font-lora italic"
                  style={{ color: `${accent}90`, fontSize: 15, marginTop: 2 }}
                >
                  and
                </p>
                <p
                  className="font-great-vibes"
                  style={{ color: accent, fontSize: 46, lineHeight: 1.15 }}
                >
                  {brideName}
                </p>
              </div>

              {/* 5. Gold decorative divider */}
              <div className="mt-5">
                <OrnamentDivider color={accent} />
              </div>

              {/* 6. Wedding date — uppercase bold */}
              <p
                className="font-lora font-bold mt-4"
                style={{ color: ivory, fontSize: 12, letterSpacing: "0.07em" }}
              >
                {dateStr}
              </p>

              {/* 7. Time */}
              <p
                className="font-lora font-bold mt-1.5"
                style={{ color: ivory, fontSize: 16 }}
              >
                {timeDisplay}
              </p>

              {/* 8. Second gold divider */}
              <div className="mt-4">
                <OrnamentDivider color={accent} />
              </div>

              {/* 9. Venue */}
              <div className="mt-4 space-y-1">
                <p className="font-lora font-medium" style={{ color: ivory, fontSize: 14 }}>
                  {venue}
                </p>
                {venueAddress && (
                  <p className="font-inter" style={{ color: `${ivory}80`, fontSize: 12 }}>
                    {venueAddress}
                  </p>
                )}
              </div>

              {/* 10. Muslim couple illustration / photo */}
              <div className="mt-6">
                <CoupleIllustration imageUrl={imageUrl} color={accent} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
