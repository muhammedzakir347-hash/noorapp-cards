import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Invitation } from "@/lib/supabase";
import IslamicTemplate from "@/components/templates/IslamicTemplate";
import IslamicPremiumTemplate from "@/components/templates/IslamicPremiumTemplate";
import HinduTemplate from "@/components/templates/HinduTemplate";
import ChristianTemplate from "@/components/templates/ChristianTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";

/* ── Supabase server fetch ─────────────────────────────────── */
async function getInvitation(slug: string): Promise<Invitation | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return data as Invitation;
}

/* ── Dynamic OG metadata ───────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const inv = await getInvitation(slug);

  if (!inv) {
    return { title: "Invitation Not Found — نور Cards" };
  }

  const { groomName, brideName, venue, weddingDate } = inv.data as {
    groomName?: string; brideName?: string; venue?: string; weddingDate?: string;
  };

  const title = groomName && brideName
    ? `${groomName} & ${brideName}'s Wedding Invitation 🌙`
    : "Wedding Invitation";

  const description = [
    groomName && brideName ? `You're invited to the wedding of ${groomName} & ${brideName}` : null,
    venue ? `at ${venue}` : null,
    inv.wedding_date ? `on ${new Date(inv.wedding_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const url = `https://cards.noorapp.app/i/${slug}`;

  return {
    title,
    description: description || "A beautiful digital wedding invitation",
    openGraph: {
      title,
      description: description || "A beautiful digital wedding invitation",
      url,
      siteName: "نور Cards",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || "A beautiful digital wedding invitation",
    },
  };
}

/* ── Render the correct template ───────────────────────────── */
function renderTemplate(inv: Invitation) {
  const data = inv.data;

  const weddingDate = inv.wedding_date
    ? new Date(inv.wedding_date)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // fallback: 1 week from now

  const events = (data.events ?? []).map((ev) => ({
    ...ev,
    date: new Date(ev.date),
  }));

  const shareUrl = `https://cards.noorapp.app/i/${inv.slug}`;

  const islamicProps = {
    invitationId: inv.id,
    groomName: data.groomName ?? "Ahmad",
    brideName: data.brideName ?? "Mariam",
    weddingDate,
    venue: data.venue ?? "To be announced",
    venueAddress: data.venueAddress,
    venueMapUrl: data.venueMapUrl,
    photos: data.photos,
    showHijriDate: data.showHijriDate !== false,
    events,
    musicUrl: data.musicUrl,
    dressCode: data.dressCode,
    transport: data.transport,
    shareUrl,
  };

  if (inv.style === "islamic") {
    if (inv.template_id === "islamic-premium") {
      return (
        <IslamicPremiumTemplate
          {...islamicProps}
          endTime={data.endTime}
        />
      );
    }
    return <IslamicTemplate {...islamicProps} />;
  }

  const sharedProps = {
    invitationId: inv.id,
    groomName: data.groomName ?? "Ahmad",
    brideName: data.brideName ?? "Mariam",
    weddingDate,
    venue: data.venue ?? "To be announced",
    venueAddress: data.venueAddress,
    venueMapUrl: data.venueMapUrl,
    photos: data.photos,
    events,
    dressCode: data.dressCode,
    transport: data.transport,
    shareUrl,
  };

  if (inv.style === "hindu") {
    return <HinduTemplate {...sharedProps} />;
  }

  if (inv.style === "christian") {
    return <ChristianTemplate {...sharedProps} />;
  }

  return <ModernTemplate {...sharedProps} musicUrl={data.musicUrl} />;
}

/* ── Page ──────────────────────────────────────────────────── */
export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const inv = await getInvitation(slug);

  if (!inv) notFound();

  return renderTemplate(inv);
}
