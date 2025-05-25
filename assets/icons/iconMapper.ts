import Ai from './ai.svg';
import Binary from './binary.svg';
import CardinalPoints from './cardinal-points.svg';
import Support from './support.svg'

export const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'ai.svg': Ai,
  'binary.svg': Binary,
  'cardinal-points.svg': CardinalPoints,
  'support.svg': Support,
};