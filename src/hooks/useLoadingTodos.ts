import { useCallback, useMemo, useState } from 'react';

export const useLoadingTodos = () => {
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const add = useCallback((id: number) => {
    setLoadingIds(state => {
      state.add(id);

      return new Set(state);
    });
  }, []);

  const remove = useCallback((id: number) => {
    setLoadingIds(state => {
      state.delete(id);

      return new Set(state);
    });
  }, []);

  const isLoading = useCallback(
    (id: number) => loadingIds.has(id),
    [loadingIds],
  );

  return useMemo(() => ({
    add,
    remove,
    isLoading,
  }), [
    add,
    remove,
    isLoading,
  ]);
};
