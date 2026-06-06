"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { translations, Lang, Translations } from "./translations";

type LanguageContextType = {
  lang: Lang;
  t: Translations;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  const toggle = () => setLang((prev) => (prev === "en" ? "pt" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
