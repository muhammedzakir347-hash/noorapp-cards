"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

const PLANS = {
  pro: { name: "Pro", priceINR: 999, priceUSD: 12, features: ["All 8 templates", "Photo slideshow", "Music player", "Custom slug", "Priority support"] },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = (searchParams.get("plan") ?? "pro") as keyof typeof PLANS;
  const plan = PLANS[planId] ?? PLANS.pro;

  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [loading, setLoading] = useState(false);

  const price = currency === "INR" ? plan.priceINR : plan.priceUSD;
  const symbol = currency === "INR" ? "₹" : "$";

  const handlePay = () => {
    setLoading(true);
    // TODO: integrate Razorpay (INR) or Stripe (USD)
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 flex items-center justify-center" style={{ background: "#0f1f17" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-amiri text-4xl mb-2" style={{ color: "#C9A84C" }}>نور Cards</p>
          <h1 className="font-lora text-xl" style={{ color: "#FAF6EF" }}>Complete your purchase</h1>
        </div>

        <div className="rounded-2xl p-6 mb-5" style={{ background: "#1a3a2a", border: "2px solid #C9A84C" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-lora font-semibold" style={{ color: "#FAF6EF" }}>{plan.name} Plan</p>
              <p className="text-xs" style={{ color: "#b8b4aa" }}>One-time payment, lifetime access</p>
            </div>
            <p className="font-lora text-3xl font-bold" style={{ color: "#C9A84C" }}>
              {symbol}{price}
            </p>
          </div>

          <ul className="space-y-2 mb-6">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#FAF6EF" }}>
                <Check size={14} style={{ color: "#C9A84C" }} />
                {f}
              </li>
            ))}
          </ul>

          {/* Currency toggle */}
          <div
            className="flex rounded-xl p-1 gap-1 mb-5"
            style={{ background: "#0f1f17", border: "1px solid #234d38" }}
          >
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className="flex-1 rounded-lg py-2 text-sm font-semibold transition-all"
                style={currency === c ? { background: "#C9A84C", color: "#0f1f17" } : { color: "#b8b4aa" }}
              >
                {c === "INR" ? "₹ Pay in INR" : "$ Pay in USD"}
              </button>
            ))}
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:opacity-60"
            style={{ background: "#C9A84C", color: "#0f1f17" }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? "Processing…" : `Pay ${symbol}${price} via ${currency === "INR" ? "Razorpay" : "Stripe"}`}
          </button>
        </div>

        <p className="text-center text-xs" style={{ color: "#b8b4aa60" }}>
          Secure payment · 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#0f1f17" }} />}>
      <CheckoutContent />
    </Suspense>
  );
}
