"use client";

import React from "react";
import { Dropdown } from "antd";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { HiChevronDown } from "react-icons/hi";

const flags = {
  es: {
    src: "/mexico-flag.png",
    alt: "Español",
    label: "ES",
  },
  en: {
    src: "/usa-flag.webp",
    alt: "English",
    label: "EN",
  },
  pt: {
    src: "/brazil-flag.png",
    alt: "Português",
    label: "PT",
  },
};

export default function LanguageDropdown() {
  const { locale, changeLocale, supportedLocales } = useLanguage();
  const currentFlag = flags[locale];

  const items = supportedLocales.map((loc) => {
    const flag = flags[loc];
    const isActive = locale === loc;
    return {
      key: loc,
      label: (
        <div
          className={`flex items-center justify-center py-2 transition-colors duration-200 hover:bg-gray-100 w-full`}
        >
          <div className="relative">
            <Image src={flag.src} height={40} width={56} alt={flag.alt} />
            {isActive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#223f99] rounded-full border-2 border-white" />
            )}
          </div>
        </div>
      ),
      onClick: () => changeLocale(loc),
    };
  });

  return (
    <Dropdown
      menu={{ items }}
      trigger={["hover", "click"]}
      placement="bottomRight"
    >
      <button
        className="flex items-center justify-center gap-3 px-5 "
        aria-label="Seleccionar idioma"
      >
        <Image
          src={currentFlag.src}
          height={32}
          width={44}
          alt={currentFlag.alt}
          className="rounded object-cover flex-shrink-0"
        />
        <HiChevronDown className="text-gray-500 text-xs" />
      </button>
    </Dropdown>
  );
}
