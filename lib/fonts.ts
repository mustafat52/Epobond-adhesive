import { Barlow_Condensed, Barlow, Cairo, Tajawal } from "next/font/google";
// Latin: Barlow (model numbers, numerals, English text). Arabic: Cairo for headings, Tajawal for body text.
// Tailwind's font stacks list Barlow first, so Latin letters and digits keep the brand look even inside Arabic text.
export const display = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
export const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
export const arDisplay = Cairo({ subsets: ["arabic"], weight: ["600", "700", "800"], variable: "--font-ar-display" });
export const arBody = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-ar-body" });
