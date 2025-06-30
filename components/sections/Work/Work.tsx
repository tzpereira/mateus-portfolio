'use client';

// styles
import './index.scss';

// types
import { WorkEntity, WorkProps } from './types';

// i18n
import initTranslations from '@/app/i18n';

// react
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// motion
import { motion, Variants } from 'framer-motion';

// components
import { WorkCard } from '@/components/ui/WorkCard';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

// hooks
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const CARD_HEIGHT_PERCENT = 60;
const SWIPE_THRESHOLD = 30;

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -80, transition: { duration: 0.1, ease: 'easeIn' } },
};

export default function Work({ locale }: WorkProps) {
  const [sectionTitle, setSectionTitle] = useState('');
  const [works, setWorks] = useState<WorkEntity[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const allowedScrollDirection = useRef<'up' | 'down' | null>(null);

  const cardCount = useMemo(() => works.length, [works]);
  const isVisible = useSectionVisibility('work', 0.95);

  const updateIndex = useCallback((index: number) => {
    setActiveIndex(index);
    activeIndexRef.current = index;
  }, []);

  const animateScrollTo = useCallback((index: number) => {
    if (!containerRef.current) return;
    setIsAnimating(true);
    updateIndex(index);
    containerRef.current.classList.add('is-scrolling');
    containerRef.current.style.transform = `translateY(-${index * CARD_HEIGHT_PERCENT}vh)`;

    setTimeout(() => {
      setIsAnimating(false);
      containerRef.current?.classList.remove('is-scrolling');
    }, 500);
  }, [updateIndex]);

  const handleUserScroll = useCallback((dir: 'up' | 'down') => {
    if (isAnimating) return;

    const current = activeIndexRef.current;
    const nextIndex = dir === 'down' ? current + 1 : current - 1;

    const outOfBounds = nextIndex < 0 || nextIndex >= cardCount;

    if (outOfBounds) {
      if ((current === 0 && dir === 'up') || (current === cardCount - 1 && dir === 'down')) {
        setIsLocked(false);
        allowedScrollDirection.current = null;
      }
      return;
    }

    if (allowedScrollDirection.current === null) {
      allowedScrollDirection.current = dir;
    }

    setTimeout(() => {
      setScrollDirection(dir);
      animateScrollTo(nextIndex);

      const atTop = current === 0 && dir === 'up';
      const atBottom = current === cardCount - 1 && dir === 'down';

      if (
        (atTop && allowedScrollDirection.current === 'up') ||
        (atBottom && allowedScrollDirection.current === 'down')
      ) {
        setIsLocked(false);
        allowedScrollDirection.current = null;
      } else {
        setIsLocked(true);
      }
    }, 100);
  }, [isAnimating, animateScrollTo, cardCount]);

  useEffect(() => {
    initTranslations(locale, ['work']).then(({ t }) => {
      setWorks(t('works', { returnObjects: true }) as WorkEntity[]);
      setSectionTitle(t('title'));
    });
  }, [locale]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isLocked ? 'hidden' : prev;
    return () => { document.body.style.overflow = prev; };
  }, [isLocked]);

  useEffect(() => {
    setIsLocked(isVisible);
    allowedScrollDirection.current = null;
  }, [isVisible]);

  useEffect(() => {
    if (!isLocked) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleUserScroll(e.deltaY > 0 ? 'down' : 'up');
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const keysDown = ['ArrowDown', 'PageDown', ' ', 'Spacebar'];
      const keysUp = ['ArrowUp', 'PageUp'];
      if (keysDown.includes(e.key)) {
        e.preventDefault();
        handleUserScroll('down');
      } else if (keysUp.includes(e.key)) {
        e.preventDefault();
        handleUserScroll('up');
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        handleUserScroll(deltaY > 0 ? 'down' : 'up');
      }
      touchStartY.current = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleUserScroll, isLocked]);

  return (
    <section id="work" className="section work">
      {works.length > 0 && (
        <>
          <motion.div
            className="work__title-container"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            exit="exit"
            variants={titleVariants}
          >
            <h2 className="work__title">{sectionTitle}</h2>
          </motion.div>

          <div className="work__frame">
            <ScrollProgress
              total={cardCount}
              currentIndex={activeIndex}
              onDotClick={animateScrollTo}
              isVisible={isVisible}
            />
            <div className="scroll-container" ref={containerRef}>
              {works.map((work, idx) => (
                <WorkCard
                  key={idx}
                  work={work}
                  isCardVisible={idx === activeIndex}
                  isVisible={isVisible}
                  scrollDirection={scrollDirection}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}