export const addAction = () => ({
  type: 'ADD-TODO',
});

export const deleteAction = () => ({
  type: 'DELETE-TODO',
});

export const allTodos = () => ({
  type: 'ALL-TODOS',
});

export const activeTodos = () => ({
  type: 'FILTER-BY-ACTIVE',
});

export const completedTodos = () => ({
  type: 'FILTER-BY-COMPLETED',
});
