"use client";

import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "./LanguageDropdown";
import confetti from "canvas-confetti";

const Navbar = ({ setIndex, activeLinkId, setActiveLinkId }) => {
  const [showLinks, setShowLinks] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const lastScrollYRef = useRef(0);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const { t } = useLanguage();
  const links = t("links");

  // Map link IDs to carousel indices: 2 -> 0, 3 -> 1, 4 -> 2
  const linkIdToIndex = { 2: 0, 3: 1, 4: 2 };

  // Handle scroll effect and shake animation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setScrolled(scrollTop > 20);

          // Trigger shake animation when scrolling (only if position actually changed)
          if (Math.abs(scrollTop - lastScrollYRef.current) > 1) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            lastScrollYRef.current = scrollTop;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  // Handle logo click with confetti
  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveLinkId(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowLinks(false);

    // Confetti effect - all explosions at once
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Trigger multiple confetti bursts simultaneously
    const count = 5;
    const particleCount = 50;

    for (let i = 0; i < count; i++) {
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }
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
          ? "bg-[#223f99]/95 backdrop-blur-md shadow-lg"
          : "bg-[#223f99]/90 backdrop-blur-sm"
      }`}
    >
      <div className="w-full px-[5%] sm:px-[7%] md:px-[10%] lg:px-[12%]">
        <div className="flex items-center justify-between h-16 md:h-20 gap-8">
          {/* Logo/Brand - Left side */}
          <div className="flex-shrink-0" style={{ paddingLeft: "80px" }}>
            <a
              href="#home"
              onClick={handleLogoClick}
              className="logo-link flex items-center transition-all duration-200"
            >
              <Image
                src="/retro.png"
                alt="Alisson Rodrigues - Computer stickers created by Stickers - Flaticon (https://www.flaticon.com/free-stickers/computer)"
                width={40}
                height={40}
                className={`logo-image rounded-lg shadow-xl transition-transform duration-200 ${
                  isShaking ? "animate-shake" : ""
                }`}
              />
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
                          ? "text-white bg-white/50 shadow-lg !px-8 !lg:px-10 !py-4 !lg:py-5"
                          : "text-white hover:text-white hover:bg-white/10 !px-5 !lg:px-6 !py-2.5 !lg:py-3 hover:!px-8 hover:!lg:px-10 hover:!py-4 hover:!lg:py-5"
                      }`}
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
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                        ? "text-white bg-white/50 shadow-lg !px-8 !py-5"
                        : "text-white hover:text-white hover:bg-white/10 !px-6 !py-3.5 hover:!px-8 hover:!py-5"
                    }`}
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
