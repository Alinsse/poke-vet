import Link from 'next/link';
import styles from './Navbar.module.scss';
import CentroPokemonButton from '../centro-pokemon/page';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
        </Link>
      </div>

      <div className={styles.center}>
        <CentroPokemonButton />
      </div>

      <div className={styles.right}>
        <Link href="/quem-somos">Quem Somos</Link>
        <Link href="/agendar-consulta">Agendar Consulta</Link>
      </div>
    </nav>
  );
}
