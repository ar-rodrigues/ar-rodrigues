"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const flags = {
  es: {
    src: "/mexico-flag.png",
    alt: "Español",
  },
  en: {
    src: "/usa-flag.webp",
    alt: "English",
  },
  pt: {
    src: "/brazil-flag.png",
    alt: "Português",
  },
};

export default function LanguageSwitcher({ className = "" }) {
  const { locale, changeLocale, supportedLocales } = useLanguage();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {supportedLocales.map((loc) => (
        <button
          key={loc}
          onClick={() => changeLocale(loc)}
          className={`transition-opacity hover:opacity-80 ${
            locale === loc ? "opacity-100 ring-2 ring-blue-500 rounded" : "opacity-60"
          }`}
          aria-label={flags[loc].alt}
          title={flags[loc].alt}
        >
          <Image
            src={flags[loc].src}
            height={25}
            width={37}
            alt={flags[loc].alt}
            className="rounded"
          />
        </button>
      ))}
    </div>
  );
}




