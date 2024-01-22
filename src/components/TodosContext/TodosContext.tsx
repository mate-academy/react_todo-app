import React, { ReactNode, useMemo, useState } from 'react';
import { Todo } from '../../types/todo';

type ProviderProps = {
  children: ReactNode,
};

interface TodosContextType {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const useLocalStorage = <T extends unknown>(
  key: string,
  initialValue: T,
) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = (item: T) => {
    setValue(item);

    localStorage.setItem(
      key,
      JSON.stringify(item),
    );
  };

  return [value, save];
};

export const TodosContext = React.createContext<TodosContextType>(
  {
    todos: [],
    setTodos: () => {},
  },
);

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const context = useMemo(() => ({
    todos,
    setTodos,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={context}>
      { children }
    </TodosContext.Provider>
  );
};
