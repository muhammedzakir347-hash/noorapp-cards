"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteInvitation } from "./actions";

export default function DeleteButton({ id, slug }: { id: string; slug: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete invitation "${slug}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await deleteInvitation(id);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
      style={{ background: "#3d1a1a", color: "#fca5a5", border: "1px solid #7f1d1d" }}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
      Delete
    </button>
  );
}
