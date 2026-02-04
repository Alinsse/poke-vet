'use client';
import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  nome: string;
  sobrenome: string;
  regiao: string;
  cidade: string;
  pokemons: string[];
  date: string;
  time: string;
}

export default function Modal({
  isOpen,
  onClose,
  nome,
  sobrenome,
  regiao,
  cidade,
  pokemons,
  date,
  time,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles.success}`}>
        <h2>Consulta Agendada 🎉</h2>
        <p>
          Olá <strong>{nome} {sobrenome}</strong>, seu agendamento em <strong>{regiao}</strong> - <strong>{cidade}</strong> para dia <strong>{date}</strong> às <strong>{time}</strong> com <strong>{pokemons.length} Pokémon(s)</strong> foi realizado com sucesso!
        </p>
        <ul>
          {pokemons.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
        <button onClick={onClose}>Fazer novo agendamento</button>
      </div>
    </div>
  );
}
