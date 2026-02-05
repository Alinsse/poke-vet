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
  const [regioes, setRegioes] = useState<ApiItem[]>([]);
  const [regiao, setRegiao] = useState('');
  const [cidades, setCidades] = useState<ApiItem[]>([]);
  const [cidade, setCidade] = useState('');
  const [pokemonOptions, setPokemonOptions] = useState<ApiItem[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([{ id: 1, nome: '' }]);
  const [modalOpen, setModalOpen] = useState(false);

  const valorUnitario = 70;
  const taxaGeneracional = 2.1;
  const subtotal = pokemons.length * valorUnitario;
  const total = subtotal + taxaGeneracional;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const resetForm = () => {
    setNome('');
    setSobrenome('');
    setRegiao('');
    setCidade('');
    setPokemons([{ id: 1, nome: '' }]);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Preencha o formulário abaixo para agendar sua consulta</h1>

        {/* NOME */}
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>

        {/* SOBRENOME */}
        <div className={styles.inputGroup}>
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            id="sobrenome"
            placeholder="Digite seu sobrenome"
            value={sobrenome}
            onChange={e => setSobrenome(e.target.value)}
            required
          />
        </div>

        {/* REGIÃO */}
        <div className={styles.inputGroup}>
          <label htmlFor="regiao">Região</label>
          <select
            id="regiao"
            value={regiao}
            onChange={e => {
              setRegiao(e.target.value);
              setCidade('');
            }}
            required
          >
            <option value="">Selecione sua região</option>
            {regioes.map(r => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* CIDADE */}
        <div className={styles.inputGroup}>
          <label htmlFor="cidade">Cidade</label>
          <select
            id="cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            required
            disabled={!regiao}
          >
            <option value="">Selecione sua cidade</option>
            {cidades.map(c => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* POKÉMONS */}
        <div className={styles.pokemons}>
          <p>Cadastre seu time (até 6 Pokémons)</p>
          {pokemons.map((p, index) => (
            <div key={p.id} className={styles.pokemonRow}>
              <label htmlFor={`pokemon-${p.id}`}>Pokémon {index + 1}</label>
              <select
                id={`pokemon-${p.id}`}
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
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removerPokemon(p.id)}
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          {pokemons.length < 6 && (
            <button
              type="button"
              className={styles.addButton}
              onClick={adicionarPokemon}
            >
              Adicionar Pokémon
            </button>
          )}
        </div>

        {/* RESUMO */}
        <div className={styles.resumo}>
          <p>Pokémons: {pokemons.length}</p>
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Taxa: R$ {taxaGeneracional.toFixed(2)}</p>
          <p>Total: R$ {total.toFixed(2)}</p>
        </div>

        <button type="submit">Concluir Agendamento</button>
      </form>

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        nome={nome}
        sobrenome={sobrenome}
        regiao={regiao}
        cidade={cidade}
        pokemons={pokemons.map(p => p.nome)}
        date="xx/xx/xx"
        time="00h00"
        onClose={() => {
          setModalOpen(false);
          resetForm();
        }}
      />
    </>
  );
}
