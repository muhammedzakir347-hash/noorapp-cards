(function () {
  const selectors = [
    '[data-framer-name="Watermark"]',
    '[data-framer-name="Missing Piece Logo"]',
    '[data-framer-name="Copyright"]',
    '[data-framer-name="Buy button stack"]',
    'a[href*="rzp.io/rzp/mountain"]',
  ].join(",");

  function cleanup() {
    document.querySelectorAll(selectors).forEach((node) => node.remove());
  }

  cleanup();
  document.addEventListener("DOMContentLoaded", cleanup);

  const observer = new MutationObserver(cleanup);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.setTimeout(() => observer.disconnect(), 5000);
})();
