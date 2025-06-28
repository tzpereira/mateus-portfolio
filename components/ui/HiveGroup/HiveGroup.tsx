'use client';

// styles
import './index.scss';

// types
import { HiveGroupProps } from './types';

// motion
import { motion, Variants } from 'framer-motion';

// icons
import { iconMap } from '@/assets/icons/iconExporter';

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

export default function HiveGroup({ title, items }: HiveGroupProps) {
  return (
    <motion.div
      className="hive"
      variants={groupVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="hive__group-title">{title}</h3>
      <div className="hive__hexgrid">
        {items.map((item, idx) => {
          const Icon = iconMap[item.icon];
          if (!Icon) return null;

          return (
            <motion.div
              key={item.title}
              className={'hive__hex'}
              style={{ transitionDelay: `${idx * 60}ms` }}
              title={item.description}
            >
              <Icon className="hive__icon" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}