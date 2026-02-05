import styles from './styles.module.scss';

export default function Falha() {
  return (
    <main className={styles.main}>
      <h1>Falha ao agendar consulta.</h1>
      <p>Tente novamente mais tarde.</p>
    </main>
  );
}
