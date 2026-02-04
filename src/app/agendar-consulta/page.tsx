'use client';
import styles from './styles.module.scss';
import FormAgendamento from './Form/form'; // Importa o componente separado

export default function AgendarConsulta() {
  return (
    <main className={styles.main}>
      <FormAgendamento /> {/* Aqui usamos o formulário completo */}
    </main>
  );
}
