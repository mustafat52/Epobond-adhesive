import { PRODUCTS } from "@/lib/products";

// "From datasheet to order": each step shows a small piece of the real interface instead of an icon.
export default function Steps() {
  const p = PRODUCTS.find((x) => x.model === "CX-406")!;
  const panel = "flex h-44 items-center justify-center rounded-2xl border border-ink/10 bg-white shadow-md";
  return (
    <section data-reveal className="mx-auto max-w-6xl px-6 pt-24">
      <p className="mb-10 text-sm font-semibold uppercase tracking-[0.22em] text-golddk">From datasheet to order</p>
      <div data-stagger className="grid md:grid-cols-3">
        <div className="pb-10 md:border-r md:border-ink/15 md:pb-0 md:pr-10">
          <div className="h-44 rounded-2xl border border-ink/10 bg-white p-4 shadow-md">
            <p className="mb-1 text-[11px] font-semibold text-golddk">{p.model} · Properties</p>
            {p.specs.slice(0, 4).map(([k, v], i) => <div key={i} className="flex justify-between gap-3 border-b border-ink/10 py-1.5 text-xs"><span className="text-mist">{k}</span><span className="font-medium">{v}</span></div>)}
          </div>
          <h3 className="mt-7 font-display text-3xl font-semibold">Complete technical data</h3>
          <p className="mt-2 max-w-xs leading-relaxed text-mist">Properties, cure behaviour, applications and directions on every product page.</p>
        </div>
        <div className="py-10 md:border-r md:border-ink/15 md:px-10 md:py-0">
          <div className={panel}>
            <div className="float-soft flex items-center gap-3 rounded-xl border border-ink/10 bg-deep px-4 py-3 shadow-sm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7a5c16" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" /></svg>
              <div><p className="text-sm font-semibold">{p.model}-datasheet.pdf</p><p className="text-[11px] text-mist">Branded PDF datasheet</p></div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a5c16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" /></svg>
            </div>
          </div>
          <h3 className="mt-7 font-display text-3xl font-semibold">Save any product</h3>
          <p className="mt-2 max-w-xs leading-relaxed text-mist">Download a branded PDF datasheet for any product, ready to share or file.</p>
        </div>
        <div className="pt-10 md:pl-10 md:pt-0">
          <div className={panel}>
            <span className="float-soft rounded-full bg-gold px-7 py-3 text-sm font-semibold text-white shadow-md" style={{ animationDelay: "-2s" }}>Buy on our store &#8599;</span>
          </div>
          <h3 className="mt-7 font-display text-3xl font-semibold">Buy in one step</h3>
          <p className="mt-2 max-w-xs leading-relaxed text-mist">Go straight from the data to the order page on our store.</p>
        </div>
      </div>
    </section>
  );
}
