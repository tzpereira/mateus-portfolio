'use client';

// styles
import './index.scss';

//types
import { BurgerMenuProps } from './types';

// react
import { useState, useEffect } from 'react';

export default function BurgerMenu({ menuItems }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      <button
        className={`burger-menu__button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`burger-menu__overlay ${isOpen ? 'open' : ''}`}
        onClick={closeMenu}
      >
        <ul className="burger-menu__list" onClick={e => e.stopPropagation()}>
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => { item.onClick(); closeMenu(); }}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
