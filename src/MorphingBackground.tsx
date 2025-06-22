import React from 'react';
import styles from './MorphingBackground.module.scss';

const SVG_GOO = `
  <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
`;

const MorphingBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Inject SVG goo filter into the DOM (once)
  React.useEffect(() => {
    if (!document.getElementById('goo-svg-filter')) {
      const div = document.createElement('div');
      div.id = 'goo-svg-filter';
      div.style.position = 'absolute';
      div.style.width = '0';
      div.style.height = '0';
      div.innerHTML = SVG_GOO;
      document.body.appendChild(div);
    }
  }, []);

  // Scroll-based blue overlay opacity
  const bgRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / (docHeight || 1), 1);
      // Opacity from 0.1 to 1 as you scroll
      const overlayOpacity = 0.18 + 0.5 * progress;
      if (bgRef.current) {
        bgRef.current.style.setProperty('--blue-overlay-opacity', overlayOpacity.toString());
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.morphingBg} ref={bgRef}>
      {/* Gradients and blobs */}
      <div className={styles.gradientsContainer}>
        <div className={styles.g1} />
        <div className={styles.g2} />
        <div className={styles.g3} />
        <div className={styles.g4} />
        <div className={styles.g5} />
      </div>
      {/* Content wrapper */}
      <div className={styles.textContainer}>{children}</div>
    </div>
  );
};

export default MorphingBackground; 