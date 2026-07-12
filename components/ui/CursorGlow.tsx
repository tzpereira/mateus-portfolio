'use client';
import { useEffect } from 'react';

const CARD_SELECTOR = '.ai-board';

// Feeds cursor coordinates to whichever card is hovered, powering the
// spotlight gradient drawn by the cards' ::after layer. Renders nothing.
export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const handler = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(CARD_SELECTOR) as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    window.addEventListener('pointermove', handler, { passive: true });
    return () => window.removeEventListener('pointermove', handler);
  }, []);

  return null;
}
