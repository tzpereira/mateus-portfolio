'use client';

// styles
import './index.scss';

// types
import { ClientLoadingWrapperProps } from './types';

// react
import React, { useState, useEffect } from 'react';

export default function ClientLoadingWrapper({ children }: ClientLoadingWrapperProps) {
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
    }, 20);

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
