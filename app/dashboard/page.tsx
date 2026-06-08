import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard — نور Cards",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: "#0f1f17" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-amiri text-4xl" style={{ color: "#FAF6EF" }}>My Invitations</h1>
            <p className="font-lora text-sm mt-1" style={{ color: "#b8b4aa" }}>Manage your wedding invitations</p>
          </div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
            style={{ background: "#C9A84C", color: "#0f1f17" }}
          >
            <PlusCircle size={16} />
            New Invitation
          </Link>
        </div>

        {/* Empty state */}
        <div
          className="rounded-2xl p-16 text-center"
          style={{ background: "#1a3a2a", border: "1px solid #234d38" }}
        >
          <p className="font-amiri text-5xl mb-4" style={{ color: "#C9A84C" }}>🌙</p>
          <p className="font-lora text-lg font-semibold mb-2" style={{ color: "#FAF6EF" }}>
            No invitations yet
          </p>
          <p className="text-sm mb-6" style={{ color: "#b8b4aa" }}>
            Create your first digital wedding invitation in minutes.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold"
            style={{ background: "#C9A84C", color: "#0f1f17" }}
          >
            Browse Templates →
          </Link>
        </div>
      </div>
    </div>
  );
}
