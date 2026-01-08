"use client";

import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

function Experiences() {
  const [value, setValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLanguage();
  const experiences = t("experiences");
  const links = t("links");

  const { company, dates, duties, title } = experiences[value];

  // Trigger animation when value changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <section id="experiences">
      <div className="title">
        <h2>{links[2].text}</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {experiences.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className={`job-info ${isAnimating ? "fade-in-content" : ""}`}>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div
                key={index}
                className="job-desc"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Experiences;
