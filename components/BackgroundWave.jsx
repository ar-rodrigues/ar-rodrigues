"use client";

import React from "react";

function BackgroundWave() {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const waveAnimationClass = prefersReducedMotion ? "" : "background-wave-animate";

  return (
    <div className="background-wave">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="background-wave-svg"
      >
        <defs>
          <linearGradient
            id="backgroundWaveGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(210, 36%, 96%)" stopOpacity="1" />
            <stop offset="50%" stopColor="#223f99" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id="backgroundWaveGradientSecondary"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(210, 36%, 96%)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#223f99" stopOpacity="0.1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <g className={waveAnimationClass}>
          {/* Main diagonal wave - creates the division between two color zones */}
          {/* Wave flows diagonally across the entire viewport */}
          <path
            d="M0,0 L0,300 Q300,200 600,300 T1200,300 L1200,0 Z"
            fill="url(#backgroundWaveGradient)"
            className="background-wave-main"
          />
          {/* Extend wave to cover full height */}
          <path
            d="M0,300 Q300,200 600,300 T1200,300 L1200,800 Q900,700 600,800 T0,800 Z"
            fill="url(#backgroundWaveGradient)"
            className="background-wave-main"
          />
          {/* Secondary wave layer for depth */}
          <path
            d="M0,0 L0,320 Q300,220 600,320 T1200,320 L1200,0 Z"
            fill="url(#backgroundWaveGradientSecondary)"
            opacity="0.6"
            style={{
              animationDelay: "1.5s",
            }}
          />
          <path
            d="M0,320 Q300,220 600,320 T1200,320 L1200,800 Q900,720 600,820 T0,800 Z"
            fill="url(#backgroundWaveGradientSecondary)"
            opacity="0.6"
            style={{
              animationDelay: "1.5s",
            }}
          />
          {/* Additional subtle layer */}
          <path
            d="M0,0 L0,280 Q300,180 600,280 T1200,280 L1200,0 Z"
            fill="url(#backgroundWaveGradientSecondary)"
            opacity="0.4"
            style={{
              animationDelay: "3s",
            }}
          />
          <path
            d="M0,280 Q300,180 600,280 T1200,280 L1200,800 Q900,680 600,780 T0,800 Z"
            fill="url(#backgroundWaveGradientSecondary)"
            opacity="0.4"
            style={{
              animationDelay: "3s",
            }}
          />
        </g>
      </svg>
    </div>
  );
}

export default BackgroundWave;

