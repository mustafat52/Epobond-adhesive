// Two languages: English at "/" and Arabic at "/ar". Arabic is right-to-left.
export const LOCALES = ["en", "ar"] as const;
export type Lang = (typeof LOCALES)[number];
export const isLang = (x: string): x is Lang => (LOCALES as readonly string[]).includes(x);
export const dirOf = (l: Lang) => (l === "ar" ? "rtl" : "ltr");
/** Prefixes a site path with the language: href("ar", "/products") -> "/ar/products". English has no prefix. */
export const href = (l: Lang, path: string) => (l === "en" ? path : path === "/" ? "/ar" : `/ar${path}`);
/** The same page in the other language, keeping the query string. */
export const switchPath = (l: Lang, pathname: string, search: string) => {
  const bare = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  return (l === "ar" ? bare : href("ar", bare)) + search;
};
/** "5 products" / "منتج واحد", "منتجان", "5 منتجات", "12 منتجًا". */
export const countProducts = (l: Lang, n: number) => {
  if (l === "en") return `${n} ${n === 1 ? "product" : "products"}`;
  if (n === 1) return "منتج واحد"; if (n === 2) return "منتجان";
  return n >= 3 && n <= 10 ? `${n} منتجات` : `${n} منتجًا`;
};
/** Search results line: "18 products found" / "تم العثور على 18 منتجًا". */
export const foundLine = (l: Lang, n: number) => {
  if (l === "en") return `${countProducts("en", n)} found`;
  if (n === 0) return "لا توجد منتجات"; if (n === 1) return "تم العثور على منتج واحد"; if (n === 2) return "تم العثور على منتجين";
  return n <= 10 ? `تم العثور على ${n} منتجات` : `تم العثور على ${n} منتجًا`;
};
