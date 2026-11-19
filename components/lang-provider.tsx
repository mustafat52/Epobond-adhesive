"use client";
import { createContext, useContext } from "react";
import { Lang, href as h } from "@/lib/i18n";
import { dict } from "@/lib/dict";
// Gives client components the current language, its dictionary and a language-aware link builder.
const Ctx = createContext<Lang>("en");
export const LangProvider = ({ lang, children }: { lang: Lang; children: React.ReactNode }) => <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
export function useLang() { const lang = useContext(Ctx); return { lang, t: dict[lang], href: (p: string) => h(lang, p) }; }
