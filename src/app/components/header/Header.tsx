'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

function prettify(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Header() {
  const pathname = usePathname() || '/';

  if (pathname === '/' || pathname === '/home') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  const labels: Record<string, string> = {
    home: 'Home',
    'agendar-consulta': 'Agendar Consulta',
    'quem-somos': 'Quem Somos',
  };

  const breadcrumbParts = [{ href: '/home', label: 'Home' }].concat(
    segments.map((seg, i) => ({
      href: '/' + segments.slice(0, i + 1).join('/'),
      label: labels[seg] || prettify(seg),
    }))
  );

  let pageTitle = '';
  let pageSubtitle = '';

  if (pathname.includes('quem-somos')) {
    pageTitle = 'Quem Somos';
    pageSubtitle = 'A maior rede de tratamento Pokémon';
  } else if (pathname.includes('agendar-consulta')) {
    pageTitle = 'Agendar Consulta';
    pageSubtitle = 'Recupere seus pokémons em 5 segundos';
  }

  return (
    <header className={`${styles.header} ${styles.responsive}`} aria-label="Cabeçalho da página">
      <nav className={styles.breadcrumbs}>
        {breadcrumbParts.map((p, idx) => {
          const isLast = idx === breadcrumbParts.length - 1;
          return (
            <span key={p.href}>
              {!isLast ? (
                <Link href={p.href} className={styles.breadcrumbLink}>
                  {p.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent}>{p.label}</span>
              )}
              {idx < breadcrumbParts.length - 1 && (
                <span className={styles.separator}>›</span>
              )}
            </span>
          );
        })}
      </nav>

      <div className={styles.pageTitle}>{pageTitle}</div>
      <div className={styles.pageSubtitle}>{pageSubtitle}</div>
    </header>
  );
}
