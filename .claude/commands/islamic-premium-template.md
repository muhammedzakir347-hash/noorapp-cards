# Al-Noor Premium Islamic Wedding Invitation Template

Build `components/templates/IslamicPremiumTemplate.tsx` — the flagship premium template for NoorCards.

## Design Reference

A full-screen digital invitation card (max 390px) styled after Mughal-era Islamic architecture:

```
┌─────────────────────────────┐
│  ╭───── Mughal Arch ─────╮  │
│  │    ✦ Gold Rings ✦     │  │
│  │   بِسْمِ اللَّهِ        │  │
│  │  ────── ☽ ──────      │  │
│  │   Ahmad                │  │
│  │     &                  │  │
│  │   Mariam               │  │
│  │  ────── ✦ ──────      │  │
│  │  Saturday, 14 Dhul..  │  │
│  │  7:00 PM               │  │
│  │  Al-Baraka Hall        │  │
│  │  [Countdown Timer]     │  │
│  │  [Photo Slideshow]     │  │
│  │  👫 Couple Silhouette  │  │
│  ╰───────────────────────╯  │
│  [RSVP] [Share]             │
└─────────────────────────────┘
```

---

## Color Palette

```ts
const COLORS = {
  bg:          "#0a5c3a",  // deep Mughal emerald
  bgDark:      "#062e1d",  // darker shade for depth
  card:        "#0d7048",  // card surface
  arch:        "#0f1f17",  // arch interior
  gold:        "#C9A84C",  // primary gold accent
  goldLight:   "#e4c97a",  // hover / highlight gold
  goldDim:     "#C9A84C40", // transparent gold for borders
  ivory:       "#FAF6EF",  // primary text
  ivoryMuted:  "#FAF6EFaa", // secondary text
};
```

---

## Fonts

```tsx
// In app/layout.tsx — already loaded. Use CSS variables:
// --font-amiri-var   → font-amiri   (Arabic text, Bismillah, Quran)
// --font-lora-var    → font-lora    (dates, venue, body)
// --font-inter-var   → font-inter   (UI labels, small text)

// ADD to layout.tsx — cursive couple names:
import { Pinyon_Script } from "next/font/google";
const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
});
// Then add variable to <html> className
// Usage: className="font-pinyon" after adding to @theme:
// --font-pinyon: var(--font-pinyon-var, "Pinyon Script"), cursive;
```

---

## SVG Arch Frame

The Mughal pointed arch with arabesque border — full inline SVG, no images.

```tsx
function MughalArch({ color = "#C9A84C", width = 320, height = 420 }: {
  color?: string; width?: number; height?: number;
}) {
  const cx = width / 2;
  // Pointed arch path: rises from bottom corners, meets at pointed top center
  const archPath = `
    M 20,${height}
    L 20,${height * 0.45}
    Q 20,${height * 0.15} ${cx},20
    Q ${width - 20},${height * 0.15} ${width - 20},${height * 0.45}
    L ${width - 20},${height}
    Z
  `;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      {/* Outer arch border */}
      <path d={archPath} fill="none" stroke={color} strokeWidth="2" opacity="0.6" />

      {/* Inner arch (inset 12px) */}
      <path
        d={`M 32,${height} L 32,${height * 0.46} Q 32,${height * 0.18} ${cx},32
            Q ${width - 32},${height * 0.18} ${width - 32},${height * 0.46}
            L ${width - 32},${height} Z`}
        fill="none" stroke={color} strokeWidth="1" opacity="0.3"
      />

      {/* Corner arabesque — top left */}
      <g transform="translate(8, 8)" opacity="0.5">
        <path d="M0,40 Q0,0 40,0" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,40 Q10,10 40,0" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx="8" cy="8" r="2" fill={color} />
        <circle cx="20" cy="4" r="1.5" fill={color} opacity="0.6" />
        <circle cx="4" cy="20" r="1.5" fill={color} opacity="0.6" />
      </g>

      {/* Corner arabesque — top right (mirror) */}
      <g transform={`translate(${width - 8}, 8) scale(-1,1)`} opacity="0.5">
        <path d="M0,40 Q0,0 40,0" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M0,40 Q10,10 40,0" fill="none" stroke={color} strokeWidth="0.8" />
        <circle cx="8" cy="8" r="2" fill={color} />
        <circle cx="20" cy="4" r="1.5" fill={color} opacity="0.6" />
        <circle cx="4" cy="20" r="1.5" fill={color} opacity="0.6" />
      </g>

      {/* Decorative dots along arch spine */}
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, i) => {
        // Parametric point along left arch edge
        const x = 20 + (cx - 20) * t;
        const y = height * 0.45 - (height * 0.45 - 20) * Math.sin(t * Math.PI / 2);
        return <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.4" />;
      })}

      {/* Geometric star at arch apex */}
      <g transform={`translate(${cx}, 22)`}>
        {[0,45,90,135].map((angle) => (
          <line
            key={angle}
            x1="0" y1="-7" x2="0" y2="7"
            stroke={color} strokeWidth="1"
            transform={`rotate(${angle})`}
            opacity="0.8"
          />
        ))}
        <circle cx="0" cy="0" r="3" fill={color} opacity="0.9" />
      </g>
    </svg>
  );
}
```

---

## Gold Rings Icon

Interlocked wedding rings at the top of the card.

```tsx
function GoldRings({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="52" height="30" viewBox="0 0 52 30" aria-hidden>
      {/* Left ring */}
      <circle cx="18" cy="15" r="12" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="18" cy="15" r="8"  fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Right ring (overlapping) */}
      <circle cx="34" cy="15" r="12" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="34" cy="15" r="8"  fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Overlap cover — hides right ring behind left at intersection */}
      <path
        d="M 26,4 Q 22,15 26,26"
        fill="none" stroke={color} strokeWidth="3"
      />
    </svg>
  );
}
```

---

## Muslim Couple Silhouette (SVG)

Stylised silhouette — groom in thobe + kufi, bride in hijab — at bottom of card.

```tsx
function CoupleSilhouette({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="160" height="90" viewBox="0 0 160 90" aria-hidden>
      {/* Groom — left figure */}
      {/* Head with kufi */}
      <ellipse cx="52" cy="14" rx="10" ry="11" fill={color} opacity="0.7" />
      <rect x="43" y="6" width="18" height="5" rx="2" fill={color} opacity="0.9" />
      {/* Thobe body */}
      <path d="M38,24 Q52,20 66,24 L70,85 L34,85 Z" fill={color} opacity="0.65" />
      {/* Arms */}
      <path d="M38,30 Q28,40 30,55" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.65" />
      <path d="M66,30 Q76,40 74,55" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.65" />

      {/* Bride — right figure */}
      {/* Head with hijab */}
      <ellipse cx="108" cy="14" rx="10" ry="10" fill={color} opacity="0.7" />
      {/* Hijab drape */}
      <path d="M94,12 Q108,4 122,12 L126,40 Q108,44 90,40 Z" fill={color} opacity="0.85" />
      {/* Abaya / dress */}
      <path d="M90,38 Q108,34 126,38 L132,85 L84,85 Z" fill={color} opacity="0.65" />

      {/* Joining hands in center */}
      <path
        d="M74,52 Q80,56 86,52"
        fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round" opacity="0.8"
      />

      {/* Ground line */}
      <line x1="20" y1="86" x2="140" y2="86" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
```

---

## Arabesque Divider

Horizontal ornamental divider between sections.

```tsx
function ArabesqueDivider({ color = "#C9A84C" }: { color?: string }) {
  return (
    <svg width="280" height="20" viewBox="0 0 280 20" aria-hidden>
      <line x1="0"   y1="10" x2="110" y2="10" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="170" y1="10" x2="280" y2="10" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Center ornament */}
      <g transform="translate(140,10)">
        <circle cx="0"   cy="0" r="3" fill={color} opacity="0.9" />
        <circle cx="-14" cy="0" r="2" fill={color} opacity="0.5" />
        <circle cx="14"  cy="0" r="2" fill={color} opacity="0.5" />
        <path d="M-8,0 Q-5,-5 0,-3 Q5,-5 8,0 Q5,5 0,3 Q-5,5 -8,0 Z"
              fill={color} opacity="0.4" />
      </g>
    </svg>
  );
}
```

---

## Props Interface

```ts
// Must match existing templates for /i/[slug] routing
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
```

---

## Component Skeleton

```tsx
// components/templates/IslamicPremiumTemplate.tsx
"use client";

import { useState } from "react";
import { MapPin, Share2, Copy, Check } from "lucide-react";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import PhotoSlideshow from "@/components/invitation/PhotoSlideshow";
import GuestInbox from "@/components/invitation/GuestInbox";
import HijriDate from "@/components/invitation/HijriDate";
import MusicPlayer from "@/components/invitation/MusicPlayer";

export default function IslamicPremiumTemplate({ ...props }: IslamicPremiumTemplateProps) {
  const accent = props.colors?.accent ?? "#C9A84C";

  return (
    <div className="min-h-screen w-full" style={{ background: "#0a5c3a" }}>
      {props.musicUrl && <MusicPlayer trackUrl={props.musicUrl} accent={accent} />}

      <div className="max-w-[390px] mx-auto px-4 py-8 space-y-6">

        {/* 1. Mughal Arch Frame wrapping header */}
        <div className="relative pt-8 pb-6">
          {/* Arch SVG behind content */}
          <MughalArch color={accent} />

          {/* Content inside arch */}
          <div className="relative z-10 text-center space-y-4 px-8">
            <GoldRings color={accent} />
            {/* Bismillah */}
            <p className="font-amiri text-2xl" dir="rtl" style={{ color: accent }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <ArabesqueDivider color={accent} />
            {/* Couple names — cursive font */}
            <p className="font-pinyon text-5xl" style={{ color: "#FAF6EF" }}>
              {props.groomName}
            </p>
            <p className="font-amiri text-xl" style={{ color: `${accent}80` }}>&</p>
            <p className="font-pinyon text-5xl" style={{ color: "#FAF6EF" }}>
              {props.brideName}
            </p>
            <ArabesqueDivider color={accent} />
          </div>
        </div>

        {/* 2. Quran verse */}
        {/* 3. Date + Hijri */}
        {/* 4. Countdown */}
        {/* 5. Venue */}
        {/* 6. Photo slideshow */}
        {/* 7. Events */}
        {/* 8. Dress code / transport */}
        {/* 9. Couple silhouette */}
        <div className="flex justify-center py-4">
          <CoupleSilhouette color={accent} />
        </div>

        {/* 10. RSVP */}
        <GuestInbox invitationId={props.invitationId} accent={accent} />

        {/* 11. Share */}
        {/* 12. Footer */}
      </div>
    </div>
  );
}
```

---

## Register in lib/templates.ts

Add to the `TEMPLATES` array:

```ts
{
  id: "islamic-premium",
  name: "Al-Noor Premium",
  nameAr: "النور الفاخر",
  style: "islamic",
  emoji: "🕌",
  colors: { bg: "#0a5c3a", card: "#0d7048", accent: "#C9A84C", text: "#FAF6EF" },
  features: ["bismillah", "mughal-arch", "cursive-names", "hijri-date", "countdown",
             "slideshow", "couple-silhouette", "rsvp", "music"],
  description: "Mughal arch frame, arabesque patterns, cursive names, and couple silhouette",
},
```

---

## Add Font to layout.tsx

```ts
// Add to existing font imports:
import { Pinyon_Script } from "next/font/google";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon-var",
});

// Add variable to <html> tag:
<html className={`${amiri.variable} ${lora.variable} ${inter.variable} ${pinyonScript.variable}`}>
```

```css
/* Add to app/globals.css @theme block: */
--font-pinyon: var(--font-pinyon-var, "Pinyon Script"), cursive;
```

---

## Add to /i/[slug] Route

In `app/i/[slug]/page.tsx`, add the import and a case in `renderTemplate()`:

```ts
import IslamicPremiumTemplate from "@/components/templates/IslamicPremiumTemplate";

// In renderTemplate(), alongside the existing islamic check:
if (inv.style === "islamic" && inv.template_id === "islamic-premium") {
  return <IslamicPremiumTemplate {...sharedProps} />;
}
```

---

## Design Rules

- **Max width 390px** — designed for mobile-first, looks great on desktop centered
- **No external images** — all decorative elements are inline SVG
- **Arch frame** is `position: absolute` behind content; content sits in a `relative z-10` div
- **Couple names** use `font-pinyon` (Pinyon Script) at `text-5xl` (~48px)
- **Arabic text** always `dir="rtl"` and `font-amiri`
- **Gold on deep emerald** — primary visual language throughout
- **Couple silhouette** always at the bottom, above the RSVP section
- **All section spacing**: `space-y-6` on the outer container, `space-y-4` inside arch
- **Consistent with existing templates**: same props interface, same sub-components
  (CountdownTimer, GuestInbox, HijriDate, PhotoSlideshow, MusicPlayer)
