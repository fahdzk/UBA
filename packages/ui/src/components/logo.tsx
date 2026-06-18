/**
 * UBA Logo Component
 *
 * Pixel-accurate SVG based on specification:
 * - Navy Blue #032B66
 * - Red #F21B23
 * - White background
 * - 4 sections: crown/arch, UBA text, swoosh/shield, subtitle
 */
import React from "react";

interface UBALogoProps {
  /** Width in px or CSS string. Height auto-scales 1:1. */
  size?: number | string;
  className?: string;
}

export function UBALogo({ size = 200, className = "" }: UBALogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="UBA — Union of Brand Ambassadors"
    >
      {/* White background */}
      <rect width="400" height="400" fill="#FFFFFF" />

      {/* ===== SECTION 1: TOP CROWN / ARCH + STARS ===== */}

      {/* Left pillar */}
      <rect x="75" y="30" width="12" height="35" rx="2" fill="#032B66" />
      {/* Right pillar */}
      <rect x="313" y="30" width="12" height="35" rx="2" fill="#032B66" />

      {/* Curved arch connecting pillars */}
      <path
        d="M 81 30 Q 81 10 200 10 Q 319 10 319 30"
        fill="none"
        stroke="#032B66"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Large center star */}
      <g transform="translate(200, 52)">
        <polygon
          points="0,-42 12,-14 42,-14 18,6 28,36 0,18 -28,36 -18,6 -42,-14 -12,-14"
          fill="#032B66"
        />
        {/* Inner cut accents for 3D effect */}
        <polygon
          points="0,-28 7,-8 28,-8 11,4 17,24 0,12 -17,24 -11,4 -28,-8 -7,-8"
          fill="#FFFFFF"
          opacity="0.15"
        />
        <polygon
          points="0,-18 4,-5 18,-5 7,2 11,16 0,8 -11,16 -7,2 -18,-5 -4,-5"
          fill="#032B66"
        />
      </g>

      {/* Small left red star */}
      <g transform="translate(138, 38)">
        <polygon
          points="0,-16 4.5,-5.5 16,-5.5 6.5,2.5 10.5,14.5 0,7 -10.5,14.5 -6.5,2.5 -16,-5.5 -4.5,-5.5"
          fill="#F21B23"
        />
      </g>

      {/* Small right red star */}
      <g transform="translate(262, 38)">
        <polygon
          points="0,-16 4.5,-5.5 16,-5.5 6.5,2.5 10.5,14.5 0,7 -10.5,14.5 -6.5,2.5 -16,-5.5 -4.5,-5.5"
          fill="#F21B23"
        />
      </g>

      {/* ===== SECTION 2: MAIN TEXT "UBA" ===== */}

      {/* Letter U — Navy, thick rounded */}
      <text
        x="68"
        y="210"
        fontFamily="Montserrat, Gotham, Inter, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="105"
        fill="#032B66"
        letterSpacing="-2"
      >
        U
      </text>

      {/* Letter B — Navy, thick */}
      <text
        x="155"
        y="210"
        fontFamily="Montserrat, Gotham, Inter, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="105"
        fill="#032B66"
        letterSpacing="-2"
      >
        B
      </text>

      {/* Letter A — Red */}
      <text
        x="270"
        y="210"
        fontFamily="Montserrat, Gotham, Inter, Arial Black, sans-serif"
        fontWeight="900"
        fontSize="105"
        fill="#F21B23"
        letterSpacing="-2"
      >
        A
      </text>

      {/* ===== SECTION 3: SWOOSH + SHIELD ===== */}

      {/* Upper blue swoosh */}
      <path
        d="M 40 195 Q 120 170 200 178 Q 280 186 360 165"
        fill="none"
        stroke="#032B66"
        strokeWidth="18"
        strokeLinecap="round"
      />

      {/* Second red swoosh */}
      <path
        d="M 35 210 Q 115 185 200 193 Q 285 201 370 180"
        fill="none"
        stroke="#F21B23"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Thin red accent near left */}
      <path
        d="M 40 220 Q 90 210 140 215"
        fill="none"
        stroke="#F21B23"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Bottom shield curve */}
      <path
        d="M 55 180 Q 55 270 200 310 Q 345 270 345 180"
        fill="none"
        stroke="#032B66"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* ===== SECTION 4: SUBTITLE ===== */}

      {/* Decorative left line */}
      <line x1="55" y1="348" x2="125" y2="348" stroke="#032B66" strokeWidth="2.5" />

      {/* Line 1: "UNION OF" */}
      <text
        x="200"
        y="354"
        fontFamily="Montserrat, Gotham, Inter, Arial, sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#032B66"
        textAnchor="middle"
        letterSpacing="3"
      >
        UNION OF
      </text>

      {/* Decorative right line */}
      <line x1="275" y1="348" x2="345" y2="348" stroke="#032B66" strokeWidth="2.5" />

      {/* Line 2: "BRAND AMBASSADORS" */}
      <text
        x="200"
        y="384"
        fontFamily="Montserrat, Gotham, Inter, Arial, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#F21B23"
        textAnchor="middle"
        letterSpacing="6"
      >
        BRAND AMBASSADORS
      </text>
    </svg>
  );
}

/** Compact logo for headers/nav */
export function UBALogoCompact({ size = 40, className = "" }: UBALogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="UBA"
    >
      <rect width="100" height="100" fill="#FFFFFF" />

      {/* Mini arch */}
      <path d="M 18 12 Q 18 2 50 2 Q 82 2 82 12" fill="none" stroke="#032B66" strokeWidth="3" strokeLinecap="round" />
      <rect x="16" y="8" width="3" height="10" rx="1" fill="#032B66" />
      <rect x="81" y="8" width="3" height="10" rx="1" fill="#032B66" />

      {/* Mini star */}
      <polygon points="50,15 53,24 62,24 55,29 57,38 50,33 43,38 45,29 38,24 47,24" fill="#032B66" />

      {/* Mini stars */}
      <polygon points="33,10 35,15 40,15 36,18 37,23 33,20 29,23 30,18 26,15 31,15" fill="#F21B23" />
      <polygon points="67,10 69,15 74,15 70,18 71,23 67,20 63,23 64,18 60,15 65,15" fill="#F21B23" />

      {/* Mini UBA text */}
      <text x="14" y="62" fontFamily="Montserrat, Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#032B66">U</text>
      <text x="34" y="62" fontFamily="Montserrat, Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#032B66">B</text>
      <text x="56" y="62" fontFamily="Montserrat, Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#F21B23">A</text>

      {/* Mini swoosh */}
      <path d="M 10 54 Q 30 46 50 49 Q 70 52 90 44" fill="none" stroke="#032B66" strokeWidth="5" strokeLinecap="round" />
      <path d="M 8 58 Q 28 50 50 53 Q 72 56 92 48" fill="none" stroke="#F21B23" strokeWidth="3" strokeLinecap="round" />

      {/* Mini subtitle */}
      <text x="50" y="82" fontFamily="Montserrat, Arial, sans-serif" fontWeight="700" fontSize="4.5" fill="#032B66" textAnchor="middle" letterSpacing="1">UNION OF</text>
      <text x="50" y="92" fontFamily="Montserrat, Arial, sans-serif" fontWeight="700" fontSize="4.5" fill="#F21B23" textAnchor="middle" letter-spacing="1.5">BRAND AMBASSADORS</text>
    </svg>
  );
}

export default UBALogo;
