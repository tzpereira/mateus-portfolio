'use client';

// styles
import './index.scss';

// types
import { ServiceCardProps } from './types';

// react
import { useRef, useEffect } from 'react';

// icons
import { iconMap } from '@/assets/icons/iconExporter';

// motion
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exitLeft: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
  exitRight: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

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
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const card = cardRef.current;
    if (!isMobile || !card) return;

    const maxParallax = 10; // px

    const applyParallax = (beta: number, gamma: number) => {
      // beta: -180 (up) to 180 (down), gamma: -90 (left) to 90 (right)
      // Normalizar para [-1, 1]
      const normX = Math.max(-1, Math.min(1, gamma / 45));
      const normY = Math.max(-1, Math.min(1, beta / 45));
      const translateX = normX * maxParallax;
      const translateY = normY * maxParallax;
      card.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta != null && e.gamma != null) {
        applyParallax(e.beta, e.gamma);
      }
    };

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      // iOS 13+
      (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const card = cardRef.current;
    if (!isMobile || !card) return;

    const maxTilt = 50;

    const applyTilt = (beta: number, gamma: number) => {
      const rotateX = (beta / 90) * maxTilt;
      const rotateY = -(gamma / 90) * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta != null && e.gamma != null) {
        applyTilt(e.beta, e.gamma);
      }
    };

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      // iOS 13+
      (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <motion.div
      className="service-card"
      variants={cardVariants}
      initial={fromRight ? 'hiddenRight' : 'hiddenLeft'}
      animate="visible"
      exit={fromRight ? 'exitRight' : 'exitLeft'}
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