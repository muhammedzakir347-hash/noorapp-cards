import { createServerSupabaseClient } from "@/lib/supabase-server";

export const ADMIN_EMAIL = "muhammedzakir347@gmail.com";

export async function getAdminUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.email === ADMIN_EMAIL ? user : null;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
