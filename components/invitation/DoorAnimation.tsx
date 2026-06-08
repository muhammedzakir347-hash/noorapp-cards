"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  accent?: string;
  onOpen?: () => void;
  children?: React.ReactNode;
}

export default function DoorAnimation({ accent = "#C9A84C", onOpen, children }: Props) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    onOpen?.();
  };

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
      {/* Content behind doors */}
      <div className="w-72 sm:w-80 rounded-2xl overflow-hidden">
        {children}
      </div>

      {/* Door panels — only visible when closed */}
      {!opened && (
        <div className="absolute inset-0 flex cursor-pointer" onClick={handleOpen}>
          {/* Left door */}
          <motion.div
            className="w-1/2 h-full flex items-center justify-center rounded-l-2xl border-r"
            style={{ background: "#1a3a2a", borderColor: `${accent}60`, transformOrigin: "left center" }}
            animate={opened ? { rotateY: -110 } : { rotateY: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <div className="text-center px-3">
              <div className="text-3xl mb-2">🕌</div>
              <p className="font-amiri text-sm leading-relaxed" style={{ color: accent }}>
                بِسْمِ اللَّهِ
              </p>
            </div>
          </motion.div>

          {/* Right door */}
          <motion.div
            className="w-1/2 h-full flex items-center justify-center rounded-r-2xl"
            style={{ background: "#1a3a2a", transformOrigin: "right center" }}
            animate={opened ? { rotateY: 110 } : { rotateY: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <div className="text-center px-3">
              <div className="text-xl mb-2" style={{ color: accent }}>🌙</div>
              <p className="font-lora text-xs text-muted">Tap to open</p>
            </div>
          </motion.div>

          {/* Handle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
            <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: accent }} />
            <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
          </div>
        </div>
      )}
    </div>
  );
}
