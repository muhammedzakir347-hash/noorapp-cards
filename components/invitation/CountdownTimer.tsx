"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface Props {
  targetDate: Date;
  accent?: string;
}

export default function CountdownTimer({ targetDate, accent = "#C9A84C" }: Props) {
  const [time, setTime] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const isPast = targetDate.getTime() <= Date.now();

  if (isPast) {
    return (
      <div className="text-center py-4">
        <p className="font-amiri text-xl" style={{ color: accent }}>
          مَا شَاءَ اللَّهُ
        </p>
        <p className="text-sm text-muted mt-1">The blessed day has arrived</p>
      </div>
    );
  }

  const units = [
    { label: "Days",    value: time.days    },
    { label: "Hours",   value: time.hours   },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <div
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-lora font-bold"
              style={{ background: "#1a3a2a", border: `1px solid ${accent}40`, color: accent }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <span className="text-xs text-muted mt-1.5 tracking-wide">{label}</span>
          </div>
          {i < 3 && (
            <span className="text-2xl font-bold mb-4" style={{ color: accent }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
