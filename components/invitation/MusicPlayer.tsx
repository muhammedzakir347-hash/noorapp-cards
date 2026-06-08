"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export const MUSIC_TRACKS = [
  { id: "nasheef-1", label: "Tala al Badru Alayna",  url: "/music/tala-al-badru.mp3"  },
  { id: "nasheef-2", label: "Ya Nabi Salam Alayka",  url: "/music/ya-nabi.mp3"        },
  { id: "nasheef-3", label: "Mawlaya",                url: "/music/mawlaya.mp3"        },
  { id: "nasheef-4", label: "Instrumental Oud",       url: "/music/oud-instrumental.mp3" },
];

interface Props {
  trackUrl?: string;
  autoplay?: boolean;
  accent?: string;
}

export default function MusicPlayer({ trackUrl, autoplay = false, accent = "#C9A84C" }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!trackUrl) return;
    audioRef.current = new Audio(trackUrl);
    audioRef.current.loop = true;
    if (autoplay) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
    return () => { audioRef.current?.pause(); };
  }, [trackUrl, autoplay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying((v) => !v);
  };

  if (!trackUrl) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 shadow-xl text-sm font-medium transition-all"
      style={{ background: accent, color: "#0f1f17" }}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Pause size={14} /> : <Play size={14} />}
      <Volume2 size={14} />
      <span className="hidden sm:inline">{playing ? "Pause" : "Music"}</span>
    </button>
  );
}
