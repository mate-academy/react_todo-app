import React, { useContext, useMemo } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Client } from '../types/Client';

interface TodosContextType {
  todos: Todo[];
  actions: Client<Todo>;
}

export const TodosContext = React.createContext<TodosContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, actions] = useLocalStorage<Todo>('todos', []);

  const value = useMemo(
    () => ({
      todos,
      actions,
    }),
    [actions, todos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export function useTodosContext() {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodosContext must be used within an TodosProvider');
  }

  return ctx;
}
