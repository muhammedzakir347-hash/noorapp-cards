"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin";

export async function deleteInvitation(id: string) {
  await requireAdmin();

  const admin = createAdminClient();
  const { error } = await admin
    .from("invitations")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
