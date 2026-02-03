import Image from 'next/image';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.heroImage}>
        <Image src="/pokemon-hero.jpg" alt="Pokémon hero" fill priority className={styles.image} />
        <div className={styles.overlay}>
          <h1>Cuidamos bem do seu pokémon,</h1>
          <p>para ele cuidar bem de você.</p>
        </div>
      </div>
    </main>
  );
}
