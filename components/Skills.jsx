"use client";

import React, { useState, useEffect } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Skills() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const skills = t("skills");
  const skillsTitle = t("common.skills.title");
  const { ref, isVisible, isLeaving } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform data for nivo format
  // Nivo expects an array where each object has the metric as a property
  const radarData =
    skills?.map((skill) => ({
      skill: skill.subject,
      level: skill.nivel,
    })) || [];

  if (!mounted || !skills || skills.length === 0) {
    return (
      <section style={{ width: "100%", display: "block" }}>
        <div className="title">
          <h2>{skillsTitle}</h2>
        </div>
        <div style={{ width: "100%", display: "block" }}>
          <article
            className="skill-center"
            style={{ width: "100%", display: "block" }}
          >
            <div className="radar-chart-wrapper" style={{ width: "100%" }}>
              <div>Cargando...</div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`scroll-fade-in ${isVisible ? "visible" : ""} ${
        isLeaving ? "leaving" : ""
      }`}
      style={{ width: "100%", display: "block" }}
    >
      <div className="title">
        <h2>{skillsTitle}</h2>
      </div>
      <div style={{ width: "100%", display: "block" }}>
        <article
          className="skill-center"
          style={{ width: "100%", display: "block" }}
        >
          <div className="radar-chart-wrapper" style={{ width: "100%" }}>
            <ResponsiveRadar
              data={radarData}
              keys={["level"]}
              indexBy="skill"
              valueFormat=" >-.0f"
              margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
              borderColor={{ from: "color" }}
              gridLabelOffset={24}
              dotSize={7}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              colors={["#223f99"]}
              fillOpacity={0.6}
              blendMode="normal"
              motionConfig="wobbly"
              maxValue={7}
              theme={{
                text: {
                  fill: "#223f99",
                  fontSize: 10,
                  fontWeight: 600,
                },
                grid: {
                  line: {
                    stroke: "#223f99",
                    strokeWidth: 1,
                    strokeOpacity: 0.3,
                  },
                },
              }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default Skills;
