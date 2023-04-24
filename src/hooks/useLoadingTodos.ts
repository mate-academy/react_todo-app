import { useCallback, useMemo, useState } from 'react';

export const useLoadingTodos = () => {
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const addLoadingTodo = useCallback((id: number) => {
    setLoadingIds(state => {
      state.add(id);

      return new Set(state);
    });
  }, []);

  const removeLoadingTodo = useCallback((id: number) => {
    setLoadingIds(state => {
      state.delete(id);

      return new Set(state);
    });
  }, []);

  const isTodoLoading = useCallback(
    (id: number) => loadingIds.has(id),
    [loadingIds],
  );

  return useMemo(() => ({
    addLoadingTodo,
    removeLoadingTodo,
    isTodoLoading,
  }), [
    addLoadingTodo,
    removeLoadingTodo,
    isTodoLoading,
  ]);
};
