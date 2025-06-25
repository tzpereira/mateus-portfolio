// styles
import './index.scss';

// types
import { WorkCardProps } from './types';

// images
import { imageMap } from '@/assets/image/imageExporter';

export default function WorkCard({ work, isVisible, scrollDirection }: WorkCardProps) {
  return (
    <div
      className={`work-card ${isVisible ? `visible ${scrollDirection || ''}` : ''}`}
    >
      <div className="work-card__text">
        <h2>{work.title}</h2>
        <p>{work.description}</p>
      </div>
      <div className="work-card__image">
        {imageMap[work.icon] && <img src={imageMap[work.icon].src} alt={work.title} />}
      </div>
    </div>
  );
}
