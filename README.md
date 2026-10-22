# Adhesive catalog site (Next.js 14 + Tailwind)
npm install && npm run dev
- Edit products, lines, company details and store links in lib/products.ts (storeUrl "#" shows an Enquire button).
- Placeholder bottle art: components/bottle.tsx. Swap in real product PNGs when supplied.
- Product photos live in public/products and are mapped in lib/images.ts (key = model). Products without a photo fall back to a drawn bottle.
- Retail products (epoxy, putty, super glue, MultiBond, CollaFix, AB glue) use general placeholder text, flagged "draft": true in lib/data.json. Replace with client datasheets.
- Not built yet: Arabic/RTL, compare tool, 3D viewer.
