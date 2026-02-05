import { useEffect, useState } from 'react';
export interface ApiItem { name: string; }

export function usePokemonOptions() {
  const [options, setOptions] = useState<ApiItem[]>([]);
  useEffect(() => {
    let mounted = true;
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => { if (!res.ok) throw new Error('Erro ao buscar pokémons'); return res.json(); })
      .then(data => { if (mounted) setOptions(data.results || []); })
      .catch(err => { console.error(err); setOptions([]); });
    return () => { mounted = false; };
  }, []);
  return { options };
}
