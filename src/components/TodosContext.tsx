import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';

interface ContextProperty {
  todos: Todo[];
  changeTodos: (todos: Todo[]) => void;
}

export const TodosContext = createContext<ContextProperty>({
  todos: new Array<Todo>(),
  changeTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, changeTodos] = useLocalStorage<Todo[]>(
    'todos',
    new Array<Todo>(),
  );

  const value = useMemo(
    () => ({
      todos,
      changeTodos,
    }),
    [todos, changeTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
