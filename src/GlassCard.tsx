import React from 'react';
import styles from './GlassCard.module.scss';

interface GlassCardProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  backgroundAlpha?: number; // 0-1, overrides default transparency
  style?: React.CSSProperties;
  className?: string;
}

// Helper to generate a random pastel gradient
function randomGlassGradient() {
  const angle = Math.floor(Math.random() * 360);
  // Pick 2-3 pastel color stops
  const stops = [
    `rgba(${180 + Math.floor(Math.random()*60)},${200 + Math.floor(Math.random()*40)},255,0.18)`,
    `rgba(${200 + Math.floor(Math.random()*40)},${180 + Math.floor(Math.random()*60)},255,0.10)`,
    `rgba(255,255,255,0.04)`
  ];
  return `linear-gradient(${angle}deg, ${stops[0]} 0%, ${stops[1]} 60%, ${stops[2]} 100%)`;
}

/**
 * GlassCard - A frosted glassmorphic card for modern UIs.
 * Accepts children and optional width, height, padding, and backgroundAlpha props.
 * Responsive, accessible, and supports both light/dark themes.
 * Each card gets a unique glass gradient overlay.
 */
const GlassCard: React.FC<GlassCardProps> = ({
  children,
  width,
  height,
  padding,
  backgroundAlpha,
  style,
  className = '',
}) => {
  // Generate a random gradient for this card instance
  const gradient = React.useMemo(() => randomGlassGradient(), []);
  // Allow dynamic background transparency
  const dynamicStyle: React.CSSProperties & { '--glass-gradient': string } = {
    width,
    height,
    padding,
    ...style,
    '--glass-gradient': gradient,
  };
  if (backgroundAlpha !== undefined) {
    dynamicStyle.background = `rgba(255,255,255,${backgroundAlpha})`;
  }
  return (
    <div className={`${styles.glassCard} ${className}`} style={dynamicStyle}>
      {children}
    </div>
  );
};

export default GlassCard; 