import React, { useMemo } from 'react';

import useLocalStorage, { SetNewValue } from './hooks/useLocalStorage';

import Todo from './types/Todo';

type Context = {
  todos: Todo[],
  setTodos: (() => void) | (SetNewValue<Todo[]>),
};

export const TodoContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {
  },
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const contextValue = useMemo(() => (
    {
      todos,
      setTodos,
    }
  ), [todos]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
