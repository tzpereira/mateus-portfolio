'use client';

import './index.scss';
import { iconMap } from '@/assets/icons/iconExporter';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="service-card">
      <h3 className="service-card__title">{title}</h3>
      <div className="service-card__content">
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
    </div>
  );
}
