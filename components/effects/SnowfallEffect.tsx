'use client';

import Snowfall from 'react-snowfall';

export function SnowfallEffect() {
  const now = new Date();

  const month = now.getMonth();
  const day = now.getDate();

  const isChristmasPeriod =
    month === 11 && day >= 1 && day <= 25;

  if (!isChristmasPeriod) return null;

  return (
    <Snowfall
    color="#ffffff"
    speed={[0.5, 3]}               // velocidade de queda (mínima e máxima)
    wind={[-0.7, 1]}               // vento horizontal (negativo = esquerda, positivo = direita)
    changeFrequency={0.001}        // frequência de mudança de posição/velocidade para naturalidade
    />
  );
}
