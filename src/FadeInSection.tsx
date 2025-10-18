import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = '', id }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
      },
      { threshold: 0.15 }
    );
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section${isVisible ? ' is-visible' : ''} ${className}`}
      id={id}
    >
      {children}
    </div>
  );
};

export default FadeInSection; 