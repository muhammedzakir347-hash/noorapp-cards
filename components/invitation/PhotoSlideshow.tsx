"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  photos: string[];
  accent?: string;
}

export default function PhotoSlideshow({ photos, accent = "#C9A84C" }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!photos.length) return null;

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % photos.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={index}
          src={photos[index]}
          alt={`Photo ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          initial={{ x: direction * 100 + "%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -100 + "%", opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === index ? accent : "#ffffff60" }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
