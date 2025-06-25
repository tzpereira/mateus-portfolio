'use client';

// styles
import './index.scss';

// types
import { WorkEntity, WorkProps } from './types';

// i18n
import initTranslations from '@/app/i18n';

// react
import { useEffect, useRef, useState, useCallback } from 'react';

// components
import { WorkCard } from '@/components/ui/WorkCard';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

const CARD_HEIGHT_PERCENT = 60;
const SWIPE_THRESHOLD = 30;

export default function Work({ locale }: WorkProps) {
  const [sectionTitle, setSectionTitle] = useState('');
  const [works, setWorks] = useState<WorkEntity[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const touchStartY = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true); // Bloqueia scroll do body enquanto dentro da seção
  const [isAnimating, setIsAnimating] = useState(false); // Impede múltiplos scrolls enquanto anima
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  const activeIndexRef = useRef(0);
  const allowedScrollDirection = useRef<'up' | 'down' | null>(null); // Define direção do scroll permitido

  // Atualiza o índice ativo e mantém referência sincronizada
  const updateIndex = useCallback((index: number) => {
    setActiveIndex(index);
    activeIndexRef.current = index;
  }, []);

  // Inicializa título da seção com base no idioma
  useEffect(() => {
    initTranslations(locale, ['work']).then(({ t }) => {
      const data = t('works', { returnObjects: true }) as {
        title: string;
        description: string;
        icon: string;
      }[];
      setWorks(data);
      setSectionTitle(t('title'));
    });
  }, [locale]);

  // Controla o scroll do body (ativa ou desativa com base no bloqueio)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isLocked ? 'hidden' : previousOverflow;
    return () => { document.body.style.overflow = previousOverflow };
  }, [isLocked]);

  // Faz scroll animado para o índice desejado
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

  // Lida com evento de scroll (wheel ou teclado)
  const handleUserScroll = useCallback(
    (dir: 'up' | 'down') => {
      if (isAnimating) return;

      const CARD_COUNT = works.length;

      const current = activeIndexRef.current;
      const nextIndex = dir === 'down' ? current + 1 : current - 1;

      // Se chegou no limite da seção, desbloqueia o body para sair
      if (nextIndex < 0 || nextIndex >= CARD_COUNT) {
        if (current === 0 && dir === 'up') {
          setIsLocked(false);
          allowedScrollDirection.current = null;
        }
        if (current === CARD_COUNT - 1 && dir === 'down') {
          setIsLocked(false);
          allowedScrollDirection.current = null;
        }
        return;
      }

      // Define a direção do fluxo na primeira interação
      if (allowedScrollDirection.current === null) {
        allowedScrollDirection.current = dir;
      }

      // Aguarda 100ms para iniciar o scroll animado
      setTimeout(() => {
        setScrollDirection(dir);
        animateScrollTo(nextIndex);

        const atTopGoingUp = current === 0 && dir === 'up';
        const atBottomGoingDown = current === CARD_COUNT - 1 && dir === 'down';

        if (
          (atTopGoingUp && allowedScrollDirection.current === 'up') ||
          (atBottomGoingDown && allowedScrollDirection.current === 'down')
        ) {
          setIsLocked(false);
          allowedScrollDirection.current = null;
        } else {
          setIsLocked(true);
        }
      }, 100);
    },
    [isAnimating, animateScrollTo, activeIndex, works]
  );

  // Observa a seção para saber quando deve bloquear/desbloquear o scroll externo
  useEffect(() => {
    const section = document.querySelector('.work');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          setIsLocked(true); // Entrou na seção
          allowedScrollDirection.current = null;
        } else if (!entry.isIntersecting) {
          setIsLocked(false); // Saiu da seção
          allowedScrollDirection.current = null;
        }
      },
      { threshold: [1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Adiciona eventos de scroll do mouse e do teclado
  useEffect(() => {
    if (!isLocked) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      handleUserScroll(direction);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
        e.preventDefault();
        handleUserScroll('down');
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handleUserScroll('up');
      }
    };

    // TOQUE: INÍCIO DO TOQUE
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    // TOQUE: FIM DO TOQUE
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        const direction = deltaY > 0 ? 'down' : 'up';
        handleUserScroll(direction);
      }

      touchStartY.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleUserScroll, isLocked]);

  return (
    <section className="section work">
      {works.length > 0 ? (
        <>
          <div className="work__title-container">
            <h2 className="work__title">{sectionTitle}</h2>
          </div>
          <div className="work__frame">
            <ScrollProgress
              total={works.length}
              currentIndex={activeIndex}
              onDotClick={animateScrollTo}
            />
            <div className="scroll-container" ref={containerRef}>
              {works.map((work, idx) => (
                <WorkCard
                  key={idx}
                  work={work}
                  isVisible={idx === activeIndex}
                  scrollDirection={scrollDirection}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}