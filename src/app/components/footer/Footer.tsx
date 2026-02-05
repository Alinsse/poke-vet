import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} Poke-Vet — Cuidamos do seu Pokémon</p>
      </div>
    </footer>
  );
}
