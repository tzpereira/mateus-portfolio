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
  const [isToggled, setIsToggled] = useState(true); // valor default não importa muito
  const [hasMounted, setHasMounted] = useState(false);

  const MoonIcon = iconMap['moon.svg'];
  const SunIcon = iconMap['sun.svg'];

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = storedTheme ? storedTheme === 'dark' : true;
    setIsToggled(prefersDark);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      updateTheme(isToggled);
    }
  }, [isToggled, hasMounted]);

  const toggleState = () => setIsToggled((prev) => !prev);

  if (!hasMounted) return null;

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
