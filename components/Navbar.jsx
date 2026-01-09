"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageDropdown from "./LanguageDropdown";
import confetti from "canvas-confetti";

const Navbar = ({ setIndex, activeLinkId, setActiveLinkId }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const lastScrollYRef = useRef(0);
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

  // Handle logo click with confetti
  const handleLogoClick = (e) => {
    e.preventDefault();
    setActiveLinkId(0);
    
    // Logic to prevent intersection observer from triggering during manual scroll
    if (window.isManualScrollingTimeout) clearTimeout(window.isManualScrollingTimeout);
    document.dispatchEvent(new CustomEvent('manualScrollStart'));
    
    window.scrollTo({ top: 0, behavior: "smooth" });

    window.isManualScrollingTimeout = setTimeout(() => {
      document.dispatchEvent(new CustomEvent('manualScrollEnd'));
    }, 1000);

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

    const rawId = link.url.replace("#", "");
    // Map sub-section hashes to the parent container ID for scrolling
    const targetId = ["courses", "skills"].includes(rawId) ? "experiences" : rawId;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Logic to prevent intersection observer from triggering during manual scroll
      if (window.isManualScrollingTimeout) clearTimeout(window.isManualScrollingTimeout);
      document.dispatchEvent(new CustomEvent('manualScrollStart'));
      
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      window.isManualScrollingTimeout = setTimeout(() => {
        document.dispatchEvent(new CustomEvent('manualScrollEnd'));
      }, 1000);
    }

    // Handle setIndex if it's a carousel section (Experiencia, Cursos, Habilidades)
    if (setIndex && link.id >= 2 && link.id <= 4) {
      const carouselIndex = linkIdToIndex[link.id];
      if (window.updateIndexRef) window.updateIndexRef(carouselIndex);
      setIndex(carouselIndex);
    }
  };

  return (
    <nav
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                      className={`rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "!text-[#223f99] !bg-white shadow-lg !px-4 !lg:px-5 !py-2 !lg:py-2.5"
                          : "!text-white hover:!text-white hover:bg-white/10 !px-3 !lg:px-4 !py-1.5 !lg:py-2 hover:!px-4 hover:!lg:px-5 hover:!py-2 hover:!lg:py-2.5"
                      }`}
                    >
                      {link.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right side - Language Dropdown */}
          <div
            className="flex items-center gap-3 flex-shrink-0"
            style={{ paddingRight: "80px" }}
          >
            {/* Language Dropdown - Always visible */}
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
