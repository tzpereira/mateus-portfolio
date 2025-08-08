// Types
import type { StaticImageData } from 'next/image';

// Conteúdo
import ApiBench from './work_image/api-bench-cli.png';
import BitcoinPriceForecasting from './work_image/bitcoin-price-forecasting.png';

export const imageMap: Record<string, StaticImageData> = {
  'api-bench.png': ApiBench,
  'bitcoin-price-forecasting.png': BitcoinPriceForecasting,
};