import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: ".noorapp.app",
        path: "/",
        sameSite: "lax",
        secure: true,
      },
    }
  );
}

export interface Invitation {
  id: string;
  user_id: string;
  template_id: string;
  slug: string;
  style: "islamic" | "hindu" | "christian" | "modern";
  data: InvitationData;
  published: boolean;
  wedding_date: string | null;
  created_at: string;
}

export interface InvitationData {
  groomName?: string;
  brideName?: string;
  venue?: string;
  venueAddress?: string;
  venueMapUrl?: string;
  photos?: string[];
  quranVerse?: string;
  showHijriDate?: boolean;
  events?: { name: string; date: string; venue: string }[];
  musicUrl?: string;
  dressCode?: string;
  transport?: string;
  language?: string;
}

export interface GuestMessage {
  id: string;
  invitation_id: string;
  name: string;
  message: string | null;
  attending: "yes" | "no" | "maybe";
  guest_count: number;
  created_at: string;
}
