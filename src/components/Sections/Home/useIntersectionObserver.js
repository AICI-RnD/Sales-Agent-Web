import React, { useEffect, useRef } from 'react';

const useIntersectionObserver = (options) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.section-wrapper');
      elements.forEach(el => observer.observe(el));
    }

    return () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.section-wrapper');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, [options]);

  return containerRef;
};

export default useIntersectionObserver;
