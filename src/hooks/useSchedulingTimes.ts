import { useState, useCallback } from 'react';

export function useSchedulingTimes() {
  const [times, setTimes] = useState<string[]>([]);

  const fetchTimes = useCallback(async (date?: string) => {
    if (!date) { setTimes([]); return; }
    try {
      const res = await fetch(`/api/scheduling/time?date=${encodeURIComponent(date)}`);
      if (!res.ok) throw new Error('Erro na resposta de horários');
      const data = await res.json();
      setTimes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTimes([]);
    }
  }, []);

  return { times, fetchTimes };
}
