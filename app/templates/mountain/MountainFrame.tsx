"use client";

import { useCallback, useRef } from "react";

const CLEANUP_CSS = `
  [data-framer-name="Watermark"],
  [data-framer-name="Missing Piece Logo"],
  [data-framer-name="Copyright"],
  [data-framer-name="Buy button stack"],
  a[href*="rzp.io/rzp/mountain"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  img[src*="3vpFOuN5tHb2JuYqzoPGPaRcA"],
  img[srcset*="3vpFOuN5tHb2JuYqzoPGPaRcA"] {
    display: none !important;
    visibility: hidden !important;
  }

  img {
    transform-origin: 50% 50%;
  }
`;

function removeTemplateChrome(doc: Document) {
  if (!doc.getElementById("mountain-template-cleanup-style")) {
    const style = doc.createElement("style");
    style.id = "mountain-template-cleanup-style";
    style.textContent = CLEANUP_CSS;
    doc.head.appendChild(style);
  }

  doc
    .querySelectorAll(
      [
        '[data-framer-name="Watermark"]',
        '[data-framer-name="Missing Piece Logo"]',
        '[data-framer-name="Copyright"]',
        '[data-framer-name="Buy button stack"]',
        'a[href*="rzp.io/rzp/mountain"]',
      ].join(","),
    )
    .forEach((node) => node.remove());
}

export function MountainFrame() {
  const cleanupTimer = useRef<number | null>(null);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLIFrameElement>) => {
    const frame = event.currentTarget;
    const doc = frame.contentDocument;
    if (!doc) return;

    removeTemplateChrome(doc);

    if (cleanupTimer.current !== null) {
      window.clearInterval(cleanupTimer.current);
    }

    cleanupTimer.current = window.setInterval(() => {
      removeTemplateChrome(doc);
    }, 300);

    window.setTimeout(() => {
      if (cleanupTimer.current !== null) {
        window.clearInterval(cleanupTimer.current);
        cleanupTimer.current = null;
      }
    }, 5000);
  }, []);

  return (
    <iframe
      title="Mountain Indian Wedding Invitation Template"
      src="/templates/mountain/index.html"
      className="h-screen w-full border-0"
      onLoad={handleLoad}
    />
  );
}
