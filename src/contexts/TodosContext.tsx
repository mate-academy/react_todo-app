import React, { useContext, useMemo, useRef } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Client } from '../types/Client';

interface TodosContextType {
  todos: Todo[];
  actions: Client<Todo>;
  headerInputRef: React.RefObject<HTMLInputElement>;
}

export const TodosContext = React.createContext<TodosContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, actions] = useLocalStorage<Todo>('todos', []);

  const headerInputRef = useRef<HTMLInputElement>(null);

  const value = useMemo(
    () => ({
      todos,
      actions,
      headerInputRef,
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
