'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './page.module.scss';

export default function CentroPokemonButton() {
  const pathname = usePathname();
  const isHome = pathname === '/home';

  const [expanded, setExpanded] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      const timer = setTimeout(() => {
        setExpanded(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isHome]);

  return (
    <Link
      href="/home"
      aria-label="Ir para a Home"
      className={`${styles.button} ${
        expanded ? styles.expanded : styles.collapsed
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={styles.icon}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <circle cx="12" cy="12" r="4" />
      </svg>

      <span className={styles.text}>Centro Pokémon</span>
    </Link>
  );
}
