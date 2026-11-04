"use client";
import { Product, SITE, lineOf } from "@/lib/products";

async function loadImg(src = "/logo.png", type = "image/png") {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const g = c.getContext("2d")!; g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0);
  return { data: c.toDataURL(type, 0.88), ratio: img.naturalWidth / img.naturalHeight };
}

// Builds a branded A4 datasheet for one product in the browser (no server needed).
async function makePdf(p: Product) {
  const logo = await loadImg();
  const photo = p.images[0] ? await loadImg(p.images[0], "image/jpeg") : null;
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, M = 18, line = lineOf(p.line);
  let y = 0;
  const need = (h: number) => { if (y + h > 275) { doc.addPage(); y = 22; } };
  const head = (t: string) => {
    need(16); y += 6; doc.setFont("helvetica", "bold").setFontSize(13).setTextColor(20, 22, 26).text(t, M, y);
    doc.setDrawColor(201, 164, 92).setLineWidth(0.6).line(M, y + 2, M + 14, y + 2); y += 9;
  };
  const para = (t: string, bullet = "") => {
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(70, 72, 76);
    const rows = doc.splitTextToSize(bullet + t, W - 2 * M - (bullet ? 4 : 0)) as string[];
    need(rows.length * 5 + 2); doc.text(rows, M + (bullet ? 4 : 0), y); y += rows.length * 5 + 1.5;
  };
  doc.addImage(logo.data, "PNG", M, 8, 24 * logo.ratio, 24);
  doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(20, 22, 26).text("TECHNICAL DATASHEET", W - M, 18, { align: "right" });
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(92, 94, 98).text(SITE.name, W - M, 23, { align: "right" });
  doc.setDrawColor(201, 164, 92).setLineWidth(0.8).line(M, 36, W - M, 36);
  if (photo) doc.addImage(photo.data, "JPEG", W - M - 40, 40, 40, 40);
  y = 52;
  doc.setFontSize(10).setTextColor(92, 94, 98).text(line.name + "  |  " + line.tag, M, y); y += 12;
  doc.setFont("helvetica", "bold").setFontSize(28).setTextColor(20, 22, 26).text(p.model, M, y); y += 8;
  doc.setFont("helvetica", "normal").setFontSize(13).setTextColor(168, 24, 30).text(p.name, M, y); y += 8;
  para(p.summary);
  head("Properties");
  p.specs.forEach(([k, v]) => {
    need(8); doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(92, 94, 98).text(k, M, y);
    doc.setTextColor(20, 22, 26).text(v, W - M, y, { align: "right" });
    doc.setDrawColor(226, 224, 220).setLineWidth(0.2).line(M, y + 2.2, W - M, y + 2.2); y += 7;
  });
  if (p.notes.length) { y += 2; p.notes.forEach((n, i) => para(n, `${i + 1}. `)); }
  p.sections.forEach(([t, body]) => {
    head(t);
    body.forEach((x) => {
      if (t.startsWith("Curing performance")) para(x, x.endsWith(":") ? "" : "- ");
      else if (x.length < 40 && !/[.:]$/.test(x)) { need(10); y += 2; doc.setFont("helvetica", "bold").setFontSize(10).setTextColor(20, 22, 26).text(x, M, y); y += 5.5; }
      else para(x);
    });
  });
  if (p.storeUrl && p.storeUrl !== "#") { head("Order"); doc.setTextColor(168, 24, 30).textWithLink("Buy on our store", M, y, { url: p.storeUrl }); }
  const n = doc.getNumberOfPages();
  for (let i = 1; i <= n; i++) {
    doc.setPage(i); doc.setDrawColor(201, 164, 92).setLineWidth(0.4).line(M, 284, W - M, 284);
    doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(92, 94, 98)
      .text(`${SITE.name}  |  ${SITE.address}  |  ${SITE.phone}  |  ${SITE.email}`, M, 289).text(`Page ${i} of ${n}`, W - M, 289, { align: "right" });
  }
  doc.save(`${p.model}-datasheet.pdf`);
}

export default function DownloadButton({ p }: { p: Product }) {
  return (
    <button onClick={() => makePdf(p)} className="inline-flex w-full items-center justify-center gap-2 sm:w-auto rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition hover:border-gold hover:bg-ink/10">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
      Download datasheet
    </button>
  );
}