"use client";

import CountdownTimer from "@/components/invitation/CountdownTimer";
import GuestInbox from "@/components/invitation/GuestInbox";
import PhotoSlideshow from "@/components/invitation/PhotoSlideshow";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import { MapPin, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

export interface ModernTemplateProps {
  invitationId: string;
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venue: string;
  venueAddress?: string;
  venueMapUrl?: string;
  photos?: string[];
  events?: { name: string; date: Date; venue: string }[];
  musicUrl?: string;
  dressCode?: string;
  transport?: string;
  colors?: { bg: string; card: string; accent: string };
  shareUrl?: string;
}

export default function ModernTemplate({
  invitationId, groomName, brideName, weddingDate, venue, venueAddress,
  venueMapUrl, photos = [], events = [], musicUrl, dressCode, transport,
  colors = { bg: "#0f0f0f", card: "#1a1a1a", accent: "#C9A84C" },
  shareUrl,
}: ModernTemplateProps) {
  const [copied, setCopied] = useState(false);
  const accent = colors.accent;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl ?? window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full" style={{ background: colors.bg }}>
      {musicUrl && <MusicPlayer trackUrl={musicUrl} accent={accent} />}

      <div className="max-w-lg mx-auto px-4 py-10 space-y-8">

        {/* Minimal header */}
        <div className="text-center space-y-5 pt-6">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium"
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
            Wedding Invitation
          </div>

          <div>
            <h1 className="font-amiri text-6xl" style={{ color: "#F5F5F5" }}>
              {groomName}
            </h1>
            <div className="flex items-center gap-3 justify-center my-2">
              <div className="flex-1 h-px max-w-[60px]" style={{ background: `${accent}40` }} />
              <span style={{ color: accent }}>✦</span>
              <div className="flex-1 h-px max-w-[60px]" style={{ background: `${accent}40` }} />
            </div>
            <h1 className="font-amiri text-6xl" style={{ color: "#F5F5F5" }}>
              {brideName}
            </h1>
          </div>
        </div>

        {/* Date block */}
        <div className="rounded-2xl p-6 text-center" style={{ background: colors.card, border: `1px solid ${accent}20` }}>
          <p className="font-lora text-2xl font-semibold" style={{ color: "#F5F5F5" }}>
            {weddingDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-base mt-1" style={{ color: `${accent}80` }}>
            {weddingDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        <CountdownTimer targetDate={weddingDate} accent={accent} />

        {/* Venue */}
        <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}20` }}>
          <div className="flex items-start gap-3">
            <MapPin size={20} style={{ color: accent }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-lora text-lg font-medium" style={{ color: "#F5F5F5" }}>{venue}</p>
              {venueAddress && <p className="text-sm mt-1" style={{ color: "#F5F5F580" }}>{venueAddress}</p>}
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
          <div className="rounded-2xl p-5" style={{ background: colors.card, border: `1px solid ${accent}20` }}>
            <p className="font-lora font-semibold mb-4" style={{ color: accent }}>Events</p>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-3 pb-3 last:pb-0 border-b last:border-0" style={{ borderColor: `${accent}15` }}>
                  <div className="w-1 rounded-full shrink-0" style={{ background: accent }} />
                  <div>
                    <p className="font-medium text-sm" style={{ color: "#F5F5F5" }}>{ev.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#F5F5F560" }}>
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
              <div className="rounded-xl p-4 text-center" style={{ background: colors.card, border: `1px solid ${accent}20` }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${accent}70` }}>Dress Code</p>
                <p className="text-sm font-medium" style={{ color: "#F5F5F5" }}>{dressCode}</p>
              </div>
            )}
            {transport && (
              <div className="rounded-xl p-4 text-center" style={{ background: colors.card, border: `1px solid ${accent}20` }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: `${accent}70` }}>Transport</p>
                <p className="text-sm font-medium" style={{ color: "#F5F5F5" }}>{transport}</p>
              </div>
            )}
          </div>
        )}

        <GuestInbox invitationId={invitationId} accent={accent} />

        <div className="flex gap-3">
          <a href={`https://wa.me/?text=${encodeURIComponent(`You're invited to ${groomName} & ${brideName}'s wedding! ✨\n${shareUrl ?? window.location.href}`)}`}
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

        <div className="text-center py-4">
          <p className="text-xs" style={{ color: "#F5F5F530" }}>
            Create yours at{" "}
            <a href="https://cards.noorapp.app" className="underline" style={{ color: accent }}>cards.noorapp.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
