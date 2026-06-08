"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Basic",
    emoji: "🌿",
    priceINR: 0,
    priceUSD: 0,
    period: "one-time",
    description: "For simple, heartfelt invitations",
    features: [
      "1 invitation page",
      "3 templates",
      "RSVP & guest messages",
      "Countdown timer",
      "Share via WhatsApp",
      "cards.noorapp.app/i/slug URL",
    ],
    cta: "Get Started Free",
    ctaHref: "/templates",
    highlight: false,
  },
  {
    name: "Pro",
    emoji: "🌙",
    priceINR: 999,
    priceUSD: 12,
    period: "one-time",
    description: "For the perfect unforgettable wedding",
    features: [
      "Everything in Basic",
      "All 8 premium templates",
      "Photo slideshow (up to 20 photos)",
      "Background music player",
      "Hijri date display",
      "Custom domain support",
      "Event schedule & dress code",
      "Priority support",
    ],
    cta: "Start with Pro",
    ctaHref: "/checkout?plan=pro",
    highlight: true,
  },
];

export default function PricingSection() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#0f1f17" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "#C9A84C70" }}>Simple pricing</p>
          <h2 className="font-amiri text-4xl sm:text-5xl mb-3" style={{ color: "#FAF6EF" }}>
            Start Free, Upgrade Anytime
          </h2>
          <p className="font-lora text-base mb-6" style={{ color: "#b8b4aa" }}>
            Pay once, keep your invitation forever.
          </p>

          {/* Currency toggle */}
          <div
            className="inline-flex rounded-xl p-1 gap-1"
            style={{ background: "#1a3a2a", border: "1px solid #234d38" }}
          >
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className="rounded-lg px-5 py-2 text-sm font-semibold transition-all"
                style={
                  currency === c
                    ? { background: "#C9A84C", color: "#0f1f17" }
                    : { color: "#b8b4aa" }
                }
              >
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PLANS.map((plan) => {
            const price = currency === "INR" ? plan.priceINR : plan.priceUSD;
            const symbol = currency === "INR" ? "₹" : "$";

            return (
              <div
                key={plan.name}
                className="rounded-2xl p-6 flex flex-col relative"
                style={{
                  background: plan.highlight ? "#1a3a2a" : "#111f18",
                  border: plan.highlight ? "2px solid #C9A84C" : "1px solid #234d38",
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ background: "#C9A84C", color: "#0f1f17" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{plan.emoji}</span>
                    <h3 className="font-lora text-xl font-semibold" style={{ color: "#FAF6EF" }}>
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-sm" style={{ color: "#b8b4aa" }}>{plan.description}</p>
                </div>

                <div className="mb-6">
                  {price === 0 ? (
                    <p className="font-lora text-4xl font-bold" style={{ color: "#FAF6EF" }}>
                      Free
                    </p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="font-lora text-4xl font-bold" style={{ color: "#C9A84C" }}>
                        {symbol}{price}
                      </span>
                      <span className="text-sm pb-1" style={{ color: "#b8b4aa" }}>/ {plan.period}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />
                      <span style={{ color: "#FAF6EF" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className="block text-center rounded-xl py-3 text-sm font-semibold transition-colors"
                  style={
                    plan.highlight
                      ? { background: "#C9A84C", color: "#0f1f17" }
                      : { background: "#1a3a2a", color: "#FAF6EF", border: "1px solid #234d38" }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#b8b4aa60" }}>
          Razorpay (India) · Stripe (International) · Secure & encrypted
        </p>
      </div>
    </section>
  );
}
