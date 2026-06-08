"use client";

import CountdownTimer from "@/components/invitation/CountdownTimer";
import GuestInbox from "@/components/invitation/GuestInbox";
import PhotoSlideshow from "@/components/invitation/PhotoSlideshow";
import { MapPin, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

export interface HinduTemplateProps {
  invitationId: string;
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venue: string;
  venueAddress?: string;
  venueMapUrl?: string;
  photos?: string[];
  events?: { name: string; date: Date; venue: string }[];
  dressCode?: string;
  transport?: string;
  colors?: { bg: string; card: string; accent: string };
  shareUrl?: string;
}

export default function HinduTemplate({
  invitationId, groomName, brideName, weddingDate, venue, venueAddress,
  venueMapUrl, photos = [], events = [], dressCode, transport,
  colors = { bg: "#1a0a00", card: "#3d1a00", accent: "#FF8C00" },
  shareUrl,
}: HinduTemplateProps) {
  const [copied, setCopied] = useState(false);
  const accent = colors.accent;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl ?? window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full" style={{ background: colors.bg }}>
      <div className="max-w-lg mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-5xl">🪷</p>
          <p className="text-sm uppercase tracking-widest" style={{ color: `${accent}80` }}>
            Shubh Vivah
          </p>
          <h1 className="font-amiri text-5xl" style={{ color: accent }}>
            {groomName}
          </h1>
          <p className="font-lora text-xl" style={{ color: "#FFF8E780" }}>&</p>
          <h1 className="font-amiri text-5xl" style={{ color: accent }}>
            {brideName}
          </h1>
        </div>

        {/* Date */}
        <div className="text-center rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
          <p className="font-lora text-2xl font-semibold" style={{ color: "#FFF8E7" }}>
            {weddingDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-base mt-1" style={{ color: `${accent}80` }}>
            {weddingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer targetDate={weddingDate} accent={accent} />

        {/* Venue */}
        <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
          <div className="flex items-start gap-3">
            <MapPin size={20} style={{ color: accent }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-lora text-lg font-medium" style={{ color: "#FFF8E7" }}>{venue}</p>
              {venueAddress && <p className="text-sm mt-1" style={{ color: "#FFF8E780" }}>{venueAddress}</p>}
              {venueMapUrl && (
                <a href={venueMapUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium rounded-lg px-3 py-1.5"
                  style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
                  <MapPin size={13} /> Get Directions
                </a>
              )}
            </div>
          </div>
        </div>

        {photos.length > 0 && <PhotoSlideshow photos={photos} accent={accent} />}

        {events.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
            <p className="font-lora font-semibold mb-4" style={{ color: accent }}>Wedding Events</p>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3 pb-3 last:pb-0 border-b last:border-0" style={{ borderColor: `${accent}20` }}>
                  <div className="w-1 rounded-full shrink-0" style={{ background: accent }} />
                  <div>
                    <p className="font-medium text-sm" style={{ color: "#FFF8E7" }}>{ev.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#FFF8E770" }}>
                      {ev.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {ev.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(dressCode || transport) && (
          <div className="grid grid-cols-2 gap-3">
            {dressCode && (
              <div className="rounded-xl p-4 text-center" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${accent}70` }}>Dress Code</p>
                <p className="text-sm font-medium" style={{ color: "#FFF8E7" }}>{dressCode}</p>
              </div>
            )}
            {transport && (
              <div className="rounded-xl p-4 text-center" style={{ background: colors.card, border: `1px solid ${accent}30` }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${accent}70` }}>Transport</p>
                <p className="text-sm font-medium" style={{ color: "#FFF8E7" }}>{transport}</p>
              </div>
            )}
          </div>
        )}

        <GuestInbox invitationId={invitationId} accent={accent} />

        {/* Share */}
        <div className="flex gap-3">
          <a href={`https://wa.me/?text=${encodeURIComponent(`You're invited to ${groomName} & ${brideName}'s wedding! 🪷\n${shareUrl ?? window.location.href}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
            style={{ background: "#25D366", color: "#fff" }}>
            <Share2 size={15} /> WhatsApp
          </a>
          <button onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border"
            style={{ borderColor: `${accent}50`, color: accent }}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs" style={{ color: "#FFF8E750" }}>
            Create yours at{" "}
            <a href="https://cards.noorapp.app" className="underline" style={{ color: accent }}>cards.noorapp.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
