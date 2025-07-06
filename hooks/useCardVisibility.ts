import { useEffect, useState, RefObject } from 'react';

export function useCardVisibility(ref: RefObject<Element>, rootMargin = '0px', threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // anima só uma vez
        }
      },
      { root: null, rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return isVisible;
}
