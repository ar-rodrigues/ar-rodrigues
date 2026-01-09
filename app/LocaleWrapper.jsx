"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LocaleWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const pathLocale = pathname.split("/")[1];
    const supportedLocales = ["es", "en", "pt"];
    const defaultLocale = "es";
    
    if (supportedLocales.includes(pathLocale)) {
      document.documentElement.lang = pathLocale;
    } else {
      document.documentElement.lang = defaultLocale;
    }
  }, [pathname]);

  return <>{children}</>;
}






