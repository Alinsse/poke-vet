'use client';
import { useEffect, useState } from 'react';

export function useSchedulingDates() {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/scheduling/date')
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta de datas');
        return res.json();
      })
      .then(data => {
        if (mounted) setDates(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error(err);
        setDates([]);
      });
    return () => { mounted = false; };
  }, []);

  return { dates };
}
