"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={loading}
      className="rounded-full border border-slate-300 px-4 py-2 text-sm dark:border-slate-600"
    >
      {loading ? "…" : "Log out"}
    </button>
  );
}
