import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * List Format Icon - for Grammar Units menu
 * Based on Unicons Font style list format icon
 */
export const ListFormatIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
  onClick,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Three horizontal lines representing list items */}
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />

      {/* Three dots on the left representing list bullets */}
      <circle cx="3" cy="6" r="1" fill={color} />
      <circle cx="3" cy="12" r="1" fill={color} />
      <circle cx="3" cy="18" r="1" fill={color} />
    </svg>
  );
};

/**
 * Vietnamese Flag Icon
 */
export const VietnameseFlagIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  onClick,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 900 600"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Red background */}
      <rect width="900" height="600" fill="#CE1126" />
      
      {/* Yellow star */}
      <g fill="#FFDE00">
        <polygon points="450,150 475,250 580,250 500,310 525,410 450,350 375,410 400,310 320,250 425,250" />
      </g>
    </svg>
  );
};

/**
 * English/UK Flag Icon
 */
export const EnglishFlagIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  onClick,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 900 600"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Blue background */}
      <rect width="900" height="600" fill="#012169" />
      
      {/* White cross */}
      <rect y="250" width="900" height="100" fill="white" />
      <rect x="400" height="600" width="100" fill="white" />
      
      {/* Red cross */}
      <rect y="280" width="900" height="40" fill="#C8102E" />
      <rect x="430" height="600" width="40" fill="#C8102E" />
      
      {/* Diagonal crosses */}
      <g fill="#C8102E">
        <polygon points="0,0 80,0 900,580 900,600 820,600 0,20" />
        <polygon points="900,0 820,0 0,580 0,600 80,600 900,20" />
      </g>
      
      {/* Diagonal white overlays for cross effect */}
      <g fill="white" opacity="0.5">
        <polygon points="0,0 60,0 900,560 900,600 840,600 0,40" />
        <polygon points="900,0 840,0 0,560 0,600 60,600 900,40" />
      </g>
    </svg>
  );
};


