"use client";

import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "./LanguageDropdown";

const Navbar = ({ setIndex, activeLinkId, setActiveLinkId }) => {
  const [showLinks, setShowLinks] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const { t } = useLanguage();
  const links = t("links");

  // Map link IDs to carousel indices: 2 -> 0, 3 -> 1, 4 -> 2
  const linkIdToIndex = { 2: 0, 3: 1, 4: 2 };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  // Smooth scroll handler
  const handleLinkClick = (e, link) => {
    e.preventDefault();

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

    // Close mobile menu
    setShowLinks(false);

    // Handle setIndex if it's a carousel section (Experiencia, Cursos, Habilidades)
    if (setIndex && link.id >= 2 && link.id <= 4) {
      const carouselIndex = linkIdToIndex[link.id];
      setIndex(carouselIndex);
    }
  };

  useEffect(() => {
    if (linksRef.current && linksContainerRef.current) {
      const linksHeight = linksRef.current.getBoundingClientRect().height;
      if (showLinks) {
        linksContainerRef.current.style.height = `${linksHeight}px`;
      } else {
        linksContainerRef.current.style.height = "0px";
      }
    }
  }, [showLinks, links]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="w-full px-[5%] sm:px-[7%] md:px-[10%] lg:px-[12%]">
        <div className="flex items-center justify-between h-16 md:h-20 gap-8">
          {/* Logo/Brand - Left side */}
          <div className="flex-shrink-0" style={{ paddingLeft: "80px" }}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveLinkId(0);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowLinks(false);
              }}
              className="text-xl md:text-2xl font-bold text-[#223f99] hover:text-[#1a2f7a] transition-colors duration-200"
            >
              AR
            </a>
          </div>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <ul
              className="flex items-center space-x-1 lg:space-x-2"
              ref={linksRef}
            >
              {links.map((link) => {
                const isActive = activeLinkId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "text-[#223f99] bg-[#223f99]/10 !px-8 !lg:px-10 !py-4 !lg:py-5"
                          : "text-gray-700 hover:text-[#223f99] hover:bg-gray-100/50 !px-5 !lg:px-6 !py-2.5 !lg:py-3 hover:!px-8 hover:!lg:px-10 hover:!py-4 hover:!lg:py-5"
                      }`}
                      style={{
                        boxShadow: "none",
                        borderBottom: "none",
                        padding: isActive ? undefined : undefined,
                      }}
                    >
                      {link.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right side - Language Dropdown and Mobile Menu Button */}
          <div
            className="flex items-center gap-3 flex-shrink-0"
            style={{ paddingRight: "80px" }}
          >
            {/* Language Dropdown - Always visible */}
            <LanguageDropdown />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleLinks}
              className="md:hidden p-2 rounded-lg text-[#223f99] hover:bg-[#223f99]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#223f99]/50"
              aria-label="Toggle menu"
              aria-expanded={showLinks}
            >
              {showLinks ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div
          ref={linksContainerRef}
          className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        >
          <ul className="py-2 space-y-2" ref={linksRef}>
            {links.map((link) => {
              const isActive = activeLinkId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`block rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#223f99] bg-[#223f99]/10 !px-8 !py-5"
                        : "text-gray-700 hover:text-[#223f99] hover:bg-gray-100/50 !px-6 !py-3.5 hover:!px-8 hover:!py-5"
                    }`}
                    style={{
                      boxShadow: "none",
                      borderBottom: "none",
                    }}
                  >
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
