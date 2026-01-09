"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function About() {
  const { t } = useLanguage();
  const infos = t("infos");
  const { ref, isVisible, isLeaving } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section
      id="about"
      ref={ref}
      className={`about scroll-fade-in ${isVisible ? "visible" : ""} ${
        isLeaving ? "leaving" : ""
      }`}
    >
      {infos.map((infoItem) => {
        const { id, name, birth, about, photo } = infoItem;
        const getAge = (dateString) => {
          let today = new Date();
          let birthDate = new Date(dateString);
          let age = today.getFullYear() - birthDate.getFullYear();
          let m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        };

        return (
          <article key={id} className="info-about">
            <div className="about-image-wrapper">
              <img src={photo} alt="alisson rodrigues" />
            </div>
            <div className="info-text">
              <h3>{`${name}, ${getAge(birth)} ${t("common.years")}`}</h3>
              <h4>{t("common.about")}</h4>
              {Array.isArray(about) ? (
                about.map((paragraph, index) => <p key={index}>{paragraph}</p>)
              ) : (
                <p>{about}</p>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default About;
