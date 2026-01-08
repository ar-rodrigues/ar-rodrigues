"use client";

import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Radar,
  PolarGrid
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

function Skills() {
  const [width, setWidth] = useState(800);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const skills = t("skills");
  const skillsTitle = t("common.skills.title");

  useEffect(() => {
    const updateWidth = () => {
      setWidth(
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      );
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section>
      <div className="title">
        <h2>{skillsTitle}</h2>
      </div>
      <div>
        <article className={`skill-center ${isVisible ? "fade-in-scale" : ""}`}>
          <div>
            <RadarChart
              cx="49%"
              innerRadius="10%"
              outerRadius="65%"
              width={width}
              height={400}
              margin={{ top: 0, right: 0, bottom: 5, left: 0 }}
              data={skills}
              fill="#223f99"
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={78} domain={[0, 7]} />
              <Radar
                name={skillsTitle}
                dataKey="nivel"
                stroke="#223f99"
                fill="#223f99"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Skills;
