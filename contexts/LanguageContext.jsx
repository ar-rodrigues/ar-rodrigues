"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations as esTranslations } from "@/utils/translations/es";
import { translations as enTranslations } from "@/utils/translations/en";
import { translations as ptTranslations } from "@/utils/translations/pt";
import { FaGithubSquare, FaLinkedin, FaMedium } from "react-icons/fa";

const LanguageContext = createContext(undefined);

const translationsMap = {
  es: esTranslations,
  en: enTranslations,
  pt: ptTranslations,
};

const supportedLocales = ["es", "en", "pt"];
const defaultLocale = "es";

const iconMap = {
  FaLinkedin: FaLinkedin,
  FaGithubSquare: FaGithubSquare,
  FaMedium: FaMedium,
};

export function LanguageProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState(defaultLocale);
  const [isLoading, setIsLoading] = useState(true);
  const isChangingLocaleRef = useRef(false);

  // Extract locale from pathname
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathLocale = pathname.split("/")[1];
      
      if (supportedLocales.includes(pathLocale)) {
        const storedLocale = localStorage.getItem("preferredLocale");
        
        // If there's a stored preference that differs from pathname, redirect to stored preference
        // But skip if we're currently changing the locale (to avoid race condition)
        if (storedLocale && supportedLocales.includes(storedLocale) && storedLocale !== pathLocale && !isChangingLocaleRef.current) {
          const currentPath = pathname.replace(/^\/[^/]+/, "");
          router.replace(`/${storedLocale}${currentPath === "/" ? "" : currentPath}`);
          return;
        }
        
        // Reset the flag if pathname matches stored locale (navigation completed)
        if (isChangingLocaleRef.current && storedLocale === pathLocale) {
          isChangingLocaleRef.current = false;
        }
        
        // Only update localStorage if there's no stored preference, or if it matches (to keep in sync)
        if (!storedLocale || storedLocale === pathLocale) {
          localStorage.setItem("preferredLocale", pathLocale);
        }
        
        setLocale(pathLocale);
        
        // Update html lang attribute
        document.documentElement.lang = pathLocale;
        setIsLoading(false);
      } else {
        // Check localStorage first, then browser language
        const storedLocale = localStorage.getItem("preferredLocale");
        
        if (storedLocale && supportedLocales.includes(storedLocale)) {
          router.replace(`/${storedLocale}${pathname === "/" ? "" : pathname}`);
          return;
        }

        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        let detectedLocale = defaultLocale;

        if (browserLang.startsWith("en")) {
          detectedLocale = "en";
        } else if (browserLang.startsWith("pt")) {
          detectedLocale = "pt";
        } else if (browserLang.startsWith("es")) {
          detectedLocale = "es";
        }

        router.replace(`/${detectedLocale}${pathname === "/" ? "" : pathname}`);
      }
    }
  }, [pathname, router]);

  const changeLocale = (newLocale) => {
    if (!supportedLocales.includes(newLocale)) return;
    
    // Set flag to prevent useEffect from interfering
    isChangingLocaleRef.current = true;
    
    const currentPath = pathname.replace(/^\/[^/]+/, "");
    const newPath = `/${newLocale}${currentPath === "/" ? "" : currentPath}`;
    
    setLocale(newLocale);
    localStorage.setItem("preferredLocale", newLocale);
    
    // Update html lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
    
    // Use window.history for immediate URL update, then let Next.js router handle it
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", newPath);
    }
    router.replace(newPath);
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translationsMap[locale];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to Spanish if translation not found
        value = translationsMap[defaultLocale];
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key;
          }
        }
        break;
      }
    }

    return value;
  };

  const getSocialIcon = (iconName) => {
    return iconMap[iconName] || null;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        changeLocale,
        t,
        getSocialIcon,
        isLoading,
        supportedLocales,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

