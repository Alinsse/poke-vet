'use client';

import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <div className={styles.navRight}>
        <Link href="/quem-somos" className={styles.link}>
          Quem Somos
        </Link>
        <Link href="/agendar-consulta" className={styles.link}>
          Agendar Consulta
        </Link>
      </div>
    </nav>
  );
}
