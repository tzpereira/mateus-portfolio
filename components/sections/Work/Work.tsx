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
import { WorksCard } from '@/components/ui/WorksCard';

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -80, transition: { duration: 0.1, ease: 'easeIn' } },
};

export default function Work({ locale }: WorkProps) {

  const [sectionTitle, setSectionTitle] = useState("");
  const [works, setWorks] = useState<WorkEntity[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    initTranslations(locale, ["work"]).then(({ t }) => {
      setWorks(t("works", { returnObjects: true }) as WorkEntity[]);
      setSectionTitle(t("title"));
    });
  }, [locale]);

  return (
    <section id="work" className="section work">
      {works.length > 0 && (
        <>
          <motion.div
            className="work__title-container"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={titleVariants}
          >
            <h2 className="work__title">{sectionTitle}</h2>
          </motion.div>

          <div className="work__frame">
            <div className="work__cards">
              <WorksCard
                work={works[activeIndex]}
                isCardVisible={true}
                isVisible={true}
                scrollDirection={null}
              />
            </div>
            <div className="work__arrows">
              <button
                className="work__arrow"
                onClick={() => setActiveIndex(Math.max(activeIndex - 1, 0))}
                disabled={activeIndex === 0}
                aria-label="Anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="work__arrow-icon"
                  width="56"
                  height="32"
                >
                  <line x1="5" y1="12" x2="22" y2="12" />
                  <polyline points="12 5 5 12 12 19" />
                </svg>
              </button>
              <span className="work__info">
                {activeIndex + 1} / {works.length}
              </span>
              <button
                className="work__arrow"
                onClick={() => setActiveIndex(Math.min(activeIndex + 1, works.length - 1))}
                disabled={activeIndex === works.length - 1}
                aria-label="Próximo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  className="work__arrow-icon"
                  width="56"
                  height="32"
                >
                  <line x1="2" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}