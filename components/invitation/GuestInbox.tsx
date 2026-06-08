"use client";

import { useState } from "react";
import { Send, Users, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Props {
  invitationId: string;
  accent?: string;
}

export default function GuestInbox({ invitationId, accent = "#C9A84C" }: Props) {
  const [name,      setName]      = useState("");
  const [message,   setMessage]   = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "maybe">("yes");
  const [count,     setCount]     = useState(1);
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [error,     setError]     = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: err } = await supabase.from("guest_messages").insert({
        invitation_id: invitationId,
        name: name.trim(),
        message: message.trim() || null,
        attending,
        guest_count: count,
      });
      if (err) throw err;
      setDone(true);
    } catch {
      setError("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border p-8 text-center" style={{ borderColor: `${accent}40`, background: `${accent}10` }}>
        <CheckCircle size={40} className="mx-auto mb-3" style={{ color: accent }} />
        <p className="font-lora text-lg text-ivory">JazakAllahu Khayran!</p>
        <p className="text-muted text-sm mt-1">Your RSVP has been received. We look forward to celebrating with you!</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: "#234d38", background: "#1a3a2a" }}>
      <div className="flex items-center gap-2 mb-5">
        <Users size={18} style={{ color: accent }} />
        <h3 className="font-lora text-lg text-ivory">RSVP & Leave a Message</h3>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name *"
          required
          className="w-full rounded-xl bg-bg border border-border px-4 py-3 text-sm text-ivory placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your wishes for the couple (optional)"
          rows={3}
          className="w-full rounded-xl bg-bg border border-border px-4 py-3 text-sm text-ivory placeholder:text-muted focus:outline-none focus:border-gold transition-colors resize-none"
        />

        {/* Attending */}
        <div>
          <p className="text-xs text-muted mb-2">Will you be attending?</p>
          <div className="flex gap-2">
            {(["yes", "no", "maybe"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAttending(v)}
                className="flex-1 rounded-xl py-2 text-sm font-medium border transition-colors capitalize"
                style={attending === v
                  ? { background: accent, borderColor: accent, color: "#0f1f17" }
                  : { background: "transparent", borderColor: "#234d38", color: "#b8b4aa" }
                }
              >
                {v === "yes" ? "✅ Yes" : v === "no" ? "❌ No" : "🤔 Maybe"}
              </button>
            ))}
          </div>
        </div>

        {/* Guest count */}
        {attending !== "no" && (
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted">Number of guests:</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="w-8 h-8 rounded-lg bg-border text-ivory hover:bg-gold/20 transition-colors flex items-center justify-center text-lg"
              >−</button>
              <span className="w-8 text-center text-ivory font-medium">{count}</span>
              <button
                type="button"
                onClick={() => setCount((c) => Math.min(10, c + 1))}
                className="w-8 h-8 rounded-lg bg-border text-ivory hover:bg-gold/20 transition-colors flex items-center justify-center text-lg"
              >+</button>
            </div>
          </div>
        )}

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-50"
          style={{ background: accent, color: "#0f1f17" }}
        >
          <Send size={14} />
          {loading ? "Sending…" : "Send RSVP"}
        </button>
      </form>
    </div>
  );
}
