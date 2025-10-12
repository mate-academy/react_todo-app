export type Client<T extends { id: number; completed: boolean }> = {
  add: (newTodo: Omit<T, 'id'>) => void;
  update: (updatedTodo: T) => void;
  delete: (todoId: number) => void;
  clearCompleted: () => void;
  toggle: () => void;
};
