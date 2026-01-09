"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Portfolio() {
  const { t } = useLanguage();
  const portfolio = t("portfolio");
  const { ref, isVisible, isLeaving } = useScrollAnimation({ 
    threshold: 0.1,
    triggerOnce: false 
  });

  return (
    <section
      id="portfolio"
      ref={ref}
      className={`portfolio scroll-fade-in ${isVisible ? "visible" : ""} ${isLeaving ? "leaving" : ""}`}
    >
      <h3>{t("common.portfolio.title")}</h3>
      <div className="portf-list">
        {portfolio.map((item) => (
          <div key={item.id} className="portf-item">
            <h4>{item.title}</h4>
            <a href={item.url} target="_blank" rel="noreferrer">
              <img src={item.image} alt={item.alt} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
