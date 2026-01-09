"use client";

import { useEffect, useState, useRef } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Home from "@/components/Home";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BackgroundWave from "@/components/BackgroundWave";
import { useLanguage } from "@/contexts/LanguageContext";

// Map index to link ID: 0 -> 2 (Experiencia), 1 -> 3 (Cursos), 2 -> 4 (Habilidades)
const indexToLinkId = [2, 3, 4];

export default function HomePage() {
  const [index, setIndex] = useState(1);
  const indexRef = useRef(1); // Keep a ref to read the current index in the intersection observer
  const [activeLinkId, setActiveLinkId] = useState(0); // Start with Home (id: 0)
  const [direction, setDirection] = useState(null); // Track navigation direction: 'left' or 'right'
  const isAnimating = useState(false)[0]; // Keep existing state for animation tracking
  const setIsAnimating = useState(false)[1];
  const isManualScrolling = useRef(false);
  const isInitialized = useRef(false);
  const hasScrolledToHash = useRef(false);
  const scrollRetryCount = useRef(0);
  const initialHashRef = useRef(null);
  const { t, isLoading } = useLanguage();

  useEffect(() => {
    const startHandler = () => { isManualScrolling.current = true; };
    const endHandler = () => { isManualScrolling.current = false; };
    document.addEventListener('manualScrollStart', startHandler);
    document.addEventListener('manualScrollEnd', endHandler);
    return () => {
      document.removeEventListener('manualScrollStart', startHandler);
      document.removeEventListener('manualScrollEnd', endHandler);
    };
  }, []);

  const activeSection = [
    <Experiences key="experiences" />,
    <Education key="education" />,
    <Skills key="skills" />,
  ];

  const lastIndex = activeSection.length - 1;

  // Sync index with activeLinkId when activeLinkId changes (for carousel sections)
  useEffect(() => {
    const linkIdIndex = indexToLinkId.indexOf(activeLinkId);
    if (linkIdIndex !== -1 && linkIdIndex !== index) {
      setIndex(linkIdIndex);
    }
  }, [activeLinkId, index]);

  // Sync indexRef with index
  useEffect(() => {
    indexRef.current = index;
    window.updateIndexRef = (val) => { indexRef.current = val; };
  }, [index]);

  // Sync activeLinkId with index when index changes (for carousel sections)
  useEffect(() => {
    if (!isInitialized.current) return;
    const newActiveLinkId = indexToLinkId[index];
    if (activeLinkId !== newActiveLinkId && [2, 3, 4].includes(activeLinkId)) {
      setActiveLinkId(newActiveLinkId);
    }
  }, [index, activeLinkId]);

  // Initialize from URL hash on mount (only once)
  useEffect(() => {
    if (isInitialized.current || isLoading) return;

    const hash = window.location.hash.replace("#", "");
    const links = t("links");
    // Store the initial hash in a ref so we can use it even if URL changes later
    if (hash && !initialHashRef.current) {
      initialHashRef.current = hash;
    }

    if (hash) {
      // If there's a hash, use it to set the active link
      const link = links.find((l) => l.url === `#${hash}`);
      if (link) {
        setActiveLinkId(link.id);
        // If it's a carousel section, set the index
        const linkIdIndex = indexToLinkId.indexOf(link.id);
        if (linkIdIndex !== -1) {
          setIndex(linkIdIndex);
        }
      }
    } else {
      // If no hash, default to Home (id: 0) and don't set a hash
      setActiveLinkId(0);
    }

    isInitialized.current = true;
  }, [t, isLoading]);

  // Scroll to hash section on initial page load
  useEffect(() => {
    if (isLoading || !isInitialized.current || hasScrolledToHash.current)
      return;

    // Use stored hash from ref instead of reading from URL (which might have changed)
    const hash =
      initialHashRef.current || window.location.hash.replace("#", "");
    if (!hash || hash === "home") {
      hasScrolledToHash.current = true;
      return;
    }

    // Wait for DOM to be ready
    const performScroll = () => {
      // Map sub-section hashes to the parent container ID
      const scrollHash = ["courses", "skills"].includes(hash) ? "experiences" : hash;
      const targetElement = document.getElementById(scrollHash);

      if (targetElement) {
        isManualScrolling.current = true;
        const rect = targetElement.getBoundingClientRect();
        const offsetTop = window.pageYOffset + rect.top - 80;
        const scrollDiff = Math.abs(window.pageYOffset - offsetTop);

        // Only scroll if we are not already roughly there
        if (scrollDiff > 50) {
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
          
          // Reset manual scroll flag after animation
          setTimeout(() => {
            isManualScrolling.current = false;
          }, 1000);
        } else {
          isManualScrolling.current = false;
        }
        hasScrolledToHash.current = true;
      } else {
        scrollRetryCount.current++;
        if (scrollRetryCount.current < 20) {
          setTimeout(performScroll, 200);
        } else {
          hasScrolledToHash.current = true;
        }
      }
    };

    const timeoutId = setTimeout(performScroll, 500);
    return () => clearTimeout(timeoutId);
  }, [isLoading]); // Removed 'index' from dependencies - we only want to scroll once on initial load

  // Handle scroll tracking to update activeLinkId automatically
  useEffect(() => {
    if (isLoading || !isInitialized.current) return;

    const sections = [
      { id: 0, selector: "home" },
      { id: 1, selector: "about" },
      { id: 2, selector: "experiences" }, // Maps to Experiencia, Cursos, Habilidades
      { id: 5, selector: "portfolio" },
      { id: 6, selector: "contact-box" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // Trigger when section occupies a good portion of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.selector === entry.target.id);
          if (section) {
            let newId = section.id;
            if (section.id === 2) {
              // Sync with current carousel index when entering the experiences section
              newId = indexToLinkId[indexRef.current];
            }
            
            // Only update if it's actually different to avoid unnecessary hash replacements
            setActiveLinkId((prev) => {
              if (prev === newId) return prev;
              
              // If we are currently manual scrolling, ignore the observer
              if (isManualScrolling.current) return prev;
              
              return newId;
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.selector);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading]); // Removed index from dependencies - now using indexRef

  // Update URL hash when activeLinkId changes (only after initialization)
  useEffect(() => {
    if (!isInitialized.current) return;

    const links = t("links");
    const activeLink = links.find((link) => link.id === activeLinkId);
    if (activeLink && activeLink.url !== "#home") {
      // Only set hash for non-home sections
      const hash = activeLink.url.replace("#", "");
      window.history.replaceState(null, "", `#${hash}`);
    } else if (activeLink && activeLink.url === "#home") {
      // Remove hash if home is selected
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [activeLinkId, t]);

  // Handle arrow clicks - update both index and activeLinkId
  const handleArrowClick = (clickDirection) => {
    if (isAnimating) return; // Prevent clicks during animation

    setIsAnimating(true);
    setDirection(clickDirection);

    if (clickDirection === "prev") {
      const newIndex = index - 1;
      const finalIndex = newIndex < 0 ? lastIndex : newIndex;
      indexRef.current = finalIndex; // Update ref immediately
      setIndex(finalIndex);
      setActiveLinkId(indexToLinkId[finalIndex]);
    } else {
      const newIndex = index + 1;
      const finalIndex = newIndex > lastIndex ? 0 : newIndex;
      indexRef.current = finalIndex; // Update ref immediately
      setIndex(finalIndex);
      setActiveLinkId(indexToLinkId[finalIndex]);
    }

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 400);
  };

  useEffect(() => {
    if (index < 0) {
      setIndex(lastIndex);
      setActiveLinkId(indexToLinkId[lastIndex]);
    }
    if (index > lastIndex) {
      setIndex(0);
      setActiveLinkId(indexToLinkId[0]);
    }
  }, [index, lastIndex, setActiveLinkId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#223f99]"></div>
      </div>
    );
  }

  return (
    <main>
      <BackgroundWave />
      <Navbar
        setIndex={setIndex}
        currentIndex={index}
        activeLinkId={activeLinkId}
        setActiveLinkId={setActiveLinkId}
      />
      <MobileBottomNav
        setIndex={setIndex}
        activeLinkId={activeLinkId}
        setActiveLinkId={setActiveLinkId}
      />
      <Home />
      <About />
      <div id="experiences" className="experiences">
        <button className="prev" onClick={() => handleArrowClick("prev")}>
          <AiOutlineLeft />
        </button>
        <button className="next" onClick={() => handleArrowClick("next")}>
          <AiOutlineRight />
        </button>
        <div
          className={`section-container ${
            direction === "prev"
              ? "slide-in-left"
              : direction === "next"
              ? "slide-in-right"
              : ""
          }`}
        >
          {activeSection[index]}
        </div>
      </div>
      <Portfolio />
      <Contact />
      <footer>
        <LanguageSwitcher />
        <h4>{t("common.createdBy")}</h4>
      </footer>
    </main>
  );
}
