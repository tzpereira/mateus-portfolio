import Ai from './service_icons/ai.svg';
import Binary from './service_icons/binary.svg';
import CardinalPoints from './service_icons/cardinal-points.svg';
import Support from './service_icons/support.svg'

export const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'ai.svg': Ai,
  'binary.svg': Binary,
  'cardinal-points.svg': CardinalPoints,
  'support.svg': Support,
};