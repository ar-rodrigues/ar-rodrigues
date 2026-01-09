"use client";

import { useState } from "react";
import { Dropdown } from "antd";
import Image from "next/image";
import {
  RiHomeLine,
  RiUserLine,
  RiBriefcaseLine,
  RiBookOpenLine,
  RiCodeSSlashLine,
  RiFolderLine,
  RiMailLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
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

const MobileBottomNav = ({ setIndex, activeLinkId, setActiveLinkId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale, changeLocale, supportedLocales } = useLanguage();
  const links = t("links");

  // Map link IDs to carousel indices: 2 -> 0, 3 -> 1, 4 -> 2
  const linkIdToIndex = { 2: 0, 3: 1, 4: 2 };

  // Icon mapping for each link
  const iconMap = {
    0: RiHomeLine, // Home
    1: RiUserLine, // About
    2: RiBriefcaseLine, // Experience
    3: RiBookOpenLine, // Courses
    4: RiCodeSSlashLine, // Skills
    5: RiFolderLine, // Portfolio
    6: RiMailLine, // Contact
  };

  // Smooth scroll handler (same logic as Navbar)
  const handleLinkClick = (link) => {
    // Update global active link state
    setActiveLinkId(link.id);

    const targetId = link.url.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Handle setIndex if it's a carousel section (Experiencia, Cursos, Habilidades)
    if (setIndex && link.id >= 2 && link.id <= 4) {
      const carouselIndex = linkIdToIndex[link.id];
      setIndex(carouselIndex);
    }

    // Close menu after clicking a link
    setIsOpen(false);
  };

  // Build menu items with react-icons
  const menuItems = links.map((link) => {
    const IconComponent = iconMap[link.id];
    const isActive = activeLinkId === link.id;

    return {
      key: link.id.toString(),
      icon: <IconComponent className="text-xl" />,
      label: (
        <span className={isActive ? "font-semibold" : "font-medium"}>
          {link.text}
        </span>
      ),
      onClick: () => handleLinkClick(link),
      className: isActive ? "mobile-nav-item-active" : "",
    };
  });

  // Add language flags at the bottom as a single menu item
  const languageItem = {
    key: "language-switcher",
    label: (
      <div className="flex items-center justify-center gap-3 py-2">
        {supportedLocales.map((loc) => {
          const isActive = locale === loc;
          return (
            <button
              key={loc}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                changeLocale(loc);
              }}
              className={`transition-all duration-200 ${
                isActive
                  ? "opacity-100 ring-2 ring-[#223f99] rounded scale-110"
                  : "opacity-60 hover:opacity-80"
              }`}
              aria-label={flags[loc].alt}
              title={flags[loc].alt}
            >
              <Image
                src={flags[loc].src}
                height={20}
                width={30}
                alt={flags[loc].alt}
                className="rounded"
              />
            </button>
          );
        })}
      </div>
    ),
    className: "mobile-nav-language-item",
    onClick: (e) => {
      e.domEvent?.stopPropagation();
    },
  };

  // Combine menu items with language flags
  const allMenuItems = [
    ...menuItems,
    { type: "divider", key: "lang-divider" },
    languageItem,
  ];

  return (
    <div className="fixed bottom-6 right-4 z-50 md:hidden">
      <Dropdown
        menu={{
          items: allMenuItems,
          selectedKeys: [activeLinkId.toString()],
          className: "mobile-nav-menu",
        }}
        trigger={["click"]}
        placement="topRight"
        open={isOpen}
        onOpenChange={setIsOpen}
        classNames={{ root: "mobile-nav-dropdown-overlay" }}
      >
        <button
          className="w-14 h-14 bg-[#223f99] text-white flex items-center justify-center rounded-full shadow-lg hover:bg-[#1a3180] active:scale-95 transition-all duration-200 relative"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          <div className="relative w-6 h-6">
            <RiMenuLine
              className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                isOpen
                  ? "opacity-0 rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <RiCloseLine
              className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </div>
        </button>
      </Dropdown>

      <style jsx global>{`
        /* Dropdown Animation Keyframes */
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDownFadeOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
        }

        /* Mobile Nav Dropdown Overlay - Enhanced animations */
        .mobile-nav-dropdown-overlay {
          padding-bottom: 8px;
        }

        /* Target the dropdown container when it appears */
        .mobile-nav-dropdown-overlay .ant-dropdown-menu {
          padding: 12px 0;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          min-width: 240px;
          animation: slideUpFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced transition for Ant Design's built-in classes */
        .mobile-nav-dropdown-overlay.ant-dropdown-placement-topRight
          .ant-dropdown-menu {
          animation: slideUpFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Menu Items - Increased size for better mobile touch targets */
        .mobile-nav-dropdown-overlay .ant-dropdown-menu-item {
          padding: 18px 24px;
          margin: 6px 12px;
          border-radius: 12px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 56px;
        }

        .mobile-nav-dropdown-overlay .ant-dropdown-menu-item:hover {
          background-color: rgba(34, 63, 153, 0.08);
        }

        /* Icon styling - Larger icons for better visibility */
        .mobile-nav-dropdown-overlay .ant-dropdown-menu-item-icon {
          color: #223f99;
          font-size: 22px;
          min-width: 24px;
        }

        /* Active/Selected item */
        .mobile-nav-dropdown-overlay .ant-dropdown-menu-item-selected,
        .mobile-nav-dropdown-overlay
          .ant-dropdown-menu-item.mobile-nav-item-active {
          background-color: rgba(34, 63, 153, 0.12);
          color: #223f99;
        }

        .mobile-nav-dropdown-overlay
          .ant-dropdown-menu-item-selected
          .ant-dropdown-menu-item-icon,
        .mobile-nav-dropdown-overlay
          .ant-dropdown-menu-item.mobile-nav-item-active
          .ant-dropdown-menu-item-icon {
          color: #223f99;
        }

        /* Text styling - Larger text for better readability */
        .mobile-nav-dropdown-overlay .ant-dropdown-menu-title-content {
          color: #374151;
          font-size: 16px;
          line-height: 1.5;
        }

        .mobile-nav-dropdown-overlay
          .ant-dropdown-menu-item-selected
          .ant-dropdown-menu-title-content {
          color: #223f99;
        }

        /* Language flags styling */
        .mobile-nav-dropdown-overlay .mobile-nav-language-item {
          padding: 8px 12px !important;
          margin: 4px 12px !important;
          min-height: auto !important;
          justify-content: center;
        }

        .mobile-nav-dropdown-overlay .mobile-nav-language-item:hover {
          background-color: transparent !important;
        }

        /* Divider styling */
        .mobile-nav-dropdown-overlay .ant-dropdown-menu-item-divider {
          margin: 8px 12px;
          background-color: rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
};

export default MobileBottomNav;
