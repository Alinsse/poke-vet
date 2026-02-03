'use client';

import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <Link href="/home">Home</Link>
      <Link href="/quem-somos">Quem Somos</Link>
      <Link href="/agendar-consulta">Agendar Consulta</Link>
    </nav>
  );
}
