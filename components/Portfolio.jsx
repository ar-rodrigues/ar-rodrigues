"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function Portfolio() {
  const { t } = useLanguage();
  const firstImg = "/drakelfo-website.png";
  const secondgImg = "/sites-preview.png";
  const thirdImg = "/dashboard.png";

  return (
    <section id="portfolio" className="portfolio">
      <h3>
        {t("common.portfolio.title")}
      </h3>
    <div className="portf-list">
      <div className="portf-item">
        <h4>Ecommerce - WordPress</h4>
        <a 
          href="https://drakelfo.mx/"
          target="_blank"
          rel="noreferrer">
            <img src={firstImg} alt="Drakelfo website" />
        </a>
      </div>
      <div className="portf-item">
        <h4>Single Page App - React</h4>
        <a 
          href="https://alisson-rodrigues.netlify.app/"
          target="_blank"
          rel="noreferrer">
            <img src={secondgImg} alt="Sites preview" />
        </a>
      </div>
       <div className="portf-item">
        <h4>Full-Stack Dashboard App - NEXT JS</h4>
        <a 
          href="https://drakelfo-dashboard.alissonrodrigu3.repl.co/dashboard"
          target="_blank"
          rel="noreferrer">
            <img src={thirdImg} alt="Dashboard" />
        </a>
      </div>
    </div>
    </section>
  );
}

export default Portfolio;
