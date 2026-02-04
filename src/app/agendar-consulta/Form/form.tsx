'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Modal from '../modal/page';

interface Pokemon {
  id: number;
  nome: string;
}

interface ApiItem {
  name: string;
}

export default function FormAgendamento() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');

  /* REGIÃO / CIDADE (PokéAPI) */
  const [regioes, setRegioes] = useState<ApiItem[]>([]);
  const [regiao, setRegiao] = useState('');
  const [cidades, setCidades] = useState<ApiItem[]>([]);
  const [cidade, setCidade] = useState('');

  /* POKÉMONS */
  const [pokemonOptions, setPokemonOptions] = useState<ApiItem[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([{ id: 1, nome: '' }]);

  /* DATA / HORÁRIO */
  // const [datas, setDatas] = useState<string[]>([]);
  // const [horarios, setHorarios] = useState<string[]>([]);
  // const [dataAtendimento, setDataAtendimento] = useState('');
  // const [horarioAtendimento, setHorarioAtendimento] = useState('');

  /* MODAL */
  const [modalOpen, setModalOpen] = useState(false);

  /* VALORES */
  const valorUnitario = 70;
  const taxaGeneracional = 2.1;
  const subtotal = pokemons.length * valorUnitario;
  const total = subtotal + taxaGeneracional;

  /* ========================= USEEFFECTS ========================= */
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/region')
      .then(res => res.json())
      .then(data => setRegioes(data.results))
      .catch(() => alert('Erro ao carregar regiões.'));
  }, []);

  useEffect(() => {
    if (!regiao) return;
    fetch(`https://pokeapi.co/api/v2/region/${regiao}`)
      .then(res => res.json())
      .then(data => setCidades(data.locations))
      .catch(() => alert('Erro ao carregar cidades.'));
  }, [regiao]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => setPokemonOptions(data.results))
      .catch(() => alert('Erro ao carregar pokémons.'));
  }, []);

  /* ========================= FUNÇÕES POKÉMON ========================= */
  const adicionarPokemon = () => {
    if (pokemons.length >= 6) return;
    setPokemons([...pokemons, { id: pokemons.length + 1, nome: '' }]);
  };

  const removerPokemon = (id: number) => {
    setPokemons(pokemons.filter(p => p.id !== id));
  };

  const atualizarPokemon = (id: number, nome: string) => {
    setPokemons(pokemons.map(p => (p.id === id ? { ...p, nome } : p)));
  };

  /* ========================= SUBMIT ========================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  /* ========================= RESET FORM ========================= */
  const resetForm = () => {
    setNome('');
    setSobrenome('');
    setRegiao('');
    setCidade('');
    setPokemons([{ id: 1, nome: '' }]);
    // setDataAtendimento('');
    // setHorarioAtendimento('');
  };

  /* ========================= RENDER ========================= */
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Agendar Consulta</h1>

        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={e => setSobrenome(e.target.value)}
          required
        />

        {/* REGIÃO */}
        <select
          value={regiao}
          onChange={e => {
            setRegiao(e.target.value);
            setCidade('');
          }}
          required
        >
          <option value="">Selecione a região</option>
          {regioes.map(r => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        {/* CIDADE */}
        <select
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          required
          disabled={!regiao}
        >
          <option value="">Selecione a cidade</option>
          {cidades.map(c => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* POKÉMONS */}
        <div className={styles.pokemons}>
          <p>Time Pokémon (até 6):</p>
          {pokemons.map(p => (
            <div key={p.id}>
              <select
                value={p.nome}
                onChange={e => atualizarPokemon(p.id, e.target.value)}
                required
              >
                <option value="">Selecione o Pokémon</option>
                {pokemonOptions.map(pk => (
                  <option key={pk.name} value={pk.name}>
                    {pk.name}
                  </option>
                ))}
              </select>
              {pokemons.length > 1 && (
                <button type="button" onClick={() => removerPokemon(p.id)}>
                  Remover
                </button>
              )}
            </div>
          ))}
          {pokemons.length < 6 && (
            <button type="button" onClick={adicionarPokemon}>
              Adicionar Pokémon
            </button>
          )}
        </div>

        {/* DATA / HORÁRIO */}
        {/*
        <select
          value={dataAtendimento}
          onChange={e => {
            setDataAtendimento(e.target.value);
            setHorarioAtendimento('');
          }}
          required
        >
          <option value="">Selecione a data</option>
          {datas.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={horarioAtendimento}
          onChange={e => setHorarioAtendimento(e.target.value)}
          required
          disabled={!dataAtendimento}
        >
          <option value="">Selecione o horário</option>
          {horarios.map(h => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        */}

        {/* RESUMO */}
        <div className={styles.resumo}>
          <p>Pokémons: {pokemons.length}</p>
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Taxa: R$ {taxaGeneracional.toFixed(2)}</p>
          <p>Total: R$ {total.toFixed(2)}</p>
        </div>

        <button type="submit">Concluir Agendamento</button>
      </form>

      {/* ========================= MODAL ========================= */}
      <Modal
        isOpen={modalOpen}
        nome={nome}
        sobrenome={sobrenome}
        regiao={regiao}
        cidade={cidade}
        pokemons={pokemons.map(p => p.nome)}
        date="xx/xx/xx" // Placeholder
        time="00h00"   // Placeholder
        onClose={() => {
          setModalOpen(false);
          resetForm();
        }}
      />
    </>
  );
}
