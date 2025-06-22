'use client';

import React, { useState, useEffect } from 'react';
import './index.scss';

export default function ClientLoadingWrapper({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="loading-counter-overlay">
      <div className="loading-counter">{count}%</div>
    </div>
  );
}
