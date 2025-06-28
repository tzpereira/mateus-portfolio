import { useEffect, useState } from 'react';

/**
 * Detecta se uma seção com determinada className está visível na viewport.
 * 
 * @param className - Nome da classe da seção (sem ponto).
 * @param threshold - Percentual de visibilidade necessário (0 a 1). Padrão: 1.
 * @returns `true` se a seção estiver visível no viewport com base no threshold.
 */
export default function useSectionVisibility(className: string, threshold: number = 1): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.querySelector(`.${className}`);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      { threshold: [threshold] }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [className, threshold]);

  return isVisible;
}
