'use client';

// styles
import './index.scss';

// types
import { HiveGroupProps } from './types';

// icons
import { iconMap } from '@/assets/icons/iconExporter';

// react
import React from 'react';

export default function HiveGroup({ title, items, visible = false }: HiveGroupProps) {
  return (
    <div className="hive">
      <h3 className="hive__group-title">{title}</h3>
      <div className="hive__hexgrid">
        {items.map((item, idx) => {
          const Icon = iconMap[item.icon];
          if (!Icon) return null;

          return (
            <div
              key={item.title}
              className={`hive__hex ${visible ? 'animate' : ''}`}
              style={{ transitionDelay: `${idx * 60}ms` }}
              title={item.description}
            >
              <Icon className="hive__icon" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
