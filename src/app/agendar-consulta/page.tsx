'use client';
import styles from './styles.module.scss';
import FormAgendamento from './Form/form'; 

export default function AgendarConsulta() {
  return (
    <main className={styles.main}>
      <FormAgendamento />
    </main>
  );
}
