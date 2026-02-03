'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function AgendarConsulta() {
  const [datas, setDatas] = useState<string[]>([]);
  const [horarios, setHorarios] = useState<string[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/scheduling/date')
      .then(res => res.json())
      .then(setDatas)
      .catch(() => setErro('Erro ao carregar datas'));
  }, []);

  const handleDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetch(`http://localhost:3000/api/scheduling/time?date=${e.target.value}`)
      .then(res => res.json())
      .then(setHorarios)
      .catch(() => setErro('Erro ao carregar horários'));
  };

  return (
    <main className={styles.main}>
      <h1>Agendar Consulta</h1>
      {erro && <p className={styles.erro}>{erro}</p>}
      <label>
        Data:
        <select onChange={handleDataChange}>
          <option>Selecione</option>
          {datas.map(data => <option key={data}>{data}</option>)}
        </select>
      </label>
      <label>
        Horário:
        <select>
          <option>Selecione</option>
          {horarios.map(h => <option key={h}>{h}</option>)}
        </select>
      </label>
    </main>
  );
}
