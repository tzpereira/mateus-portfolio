'use client';

// styles
import './index.scss';

// types
import { ServiceCardProps } from './types';

// react
import { useRef, useEffect } from 'react';
import { useCardVisibility } from '@/hooks/useCardVisibility';

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


export default function ServiceCard({ icon, title, description, fromRight }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[icon];
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  // Corrige o tipo do ref para o hook
  const isCardVisible = useCardVisibility(cardRef as React.RefObject<Element>, '0px', 0.2);


  // Mouse parallax (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
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
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  // Mobile parallax (apenas 2D translate, não tilt)
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

    let permissionGranted = false;
    let orientationHandler: ((e: DeviceOrientationEvent) => void) | null = null;

    // Handler para ativar o giroscópio via botão (Services)
    function enableGyro() {
      if (permissionGranted) return;
      permissionGranted = true;
      orientationHandler = (e: DeviceOrientationEvent) => {
        if (e.beta != null && e.gamma != null) {
          applyParallax(e.beta, e.gamma);
        }
      };
      window.addEventListener('deviceorientation', orientationHandler, true);
    }

    // Escuta evento customizado disparado pelo botão de permissão
    window.addEventListener('enable-gyro', enableGyro);

    // Se não for iOS, ativa direto
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      !((DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission)
    ) {
      enableGyro();
    }

    return () => {
      window.removeEventListener('enable-gyro', enableGyro);
      if (orientationHandler) {
        window.removeEventListener('deviceorientation', orientationHandler, true);
      }
    };
  }, []);

  return (
    <motion.div
      className="service-card"
      ref={cardRef}
      variants={cardVariants}
      initial={fromRight ? 'hiddenRight' : 'hiddenLeft'}
      animate={isMobile ? (isCardVisible ? 'visible' : (fromRight ? 'hiddenRight' : 'hiddenLeft')) : 'visible'}
      exit={fromRight ? 'exitRight' : 'exitLeft'}
    >
      <h3 className="service-card__title">{title}</h3>
      <div
        className="service-card__content"
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