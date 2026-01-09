"use client";

import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Education() {
  const [value, setValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useLanguage();
  const courses = t("courses");
  const { ref, isVisible, isLeaving } = useScrollAnimation({ threshold: 0.1 });

  const { title, field, institution, dates, names, certified } = courses[value];

  // Trigger animation when value changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <section
      ref={ref}
      className={`scroll-fade-in ${isVisible ? "visible" : ""} ${isLeaving ? "leaving" : ""}`}
    >
      <div className="title">
        <h2>{t("common.education.title")}</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {courses.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.field}
              </button>
            );
          })}
        </div>
        {/* courses info */}
        <article className={`job-info ${isAnimating ? "fade-in-content" : ""}`}>
          <h3>{title}</h3>
          <h4>{field}</h4>
          <h5>{institution}</h5>
          <p className="job-date">{dates}</p>
          {names.map((name, index) => {
            return (
              <div 
                key={index} 
                className="job-desc"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FaAngleDoubleRight className="job-icon" />
                <p>
                  {certified[index] ? (
                    <a href={certified[index]} target="_blank" rel="noreferrer">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Education;
