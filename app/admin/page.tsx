import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getAdminUser } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase-admin";
import type { Invitation } from "@/lib/supabase";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = { title: "Admin — نور Cards" };

/* Force dynamic so session is always read fresh */
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/");

  const admin = createAdminClient();
  const { data: invitations, error } = await admin
    .from("invitations")
    .select("id, slug, style, template_id, published, wedding_date, created_at, data")
    .order("created_at", { ascending: false });

  const rows = (invitations ?? []) as Invitation[];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: "#0f1f17" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                style={{ background: "#C9A84C20", color: "#C9A84C" }}
              >
                Admin
              </span>
            </div>
            <h1 className="font-amiri text-4xl" style={{ color: "#FAF6EF" }}>
              All Invitations
            </h1>
            <p className="text-sm mt-1" style={{ color: "#b8b4aa" }}>
              Logged in as {user.email}
            </p>
          </div>

          {/* Total count */}
          <div
            className="rounded-2xl px-6 py-4 text-center"
            style={{ background: "#1a3a2a", border: "1px solid #234d38" }}
          >
            <p className="font-lora text-4xl font-bold" style={{ color: "#C9A84C" }}>
              {rows.length}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#b8b4aa" }}>
              Total
            </p>
          </div>
        </div>

        {error && (
          <div
            className="rounded-xl p-4 mb-6 text-sm"
            style={{ background: "#3d1a1a", color: "#fca5a5", border: "1px solid #7f1d1d" }}
          >
            {error.message} — make sure SUPABASE_SERVICE_ROLE_KEY is set in Vercel environment variables.
          </div>
        )}

        {rows.length === 0 && !error ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "#1a3a2a", border: "1px solid #234d38" }}
          >
            <p className="font-amiri text-3xl mb-2" style={{ color: "#C9A84C" }}>🌙</p>
            <p style={{ color: "#b8b4aa" }}>No invitations yet.</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #234d38" }}>
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "#1a3a2a", color: "#b8b4aa", borderBottom: "1px solid #234d38" }}
            >
              <span>Invitation</span>
              <span className="hidden sm:block">Style</span>
              <span className="hidden sm:block">Date</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {/* Rows */}
            {rows.map((inv, i) => {
              const data = inv.data as { groomName?: string; brideName?: string };
              const names = data.groomName && data.brideName
                ? `${data.groomName} & ${data.brideName}`
                : inv.slug;

              return (
                <div
                  key={inv.id}
                  className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4"
                  style={{
                    background: i % 2 === 0 ? "#0f1f17" : "#111f17",
                    borderBottom: "1px solid #234d3840",
                  }}
                >
                  {/* Name + slug */}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: "#FAF6EF" }}>
                      {names}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#b8b4aa" }}>
                      /i/{inv.slug}
                    </p>
                  </div>

                  {/* Style */}
                  <span
                    className="hidden sm:inline text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ background: "#C9A84C15", color: "#C9A84C" }}
                  >
                    {inv.style}
                  </span>

                  {/* Wedding date */}
                  <span className="hidden sm:inline text-xs" style={{ color: "#b8b4aa" }}>
                    {inv.wedding_date
                      ? new Date(inv.wedding_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </span>

                  {/* Published status */}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={
                      inv.published
                        ? { background: "#14532d40", color: "#86efac" }
                        : { background: "#78350f40", color: "#fcd34d" }
                    }
                  >
                    {inv.published ? "Live" : "Draft"}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/i/${inv.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{ background: "#C9A84C20", color: "#C9A84C", border: "1px solid #C9A84C40" }}
                    >
                      <ExternalLink size={11} />
                      <span className="hidden sm:inline">View</span>
                    </Link>
                    <DeleteButton id={inv.id} slug={inv.slug} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
