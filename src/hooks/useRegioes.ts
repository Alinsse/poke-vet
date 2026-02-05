import { useEffect, useState } from 'react';
export interface ApiItem { name: string; }

export function useRegioes() {
  const [regioes, setRegioes] = useState<ApiItem[]>([]);
  const [cidades, setCidades] = useState<ApiItem[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('https://pokeapi.co/api/v2/region')
      .then(res => { if (!res.ok) throw new Error('Erro ao buscar regiões'); return res.json(); })
      .then(data => { if (mounted) setRegioes(data.results || []); })
      .catch(err => { console.error(err); setRegioes([]); });
    return () => { mounted = false; };
  }, []);

  const fetchCidades = async (regiao: string) => {
    if (!regiao) { setCidades([]); return; }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/region/${regiao}`);
      if (!res.ok) throw new Error('Erro ao buscar cidades');
      const data = await res.json();
      setCidades(data.locations || []);
    } catch (err) {
      console.error(err);
      setCidades([]);
    }
  };

  return { regioes, cidades, fetchCidades };
}
