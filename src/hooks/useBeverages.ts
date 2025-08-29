import { useEffect, useState, useCallback } from 'react';
import { fetchBeverages } from '../api/lemonadeApi';
import type { Beverage } from '../api/types';
import { ApiError } from '../api/client';

export function useBeverages() {
  const [data, setData] = useState<Beverage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const list = await fetchBeverages(); setData(list);
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Failed to load beverages';
      setError(msg);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  return { data, loading, error, reload: load };
}
