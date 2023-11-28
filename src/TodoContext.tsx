import React, { useMemo } from 'react';
import { useLocaleStorage } from './hooks/useLocaleStorage';
import { Todo } from './types/Todo';

const LOCAL_STORAGE_KEY = 'todos';

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>(LOCAL_STORAGE_KEY, []);

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
