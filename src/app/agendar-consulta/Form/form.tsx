'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Modal from '../modal/page';
import { useSchedulingDates } from '@/hooks/useSchedulingDates';
import { useSchedulingTimes } from '@/hooks/useSchedulingTimes';

interface Pokemon { id: number; nome: string; }
interface ApiItem { name: string; }

export default function FormAgendamento() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [regioes, setRegioes] = useState<ApiItem[]>([]);
  const [regiao, setRegiao] = useState('');
  const [cidades, setCidades] = useState<ApiItem[]>([]);
  const [cidade, setCidade] = useState('');
  const [pokemonOptions, setPokemonOptions] = useState<ApiItem[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([{ id: 1, nome: '' }]);
  const [modalOpen, setModalOpen] = useState(false);

  const { dates } = useSchedulingDates();
  const { times, fetchTimes } = useSchedulingTimes();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const valorUnitario = 70;
  const taxaGeneracional = 2.1;
  const subtotal = pokemons.length * valorUnitario;
  const total = subtotal + taxaGeneracional;

  // Carregar Regiões da PokéAPI
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/region')
      .then(res => res.json())
      .then(data => setRegioes(data.results))
      .catch(() => alert('Erro ao carregar regiões.'));
  }, []);

  // Carregar Cidades
  useEffect(() => {
    if (!regiao) return;
    fetch(`https://pokeapi.co/api/v2/region/${regiao}`)
      .then(res => res.json())
      .then(data => setCidades(data.locations))
      .catch(() => alert('Erro ao carregar cidades.'));
  }, [regiao]);

  // Carregar Pokémons
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => setPokemonOptions(data.results))
      .catch(() => alert('Erro ao carregar pokémons.'));
  }, []);

  // Atualizar horários quando a data muda
  useEffect(() => {
    if (selectedDate) fetchTimes(selectedDate);
    else setSelectedTime('');
  }, [selectedDate, fetchTimes]);

  const adicionarPokemon = () => {
    if (pokemons.length >= 6) return;
    setPokemons([...pokemons, { id: pokemons.length + 1, nome: '' }]);
  };
  const removerPokemon = (id: number) => setPokemons(pokemons.filter(p => p.id !== id));
  const atualizarPokemon = (id: number, nome: string) =>
    setPokemons(pokemons.map(p => (p.id === id ? { ...p, nome } : p)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Selecione a data e o horário!');
      return;
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setNome(''); setSobrenome('');
    setRegiao(''); setCidade('');
    setPokemons([{ id: 1, nome: '' }]);
    setSelectedDate(''); setSelectedTime('');
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Preencha o formulário abaixo para agendar sua consulta</h1>

        {/* Nome / Sobrenome */}
        <div className={styles.inputGroup}>
          <label>Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div className={styles.inputGroup}>
          <label>Sobrenome</label>
          <input value={sobrenome} onChange={e => setSobrenome(e.target.value)} required />
        </div>

        {/* Região / Cidade */}
        <div className={styles.inputGroup}>
          <label>Região</label>
          <select value={regiao} onChange={e => { setRegiao(e.target.value); setCidade(''); }} required>
            <option value="">Selecione</option>
            {regioes.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Cidade</label>
          <select value={cidade} onChange={e => setCidade(e.target.value)} required disabled={!regiao}>
            <option value="">Selecione</option>
            {cidades.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        {/* Data / Hora */}
        <div className={styles.inputGroup}>
          <label>Data</label>
          <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required>
            <option value="">Selecione</option>
            {dates.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Horário</label>
          <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required disabled={!selectedDate}>
            <option value="">Selecione</option>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Pokémon */}
        <div className={styles.pokemons}>
          <p>Cadastre seu time (até 6 Pokémons)</p>
          {pokemons.map((p, i) => (
            <div key={p.id} className={styles.pokemonRow}>
              <label>Pokémon {i+1}</label>
              <select value={p.nome} onChange={e => atualizarPokemon(p.id, e.target.value)} required>
                <option value="">Selecione</option>
                {pokemonOptions.map(pk => <option key={pk.name} value={pk.name}>{pk.name}</option>)}
              </select>
              {pokemons.length > 1 && <button type="button" onClick={() => removerPokemon(p.id)}>Remover</button>}
            </div>
          ))}
          {pokemons.length < 6 && <button type="button" onClick={adicionarPokemon}>Adicionar Pokémon</button>}
        </div>

        {/* Resumo */}
        <div className={styles.resumo}>
          <p>Pokémons: {pokemons.length}</p>
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Taxa: R$ {taxaGeneracional.toFixed(2)}</p>
          <p>Total: R$ {total.toFixed(2)}</p>
        </div>

        <button type="submit">Concluir Agendamento</button>
      </form>

      <Modal
        isOpen={modalOpen}
        nome={nome}
        sobrenome={sobrenome}
        regiao={regiao}
        cidade={cidade}
        pokemons={pokemons.map(p => p.nome)}
        date={selectedDate}
        time={selectedTime}
        onClose={() => { setModalOpen(false); resetForm(); }}
      />
    </>
  );
}
