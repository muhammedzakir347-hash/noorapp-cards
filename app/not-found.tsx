import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0f1f17" }}>
      <div className="text-center max-w-sm">
        <p className="font-amiri text-6xl mb-4" style={{ color: "#C9A84C" }}>٤٠٤</p>
        <h1 className="font-lora text-2xl font-semibold mb-2" style={{ color: "#FAF6EF" }}>
          Page Not Found
        </h1>
        <p className="text-sm mb-6" style={{ color: "#b8b4aa" }}>
          This invitation may have been removed or the link is incorrect.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
          style={{ background: "#C9A84C", color: "#0f1f17" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
