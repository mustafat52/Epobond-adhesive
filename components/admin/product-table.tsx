"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LINES, Product } from "@/lib/products";
import { card, danger, ghost, input, primary } from "./ui";

const FLASH: Record<string, string> = { created: "Product added. It is now live on the website.", updated: "Changes saved. They are now live on the website.", deleted: "Product deleted." };
export default function ProductTable({ products, status, message, flash }: { products: Product[]; status: "ok" | "unconfigured" | "error"; message?: string; flash?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(""), [seg, setSeg] = useState("all"), [del, setDel] = useState<Product | null>(null), [busy, setBusy] = useState(false), [err, setErr] = useState("");
  const rows = useMemo(() => products.filter((p) => (seg === "all" || p.segment === seg) && `${p.model} ${p.name}`.toLowerCase().includes(q.trim().toLowerCase())), [products, q, seg]);
  const count = (s: string) => (s === "all" ? products.length : products.filter((p) => p.segment === s).length);
  async function remove() {
    if (!del) return; setBusy(true); setErr("");
    const r = await fetch(`/api/admin/products/${del.slug}`, { method: "DELETE" });
    if (!r.ok) { setErr((await r.json().catch(() => ({}))).error || "Could not delete."); setBusy(false); return; }
    setDel(null); setBusy(false); router.push("/admin?msg=deleted"); router.refresh();
  }
  const tab = (on: boolean) => `rounded-full px-4 py-2 text-sm font-semibold transition ${on ? "bg-neutral-900 text-white" : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-50"}`;
  return (
    <div>
      {flash && FLASH[flash] && <p className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 ring-1 ring-green-200">{FLASH[flash]}</p>}
      {status === "unconfigured" && <p className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200"><b>The database is not connected yet.</b> You can look around, but adding, editing and deleting will start working as soon as the Supabase keys are added.</p>}
      {status === "error" && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200"><b>Could not read the database.</b> {message}</p>}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="font-display text-4xl font-bold uppercase">Products</h1><p className="text-sm text-neutral-500">{products.length} products on the website. Click any product to edit it.</p></div>
        <Link href="/admin/products/new" className={primary}>+ Add product</Link>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by model or name" className={`${input} max-w-xs`} />
        <div className="flex flex-wrap gap-2">{[["all", "All"], ["household", "Household"], ["industrial", "Industrial"]].map(([id, n]) => <button key={id} onClick={() => setSeg(id)} className={tab(seg === id)}>{n} ({count(id)})</button>)}</div>
      </div>
      <div className={`${card} mt-5 !p-0`}>
        {rows.length === 0 && <p className="px-5 py-10 text-center text-sm text-neutral-500">No products match your search.</p>}
        {rows.map((p) => {
          const line = LINES.find((l) => l.id === p.line);
          return (
            <div key={p.slug} className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-neutral-200 px-4 py-3 first:border-t-0 sm:flex-nowrap sm:px-5">
              <Link href={`/admin/products/${p.slug}`} className="flex min-w-0 flex-1 items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100">{p.images[0] ? <img src={p.images[0].replace("/products/", "/products/sm/")} alt="" className="h-full w-full object-contain" /> : <span className="text-[10px] text-neutral-400">No photo</span>}</span>
                <span className="min-w-0"><span className="block truncate font-semibold">{p.model}</span><span className="block truncate text-sm text-neutral-500">{p.name}</span></span>
              </Link>
              <span className="hidden w-52 items-center gap-2 text-sm text-neutral-600 lg:flex"><span className="h-2 w-2 shrink-0 rounded-full" style={{ background: line?.color }} /><span className="truncate">{line?.name}</span></span>
              <span className="flex w-24 flex-col items-start gap-1 text-xs">
                <span className={`rounded-full px-2.5 py-1 font-semibold ${p.draft ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{p.draft ? "Draft" : "Complete"}</span>
                <span className="text-neutral-400">{p.storeUrl && p.storeUrl !== "#" ? "Store link set" : "No store link"}</span>
              </span>
              <div className="flex gap-2">
                <Link href={`/admin/products/${p.slug}`} className={ghost}>Edit</Link>
                <a href={`/products/${p.slug}`} target="_blank" rel="noopener noreferrer" className={`${ghost} hidden sm:inline-flex`}>View</a>
                <button onClick={() => { setErr(""); setDel(p); }} className={danger}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {del && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => !busy && setDel(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl font-bold uppercase">Delete {del.model}?</h2>
            <p className="mt-2 text-sm text-neutral-600">This removes the product and its page from the website. It cannot be undone.</p>
            {err && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
            <div className="mt-6 flex justify-end gap-3"><button disabled={busy} onClick={() => setDel(null)} className={ghost}>Cancel</button><button disabled={busy} onClick={remove} className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">{busy ? "Deleting..." : "Yes, delete it"}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
