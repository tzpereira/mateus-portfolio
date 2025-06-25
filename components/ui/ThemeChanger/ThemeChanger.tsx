'use client';

// styles
import './index.scss';

// types
import { Theme } from './types';

// react
import React, { useEffect, useState } from 'react';

// icons
import { iconMap } from '@/assets/icons/iconExporter';

const THEME_KEY = 'theme';

const updateTheme = (isDarkEnabled: boolean): void => {
  const theme: Theme = isDarkEnabled ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', isDarkEnabled);
  localStorage.setItem(THEME_KEY, theme);
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
