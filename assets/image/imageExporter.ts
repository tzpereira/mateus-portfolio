// Types
import type { StaticImageData } from 'next/image';

// Conteúdo
import ApiBench from './work_image/api-bench-cli.png';
import BitcoinPriceForecasting from './work_image/bitcoin-price-forecasting.png';
import Portfolio from './work_image/portfolio.png';
import GithubIcon from './social_image/social.png';
import LinkedInIcon from './social_image/business.png';
import WhatsappIcon from './social_image/communication.png';

export const imageMap: Record<string, StaticImageData> = {
  'api-bench.png': ApiBench,
  'bitcoin-price-forecasting.png': BitcoinPriceForecasting,
  'portfolio.png': Portfolio,
  'social.png': GithubIcon,
  'business.png': LinkedInIcon,
  'communication.png': WhatsappIcon,
};