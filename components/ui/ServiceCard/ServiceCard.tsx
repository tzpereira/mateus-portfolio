'use client';

// styles
import './index.scss';

// types
import { ServiceCardProps } from './types';

// react
import { useRef } from 'react';

// icons
import { iconMap } from '@/assets/icons/iconExporter';

// motion
import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, icon, fromRight = false }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[icon];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = (x - centerX) / centerX;
    const distY = (y - centerY) / centerY;

    const maxTilt = 8;
    const rotateX = distY * maxTilt;
    const rotateY = distX * -maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, x: fromRight ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: fromRight ? 100 : -100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <h3 className="service-card__title">{title}</h3>
      <div
        className="service-card__content"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="glass-reflection" />
        <p className="service-card__description">{description}</p>
        {IconComponent && (
          <IconComponent
            width={196}
            height={196}
            fill="#9F9F9F"
            className="service-card__icon"
          />
        )}
      </div>
    </motion.div>
  );
}