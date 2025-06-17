'use client';

import React, { useEffect, useState } from 'react';
import { iconMap } from '@/assets/icons/iconExporter';
import './index.scss';

const THEME_KEY = 'theme';

const updateTheme = (isDarkEnabled: boolean) => {
  document.documentElement.classList.toggle('dark', isDarkEnabled);
  localStorage.setItem(THEME_KEY, isDarkEnabled ? 'dark' : 'light');
};

export default function ThemeChanger() {
  const [isToggled, setIsToggled] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(THEME_KEY);
      return storedTheme ? storedTheme === 'dark' : true;
    }
    return true;
  });

  const MoonIcon = iconMap['moon.svg'];
  const SunIcon = iconMap['sun.svg'];

  useEffect(() => {
    updateTheme(isToggled);
  }, [isToggled]);

  const toggleState = () => setIsToggled((prev) => !prev);

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div className={`toggle ${isToggled ? 'disabled' : 'enabled'}`}>
        <div className="icons">
          <SunIcon />
          <MoonIcon />
        </div>
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={isToggled}
          onChange={toggleState}
          readOnly
        />
      </div>
    </label>
  );
}
