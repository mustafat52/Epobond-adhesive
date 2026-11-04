"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { input, label, primary } from "./ui";
export default function LoginForm() {
  const router = useRouter();
  const [pw, setPw] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (r.ok) { router.push("/admin"); router.refresh(); return; }
    setErr((await r.json().catch(() => ({}))).error || "Could not log in."); setBusy(false);
  }
  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:mt-16 sm:p-8">
      <img src="/logo.png" alt="Epobond" className="mx-auto h-24 w-auto" />
      <h1 className="mt-4 text-center font-display text-3xl font-bold uppercase">Admin login</h1>
      <p className="mt-1 text-center text-sm text-neutral-500">Manage your products and website information.</p>
      <label className={`${label} mt-6`} htmlFor="pw">Password</label>
      <input id="pw" type="password" autoFocus autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} className={input} />
      {err && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
      <button disabled={busy || !pw} className={`${primary} mt-5 w-full`}>{busy ? "Logging in..." : "Log in"}</button>
    </form>
  );
}
