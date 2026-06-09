export type TemplateStyle = "islamic" | "hindu" | "christian" | "modern";

export interface Template {
  id: string;
  name: string;
  nameAr?: string;
  style: TemplateStyle;
  colors: { bg: string; card: string; accent: string; text?: string };
  features: string[];
  description: string;
  emoji: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "islamic-premium",
    name: "Al-Noor Premium",
    nameAr: "النور الفاخر",
    style: "islamic",
    emoji: "🕌",
    colors: { bg: "#0a5c3a", card: "#0d7048", accent: "#C9A84C", text: "#FAF6EF" },
    features: ["bismillah", "mughal-arch", "cursive-names", "hijri-date", "countdown", "slideshow", "couple-silhouette", "rsvp", "music"],
    description: "Mughal arch frame, arabesque patterns, cursive names, and couple silhouette",
  },
  {
    id: "islamic-classic",
    name: "Al-Noor Classic",
    nameAr: "النور الكلاسيكي",
    style: "islamic",
    emoji: "🕌",
    colors: { bg: "#0f1f17", card: "#1a3a2a", accent: "#C9A84C", text: "#FAF6EF" },
    features: ["bismillah", "quran-verse", "hijri-date", "mosque-door", "countdown", "rsvp", "slideshow"],
    description: "Elegant emerald & gold Islamic design with Quranic verses and geometric patterns",
  },
  {
    id: "islamic-royal",
    name: "Al-Noor Royal",
    nameAr: "النور الملكي",
    style: "islamic",
    emoji: "🌙",
    colors: { bg: "#1a0a2e", card: "#2d1654", accent: "#C9A84C", text: "#FAF6EF" },
    features: ["bismillah", "quran-verse", "hijri-date", "mosque-door", "countdown", "rsvp", "slideshow"],
    description: "Majestic purple & gold Islamic invitation with royal arabesque motifs",
  },
  {
    id: "hindu-classic",
    name: "Shubh Vivah Classic",
    style: "hindu",
    emoji: "🪷",
    colors: { bg: "#1a0a00", card: "#3d1a00", accent: "#FF8C00", text: "#FFF8E7" },
    features: ["ganesh", "mandap", "mehendi", "countdown", "rsvp"],
    description: "Traditional Hindu wedding invitation with auspicious motifs and warm tones",
  },
  {
    id: "hindu-royal",
    name: "Shubh Vivah Royal",
    style: "hindu",
    emoji: "🌺",
    colors: { bg: "#1a0020", card: "#3d0040", accent: "#FF4500", text: "#FFF0F5" },
    features: ["ganesh", "mandap", "mehendi", "countdown", "rsvp", "slideshow"],
    description: "Royal maroon & gold Hindu wedding invitation with rich ornamentation",
  },
  {
    id: "christian-classic",
    name: "Holy Union Classic",
    style: "christian",
    emoji: "✝️",
    colors: { bg: "#0a1628", card: "#162848", accent: "#D4AF37", text: "#F0F4FF" },
    features: ["cross", "verse", "ceremony", "countdown", "rsvp"],
    description: "Timeless Christian wedding invitation with navy blue and gold",
  },
  {
    id: "christian-modern",
    name: "Holy Union Modern",
    style: "christian",
    emoji: "🕊️",
    colors: { bg: "#1a1a2e", card: "#252550", accent: "#6C63FF", text: "#F0F0FF" },
    features: ["cross", "verse", "ceremony", "countdown", "rsvp", "music"],
    description: "Modern Christian invitation with contemporary design and scripture",
  },
  {
    id: "modern-minimal",
    name: "Minimal Elegance",
    style: "modern",
    emoji: "✨",
    colors: { bg: "#0f0f0f", card: "#1a1a1a", accent: "#C9A84C", text: "#F5F5F5" },
    features: ["photo", "countdown", "rsvp", "music"],
    description: "Clean minimalist design with gold accents for the modern couple",
  },
  {
    id: "modern-dark",
    name: "Dark Luxury",
    style: "modern",
    emoji: "💎",
    colors: { bg: "#000000", card: "#111111", accent: "#FFD700", text: "#FFFFFF" },
    features: ["photo", "countdown", "rsvp", "music", "slideshow"],
    description: "Luxurious dark theme with gold for an unforgettable invitation",
  },
];

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByStyle(style: TemplateStyle): Template[] {
  return TEMPLATES.filter((t) => t.style === style);
}

export const STYLE_META: Record<TemplateStyle, { label: string; icon: string; description: string; count: number }> = {
  islamic:   { label: "Islamic",   icon: "🕌", description: "Arabic calligraphy & Quranic verses", count: 2 },
  hindu:     { label: "Hindu",     icon: "🪷", description: "Auspicious motifs & vibrant colors",   count: 2 },
  christian: { label: "Christian", icon: "✝️", description: "Scripture & timeless elegance",        count: 2 },
  modern:    { label: "Modern",    icon: "✨", description: "Minimalist & contemporary designs",    count: 2 },
};

export const QURAN_VERSES = [
  {
    id: "rum-21",
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    english: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you affection and mercy.",
    reference: "Quran 30:21",
  },
  {
    id: "nisa-1",
    arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا",
    english: "O mankind, fear your Lord, who created you from one soul and created from it its mate.",
    reference: "Quran 4:1",
  },
  {
    id: "hujurat-13",
    arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
    english: "O mankind, We have created you from male and female and made you peoples and tribes that you may know one another.",
    reference: "Quran 49:13",
  },
];
