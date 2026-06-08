"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Plus, Trash2, Loader2, Upload } from "lucide-react";
import { getTemplateById } from "@/lib/templates";
import { createClient } from "@/lib/supabase";
import type { InvitationData } from "@/lib/supabase";

/* ── Form state ────────────────────────────────────────────── */
interface FormData {
  /* Step 1 */
  groomName: string;
  brideName: string;
  groomFamily: string;
  brideFamily: string;
  /* Step 2 */
  weddingDate: string;
  weddingTime: string;
  venue: string;
  venueAddress: string;
  venueMapUrl: string;
  /* Step 3 */
  photos: string[];
  /* Step 4 */
  showHijriDate: boolean;
  dressCode: string;
  transport: string;
  musicUrl: string;
  events: { name: string; date: string; venue: string }[];
  /* Step 5 */
  language: string;
  slug: string;
}

const EMPTY_EVENT = { name: "", date: "", venue: "" };

const LANGUAGES = [
  { code: "en", label: "English", emoji: "🇬🇧" },
  { code: "ar", label: "Arabic (العربية)", emoji: "🇸🇦" },
  { code: "ur", label: "Urdu (اردو)", emoji: "🇵🇰" },
  { code: "hi", label: "Hindi", emoji: "🇮🇳" },
  { code: "ml", label: "Malayalam", emoji: "🇮🇳" },
];

const STEPS = [
  "Names",
  "Date & Venue",
  "Photos",
  "Features",
  "Publish",
  "Preview",
];

/* ── Input component ───────────────────────────────────────── */
function Field({
  label, value, onChange, placeholder = "", type = "text", required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "#b8b4aa" }}>
        {label}{required && " *"}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none"
        style={{
          background: "#0f1f17", borderColor: "#234d38",
          color: "#FAF6EF",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#C9A84C"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#234d38"; }}
      />
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function CreatePage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);
  const template = getTemplateById(templateId);
  const router = useRouter();
  const accent = template?.colors.accent ?? "#C9A84C";

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    groomName: "", brideName: "", groomFamily: "", brideFamily: "",
    weddingDate: "", weddingTime: "19:00", venue: "", venueAddress: "", venueMapUrl: "",
    photos: [],
    showHijriDate: true, dressCode: "", transport: "", musicUrl: "", events: [],
    language: "en",
    slug: "",
  });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  /* Step validation */
  const canNext = () => {
    if (step === 0) return form.groomName.trim() && form.brideName.trim();
    if (step === 1) return form.weddingDate && form.venue.trim();
    if (step === 4) return form.slug.trim().length >= 3;
    return true;
  };

  /* Auto-generate slug from names */
  const generateSlug = () => {
    const raw = `${form.groomName}-${form.brideName}-${new Date(form.weddingDate).getFullYear()}`;
    const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    set("slug", slug);
  };

  /* Publish */
  const publish = async () => {
    setSubmitting(true);
    setError("");
    try {
      const supabase = createClient();

      const weddingDate = form.weddingDate && form.weddingTime
        ? new Date(`${form.weddingDate}T${form.weddingTime}`).toISOString()
        : form.weddingDate ? new Date(form.weddingDate).toISOString() : null;

      const data: InvitationData = {
        groomName: form.groomName,
        brideName: form.brideName,
        venue: form.venue,
        venueAddress: form.venueAddress || undefined,
        venueMapUrl: form.venueMapUrl || undefined,
        photos: form.photos.length ? form.photos : undefined,
        showHijriDate: form.showHijriDate,
        dressCode: form.dressCode || undefined,
        transport: form.transport || undefined,
        musicUrl: form.musicUrl || undefined,
        events: form.events.filter((e) => e.name && e.date),
        language: form.language,
      };

      const { error: err } = await supabase.from("invitations").insert({
        template_id: templateId,
        style: template?.style ?? "modern",
        slug: form.slug,
        data,
        wedding_date: weddingDate,
        published: true,
      });

      if (err) throw err;
      router.push(`/i/${form.slug}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1f17" }}>
        <p style={{ color: "#b8b4aa" }}>Template not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#0f1f17" }}>
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-2xl mb-1">{template.emoji}</p>
          <h1 className="font-amiri text-3xl mb-1" style={{ color: "#FAF6EF" }}>
            {template.name}
          </h1>
          <p className="text-sm" style={{ color: "#b8b4aa" }}>{template.description}</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full h-1.5 rounded-full transition-all duration-300"
                style={{ background: i <= step ? accent : "#234d38" }}
              />
              <span className="text-xs hidden sm:block" style={{ color: i === step ? accent : "#b8b4aa60" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6 sm:p-8 space-y-5"
            style={{ background: "#1a3a2a", border: "1px solid #234d38" }}
          >
            <h2 className="font-lora text-xl font-semibold" style={{ color: "#FAF6EF" }}>
              Step {step + 1}: {STEPS[step]}
            </h2>

            {/* ── STEP 0: Names ───────────────────────────────── */}
            {step === 0 && (
              <>
                <Field label="Groom's Name" value={form.groomName} onChange={(v) => set("groomName", v)} placeholder="Ahmad" required />
                <Field label="Bride's Name"  value={form.brideName}  onChange={(v) => set("brideName", v)}  placeholder="Mariam" required />
                <Field label="Groom's Family (optional)" value={form.groomFamily} onChange={(v) => set("groomFamily", v)} placeholder="Son of Ibrahim Al-Rashid" />
                <Field label="Bride's Family (optional)" value={form.brideFamily} onChange={(v) => set("brideFamily", v)} placeholder="Daughter of Yusuf Al-Amin" />
              </>
            )}

            {/* ── STEP 1: Date & Venue ────────────────────────── */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Wedding Date" value={form.weddingDate} onChange={(v) => set("weddingDate", v)} type="date" required />
                  <Field label="Time"         value={form.weddingTime} onChange={(v) => set("weddingTime", v)} type="time" />
                </div>
                <Field label="Venue Name"    value={form.venue}        onChange={(v) => set("venue", v)}        placeholder="Al-Baraka Banquet Hall" required />
                <Field label="Venue Address" value={form.venueAddress} onChange={(v) => set("venueAddress", v)} placeholder="123 Main St, Dubai, UAE" />
                <Field label="Google Maps URL (optional)" value={form.venueMapUrl} onChange={(v) => set("venueMapUrl", v)} placeholder="https://maps.google.com/..." />
              </>
            )}

            {/* ── STEP 2: Photos ──────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm" style={{ color: "#b8b4aa" }}>
                  Add photo URLs for your slideshow (hosted on Cloudinary, Imgur, etc.)
                </p>
                {form.photos.map((url, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={url}
                      onChange={(e) => {
                        const updated = [...form.photos];
                        updated[i] = e.target.value;
                        set("photos", updated);
                      }}
                      placeholder={`Photo URL ${i + 1}`}
                      className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none"
                      style={{ background: "#0f1f17", borderColor: "#234d38", color: "#FAF6EF" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = accent; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#234d38"; }}
                    />
                    <button
                      onClick={() => set("photos", form.photos.filter((_, j) => j !== i))}
                      className="p-3 rounded-xl transition-colors"
                      style={{ background: "#0f1f1780", color: "#b8b4aa" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {form.photos.length < 10 && (
                  <button
                    onClick={() => set("photos", [...form.photos, ""])}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border w-full justify-center transition-colors"
                    style={{ borderColor: `${accent}50`, color: accent }}
                  >
                    <Plus size={15} />
                    Add Photo URL
                  </button>
                )}
                <div
                  className="rounded-xl p-4 flex items-start gap-3 text-xs"
                  style={{ background: "#0f1f17", border: "1px solid #234d38", color: "#b8b4aa" }}
                >
                  <Upload size={14} className="shrink-0 mt-0.5" style={{ color: accent }} />
                  <span>Upload your photos to a free service like Imgur or Cloudinary, then paste the direct image URLs here. Supports JPG, PNG, WebP.</span>
                </div>
              </div>
            )}

            {/* ── STEP 3: Features ────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-5">
                {/* Hijri toggle */}
                <div className="flex items-center justify-between rounded-xl p-3" style={{ background: "#0f1f17", border: "1px solid #234d38" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#FAF6EF" }}>Show Hijri Date</p>
                    <p className="text-xs mt-0.5" style={{ color: "#b8b4aa" }}>Display Islamic calendar date</p>
                  </div>
                  <button
                    onClick={() => set("showHijriDate", !form.showHijriDate)}
                    className="w-12 h-6 rounded-full transition-colors relative"
                    style={{ background: form.showHijriDate ? accent : "#234d38" }}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                      style={{ transform: form.showHijriDate ? "translateX(24px)" : "translateX(0)" }}
                    />
                  </button>
                </div>

                <Field label="Dress Code (optional)" value={form.dressCode} onChange={(v) => set("dressCode", v)} placeholder="Formal / Traditional" />
                <Field label="Transport Info (optional)" value={form.transport} onChange={(v) => set("transport", v)} placeholder="Free bus from Grand Mosque" />
                <Field label="Background Music URL (optional)" value={form.musicUrl} onChange={(v) => set("musicUrl", v)} placeholder="https://example.com/nasheed.mp3" />

                {/* Events */}
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: "#b8b4aa" }}>Pre-wedding Events (optional)</p>
                  {form.events.map((ev, i) => (
                    <div key={i} className="rounded-xl p-3 mb-3 space-y-2" style={{ background: "#0f1f17", border: "1px solid #234d38" }}>
                      <input
                        value={ev.name}
                        onChange={(e) => {
                          const updated = [...form.events];
                          updated[i] = { ...updated[i], name: e.target.value };
                          set("events", updated);
                        }}
                        placeholder="Event name (e.g. Mehendi)"
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                        style={{ background: "#1a3a2a", borderColor: "#234d38", color: "#FAF6EF" }}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => {
                            const updated = [...form.events];
                            updated[i] = { ...updated[i], date: e.target.value };
                            set("events", updated);
                          }}
                          className="rounded-lg border px-3 py-2 text-sm outline-none"
                          style={{ background: "#1a3a2a", borderColor: "#234d38", color: "#FAF6EF" }}
                        />
                        <input
                          value={ev.venue}
                          onChange={(e) => {
                            const updated = [...form.events];
                            updated[i] = { ...updated[i], venue: e.target.value };
                            set("events", updated);
                          }}
                          placeholder="Venue"
                          className="rounded-lg border px-3 py-2 text-sm outline-none"
                          style={{ background: "#1a3a2a", borderColor: "#234d38", color: "#FAF6EF" }}
                        />
                      </div>
                      <button
                        onClick={() => set("events", form.events.filter((_, j) => j !== i))}
                        className="text-xs flex items-center gap-1"
                        style={{ color: "#b8b4aa" }}
                      >
                        <Trash2 size={11} /> Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => set("events", [...form.events, { ...EMPTY_EVENT }])}
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: accent }}
                  >
                    <Plus size={14} /> Add Event
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Language & Slug ─────────────────────── */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: "#b8b4aa" }}>Translation Language</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => set("language", lang.code)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm border transition-colors"
                        style={
                          form.language === lang.code
                            ? { background: accent, borderColor: accent, color: "#0f1f17" }
                            : { background: "transparent", borderColor: "#234d38", color: "#b8b4aa" }
                        }
                      >
                        <span>{lang.emoji}</span>
                        <span className="text-xs">{lang.label.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#b8b4aa" }}>
                    Invitation URL slug *
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center rounded-xl border px-3 text-sm flex-1" style={{ background: "#0f1f17", borderColor: "#234d38" }}>
                      <span className="shrink-0 text-xs" style={{ color: "#b8b4aa" }}>cards.noorapp.app/i/</span>
                      <input
                        value={form.slug}
                        onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                        placeholder="ahmad-mariam-2026"
                        className="flex-1 py-3 bg-transparent outline-none text-sm"
                        style={{ color: "#FAF6EF" }}
                        minLength={3}
                      />
                    </div>
                    <button
                      onClick={generateSlug}
                      className="rounded-xl px-3 py-2 text-xs font-medium border"
                      style={{ borderColor: `${accent}50`, color: accent }}
                      title="Auto-generate from names"
                    >
                      Auto
                    </button>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: "#b8b4aa60" }}>
                    Letters, numbers, hyphens only. Min 3 characters.
                  </p>
                </div>
              </div>
            )}

            {/* ── STEP 5: Preview & Publish ───────────────────── */}
            {step === 5 && (
              <div className="space-y-5">
                {/* Summary */}
                <div className="rounded-xl p-4 space-y-2" style={{ background: "#0f1f17", border: "1px solid #234d38" }}>
                  {[
                    { label: "Groom", value: form.groomName },
                    { label: "Bride", value: form.brideName },
                    { label: "Date", value: form.weddingDate ? new Date(`${form.weddingDate}T${form.weddingTime}`).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "—" },
                    { label: "Venue", value: form.venue },
                    { label: "Photos", value: `${form.photos.filter(Boolean).length} added` },
                    { label: "Template", value: `${template.emoji} ${template.name}` },
                    { label: "URL", value: `cards.noorapp.app/i/${form.slug}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span style={{ color: "#b8b4aa" }}>{label}</span>
                      <span className="font-medium text-right max-w-[60%]" style={{ color: "#FAF6EF" }}>{value || "—"}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="rounded-xl p-3 text-sm" style={{ background: "#3d1a1a", color: "#fca5a5", border: "1px solid #7f1d1d" }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={publish}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-colors disabled:opacity-60"
                  style={{ background: accent, color: "#0f1f17" }}
                >
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Publishing…</>
                  ) : (
                    <><Check size={16} /> Publish Invitation</>
                  )}
                </button>

                <p className="text-center text-xs" style={{ color: "#b8b4aa60" }}>
                  Your invitation will be live at cards.noorapp.app/i/{form.slug}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={back}
              className="flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-colors"
              style={{ borderColor: "#234d38", color: "#b8b4aa" }}
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < STEPS.length - 1 && (
            <button
              onClick={next}
              disabled={!canNext()}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ background: accent, color: "#0f1f17" }}
            >
              {step === STEPS.length - 2 ? "Review" : "Next"}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
