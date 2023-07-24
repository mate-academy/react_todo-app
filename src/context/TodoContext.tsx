/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';

import { useLocaleStorage } from '../hooks/useLocalStorage';

import { Todo } from '../types/Todo';

const LOCAL_STORAGE_KEY = 'todos';

interface TodoContextValues {
  todos: Todo[];
  setTodo: (todo: Todo[]) => void;
}

export const TodoContext = React.createContext({} as TodoContextValues);

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodo] = useLocaleStorage<Todo[]>(LOCAL_STORAGE_KEY, []);

  const value = useMemo(() => ({
    todos,
    setTodo,
  }), [todos]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
