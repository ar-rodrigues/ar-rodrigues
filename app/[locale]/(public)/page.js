"use client";

import { useEffect, useState, useRef } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

// Map index to link ID: 0 -> 2 (Experiencia), 1 -> 3 (Cursos), 2 -> 4 (Habilidades)
const indexToLinkId = [2, 3, 4];

export default function HomePage() {
  const [index, setIndex] = useState(1);
  const [activeLinkId, setActiveLinkId] = useState(0); // Start with Home (id: 0)
  const [direction, setDirection] = useState(null); // Track navigation direction: 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false); // Prevent rapid clicks during animation
  const isInitialized = useRef(false);
  const { t, isLoading } = useLanguage();

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

  // Initialize from URL hash on mount (only once)
  useEffect(() => {
    if (isInitialized.current) return;

    const hash = window.location.hash.replace("#", "");
    const links = t("links");

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
  }, [t]);

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
      if (newIndex < 0) {
        setIndex(lastIndex);
        setActiveLinkId(indexToLinkId[lastIndex]);
      } else {
        setIndex(newIndex);
        setActiveLinkId(indexToLinkId[newIndex]);
      }
    } else {
      const newIndex = index + 1;
      if (newIndex > lastIndex) {
        setIndex(0);
        setActiveLinkId(indexToLinkId[0]);
      } else {
        setIndex(newIndex);
        setActiveLinkId(indexToLinkId[newIndex]);
      }
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#223f99] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Navbar
        setIndex={setIndex}
        currentIndex={index}
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
