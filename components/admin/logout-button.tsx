"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  return <button onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }} className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Log out</button>;
}
