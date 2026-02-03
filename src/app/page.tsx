import Image from "next/image";
import Navbar from "./components/Navbar";
import styles from "./home/styles.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Bem-vindo ao Poke-Vet!</h1>
          <p>Seu centro Pokémon de confiança.</p>
        </div>
      </main>
    </div>
  );
}
