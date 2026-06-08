// Simple Hijri date conversion (approximate — within ±1 day)
function toHijri(date: Date): { year: number; month: number; day: number } {
  const JD = Math.floor(date.getTime() / 86400000) + 2440587.5;
  const l = Math.floor(JD) - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
             Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
              Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day   = l3 - Math.floor((709 * month) / 24);
  const year  = 30 * n + j - 30;
  return { year, month, day };
}

const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah",
];

interface Props {
  date: Date;
  className?: string;
  accent?: string;
}

export default function HijriDate({ date, className = "", accent = "#C9A84C" }: Props) {
  const h = toHijri(date);
  const label = `${h.day} ${HIJRI_MONTHS[h.month - 1]} ${h.year} AH`;

  return (
    <span className={className} style={{ color: accent }}>
      {label}
    </span>
  );
}
