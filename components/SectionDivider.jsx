"use client";

import React from "react";

function SectionDivider({
  variant = "wave",
  flip = false,
  overlapDirection = "balanced",
  opacity = "default",
}) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const waveAnimationClass = prefersReducedMotion ? "" : "section-divider-wave";
  const opacityClass = opacity === "high" ? "high-opacity" : opacity === "medium" ? "medium-opacity" : "";

  // Determine overlap class based on direction
  const overlapClass =
    overlapDirection === "top"
      ? "overlap-top"
      : overlapDirection === "bottom"
      ? "overlap-bottom"
      : "overlap-balanced";

  if (variant === "wave") {
    const gradientId = `waveGradient-${flip ? "flip" : "normal"}-${opacity}`;
    const stopOpacity1 = opacity === "high" ? "0.6" : opacity === "medium" ? "0.45" : "0.3";
    const stopOpacity2 = opacity === "high" ? "0.4" : opacity === "medium" ? "0.3" : "0.18";
    const stopOpacity3 = opacity === "high" ? "0.6" : opacity === "medium" ? "0.45" : "0.3";
    
    return (
      <div
        className={`section-divider section-divider-wave-container ${
          flip ? "flip" : ""
        } ${overlapClass} ${opacityClass}`}
      >
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="section-divider-svg"
          style={{
            transform: flip ? "rotate(180deg)" : "none",
          }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#223f99" stopOpacity={stopOpacity1} />
              <stop offset="50%" stopColor="#223f99" stopOpacity={stopOpacity2} />
              <stop offset="100%" stopColor="#223f99" stopOpacity={stopOpacity3} />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-bg`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(210, 36%, 96%)" stopOpacity="0" />
              <stop offset="30%" stopColor="hsl(210, 36%, 96%)" stopOpacity="0.3" />
              <stop offset="70%" stopColor="hsl(210, 36%, 96%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(210, 36%, 96%)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g className={waveAnimationClass}>
            {/* Background gradient layer for smooth transition */}
            <path
              d="M0,0 L0,400 L1200,400 L1200,0 Z"
              fill={`url(#${gradientId}-bg)`}
            />
            {/* Ribbon Wave 1 - Main strong wave, behind sections, half section height */}
            <path
              d="M0,100 Q300,0 600,100 T1200,100 V300 Q900,400 600,300 T0,300 Z"
              fill={`url(#${gradientId})`}
              className="section-divider-main-wave"
            />
            {/* Ribbon Wave 2 (Offset) - Secondary layer */}
            <path
              d="M0,120 Q300,20 600,120 T1200,120 V320 Q900,420 600,320 T0,320 Z"
              fill={`url(#${gradientId})`}
              opacity="0.6"
              style={{
                animationDelay: "1.5s",
              }}
            />
          </g>
        </svg>
      </div>
    );
  }

  // Simple curve variant - Ribbon style
  const curveOpacity = opacity === "high" ? "0.35" : opacity === "medium" ? "0.25" : "0.15";
  
  return (
    <div
      className={`section-divider section-divider-curve-container ${
        flip ? "flip" : ""
      } ${overlapClass} ${opacityClass}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="section-divider-svg"
        style={{
          transform: flip ? "rotate(180deg)" : "none",
        }}
      >
        <g className={waveAnimationClass}>
          <path
            d="M0,50 Q600,0 1200,50 V70 Q600,20 0,70 Z"
            fill={`rgba(34, 63, 153, ${curveOpacity})`}
          />
        </g>
      </svg>
    </div>
  );
}

export default SectionDivider;
