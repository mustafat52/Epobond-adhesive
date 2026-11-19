# Arabic version, phase 1: how to apply and what to review

English stays at `/` and Arabic lives at `/ar` (for example `/ar/products/cx-401`). A language button sits in the header on every page.

## 1. Apply the files

Copy everything in this folder over your project, keeping the same paths.

Then **delete these old files and folders** from your project. Their content now lives under `app/[lang]/`:

- `app/layout.tsx`
- `app/page.tsx`
- `app/template.tsx`
- `app/about/` (the whole folder)
- `app/contact/` (the whole folder)
- `app/products/` (the whole folder)

You can also delete these unused components: `components/chrome-gate.tsx`, `components/hero-bottle.tsx`, `components/need-finder.tsx`, `components/product-wall.tsx`, `components/segments.tsx`, `components/steps.tsx`.

Then stop the dev server, delete the `.next` folder, and run `npm run dev` again. The database, seed script and admin panel need no changes.

## 2. What is in Arabic

- Header, footer, language switcher and mobile menu.
- Home page, About, Contact, the products listing (search, sort, categories) and the "Tell us the job" finder.
- All 49 product pages: names, descriptions, property tables, notes, section titles and every paragraph.
- Right-to-left layout, arrows that point the other way, and Arabic fonts (Cairo for headings, Tajawal for text).

## 3. What stays in English on purpose

- The admin panel.
- The downloadable datasheet PDF. The button says so in Arabic ("بالإنجليزية"). The PDF library has no Arabic font.
- Brand and instrument names (EPOBOND-LOCK, Brookfield, ISO and so on) and model numbers.

## 4. Please have these reviewed before launch

1. **A native Arabic speaker should read everything.** The Arabic is a careful first draft written from the English catalog text. The marketing lines need the most attention: the hero headline, "Built on strength. Driven by innovation.", the pillars and the vision line.
2. **Technical terms.** A technical person at EPOBOND should confirm the wording for terms such as لاهوائي (anaerobic), مثبّت قلاووظ (threadlocker), مانع تسريب (sealant), and زمن التثبيت (fixture time).
3. **Use the catalog's own Arabic wherever it exists.** The original catalog has official Arabic descriptions. If the client sends them, they should replace my wording.

## 5. How Arabic product text is stored

Arabic product text lives in `data/products-ar.json`. Each Arabic block remembers the English text it was translated from. If someone edits the English text of a product in the admin panel, that block shows the English again until the Arabic is updated, so a stale translation never appears. A product added in the admin panel shows in English until it is translated.

An admin screen for editing the Arabic text is a sensible next step.

## 6. Known gaps for later

- Page titles are translated, but per-page "alternate language" tags for search engines are only set for the home page.
- The "Datasheet sections" strip and related pieces are translated, but I tested only in Chromium, not Safari or Firefox.
- Arabic fonts could not load in my test environment, so the test used system fallback fonts. Please check how Cairo and Tajawal look on the live build.
