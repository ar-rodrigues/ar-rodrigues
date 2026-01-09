"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Home() {
  const { t } = useLanguage();
  const imageBgOne = "/grey-2661270.png";
  const imageBgTwo = "/back-to-work.jpg";
  const { ref, isVisible, isLeaving } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <header
      id="home"
      ref={ref}
      className={`header scroll-fade-in ${isVisible ? "visible" : ""} ${
        isLeaving ? "leaving" : ""
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(${imageBgOne}), url(${imageBgTwo})`,
      }}
    >
      <div className="header-box">
        <h3>{t("common.home.title")}</h3>
        <h4>{t("common.home.subtitle")}</h4>
      </div>
    </header>
  );
}

export default Home;
