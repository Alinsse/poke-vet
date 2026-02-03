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
  const segments = pathname.split('/').filter(Boolean);

  const labels: Record<string, string> = {
    home: 'Home',
    'agendar-consulta': 'Agendar Consulta',
    'quem-somos': 'Quem Somos',
    sucesso: 'Sucesso',
    falha: 'Falha',
  };

  // Always start from Home
  const parts = [{ href: '/home', label: 'Home' }].concat(
    segments.map((seg, i) => ({
      href: '/' + segments.slice(0, i + 1).join('/'),
      label: labels[seg] || prettify(seg),
    }))
  );

  return (
    <header className={styles.header} aria-label="Página cabeçalho">
      <nav className={styles.breadcrumbs}>
        {parts.map((p, idx) => {
          const isLast = idx === parts.length - 1;
          return (
            <span key={p.href}>
              {!isLast ? (
                <Link href={p.href} className={styles.breadcrumbLink}>
                  {p.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent}>{p.label}</span>
              )}
              {idx < parts.length - 1 && <span className={styles.separator}>›</span>}
            </span>
          );
        })}
      </nav>
    </header>
  );
}
